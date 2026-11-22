import _ from"next/link";import{supabaseServer as v}from"@/lib/supabase/server";import A from"./AlertManager";import{ArrowLeftIcon as N}from"@/components/icons";export const dynamic="force-dynamic";export default async function k(){const e=await v(),{data:a}=await e.auth.getUser(),t=a.user?.id??"",[{data:r},{data:s},{data:i}]=await Promise.all([e.from("permitwatch_alerts").select("*").eq("owner_id",t).order("created_at",{ascending:!1}),e.from("permitwatch_permit_types").select("*").order("category").order("label"),e.from("permitwatch_recipients").select("*").order("is_default",{ascending:!1})]);return<div className="mx-auto max-w-3xl px-4 py-8">
      <_ href="/"className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-blue-600">
        <N className="h-4 w-4"/>
        Back
      </_>
      <h1 className="mt-3 mb-2 text-xl font-semibold text-neutral-900">Alerts</h1>
      <p className="mb-6 text-sm text-neutral-500">
        Set up a search that runs on its own schedule and emails you when it finds something, without you
        having to trigger it by hand. Delivery lands within about an hour of the time you pick, not to the
        minute -- Vercel&apos;s free plan only guarantees hourly precision on scheduled jobs.
      </p>
      <A initialAlerts={r??[]}permitTypes={s??[]}recipients={i??[]}userId={t}/>
    </div>}
