# Dayton Permit Watch

A small Next.js app that watches the City of Dayton's Accela Citizen Access portal for new building permit activity and emails a digest when something shows up. It started as a way to get an early heads up on wrecking permits and grew into a general permit watcher with its own scheduling and alerting.

## What it does

The City of Dayton publishes building permits (new construction, electrical, plumbing, mechanical, wrecking, zoning, contractor licenses, and more, 49 record types in total) through an old ASP.NET based Accela Citizen Access site. There's no public API for it, so this app drives the site's search form directly: it submits the same postback requests a browser would, pages through the results grid, and for records whose project description is blank on the grid, opens the detail page to fill it in.

Every search is logged as a "run" in Supabase, along with the records it found, how many pages it walked, and whether it hit any of its own safety limits (page cap, time budget, retry budget). Runs can be kicked off three ways:

- Manually, from the dashboard, by picking record types and a date range and clicking Run.
- A daily digest that checks commercial and residential wrecking permits from the previous day and emails the default recipient list. This runs once a day through Vercel Cron Jobs.
- User-defined alerts, each with its own record types, date range, recipients, and schedule (daily or weekly, at a chosen hour and timezone). A second cron job checks every hour and fires whichever alerts are due.

Results and run history live in Supabase. Emails go out through Gmail (via nodemailer) using an app password, since this is a single-user hobby project and a full transactional email provider felt like overkill.

## How it's built

- **Next.js 16** (App Router, Turbopack), React 19, Tailwind 4.
- **Supabase** for auth (email login) and storage. The app expects these tables to already exist: `permitwatch_runs`, `permitwatch_records`, `permitwatch_recipients`, `permitwatch_alerts`, and `permitwatch_permit_types`. The schema isn't part of this repo since it lives in the Supabase project itself; it was set up directly in the Supabase SQL editor rather than tracked as migrations here.
- **Vercel** for hosting, with Vercel Cron Jobs driving the automated runs. The Hobby plan only runs a given cron definition once a day, so the hourly alert check is actually 24 separate entries in `vercel.json`, one per hour, plus the one daily digest entry (25 total). Even with a dedicated cron per hour, Vercel only guarantees the job fires sometime within that hour, not on the minute.
- **Cheerio** for parsing the HTML Accela returns, since the whole site is still classic ASP.NET Web Forms (`__EVENTTARGET`, `__VIEWSTATE` postbacks and all).
- **Nodemailer** for sending the digest emails through Gmail.

### Route map

- `/` dashboard with recent runs and a form to trigger a manual run.
- `/alerts` create, edit, pause, and delete recurring alerts.
- `/profile` manage the default recipient list used by the daily digest and by alerts that opt into it.
- `/runs/[id]` a single run's live status and results, polling while it's still in progress.
- `/login` email login (magic link / OTP via Supabase Auth).
- `/api/run` starts a manual run. Requires a logged-in Supabase user.
- `/api/cron` the daily wrecking-permit digest. Requires the `CRON_SECRET` bearer token.
- `/api/cron/alerts` checks every enabled alert once an hour and fires the ones that are due. Also requires `CRON_SECRET`.

Everything except `/login`, the auth callback routes, and the two cron routes sits behind Supabase auth, enforced in `src/proxy.ts` (this app's middleware).

## Running it locally

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

You'll need a Supabase project with the five tables listed above already created, and a Gmail account with an app password if you want email to actually send. Without email configured, runs still execute and still get logged, they just won't send anything.

## Environment variables

| Variable | What it's for |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL. Exposed to the browser. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key. Exposed to the browser, used for the signed-in user's own session. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key. Server-only, bypasses row-level security. The cron routes use this since there's no logged-in user behind a scheduled job. Never expose this to the client. |
| `GMAIL_USER` | The Gmail address digest emails are sent from. |
| `GMAIL_APP_PASSWORD` | A Gmail [app password](https://myaccount.google.com/apppasswords) for that address, not the account's normal password. Requires 2-Step Verification to be on. |
| `CRON_SECRET` | A random string you generate yourself (`openssl rand -hex 32` works fine). Vercel sends this as a bearer token when it calls the cron routes, so they can reject anyone else hitting those URLs. |

## Deploying

This is built for Vercel. Connect the repo, set the six environment variables above on the project (Production, and Preview too if you use it), and deploy. The 25 entries in `vercel.json`'s `crons` array get picked up automatically, no separate setup needed.

On a paid Vercel plan, the 24 hourly alert-check entries could be collapsed into one `0 * * * *` cron. They're split out the way they are specifically to work within the Hobby plan's one-run-per-day-per-cron-definition limit.

## A couple of known quirks

- The subject line on outgoing digest emails doesn't actually get set, there's a typo in `src/lib/email/send.ts` (`subjuct` instead of `subject`). Emails still send and the HTML body is correct, they just arrive with a blank subject. Left as-is rather than fixed silently, flagging it here instead.
- Not every Accela search result includes a project description on the results grid. Records missing one get a second request to their own detail page to fill it in. That backfill is capped per permit type (150 records, 70 seconds) so one slow permit type can't eat a whole run's time budget on its own.
