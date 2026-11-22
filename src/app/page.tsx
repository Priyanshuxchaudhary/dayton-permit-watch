import N from"next/link";import{supabaseServer as $}from"@/lib/supabase/server";import D from"./RunTrigger";import{InboxIcon as G,LogOutIcon as A}from"@/components/icons";import E from"@/components/LocalTime";import I from"@/components/TimezonePicker";export const dynamic="force-dynamic";function j(){const t=new Date().getHours();return t<12?"Good morning":t<18?"Good afternoon":"Good evening"}export default async function z(){const t=await $(),[{data:v},{data:a},{data:k},{data:R}]=await Promise.all([t.from("permitwatch_permit_types").select("*").order("category").order("label"),t.from("permitwatch_runs").select("*").eq("is_batch_child",!1).order("started_at",{ascending:!1}).limit(15),t.from("permitwatch_recipients").select("*").order("is_default",{ascending:!1}),t.auth.getUser()]),w=R.user?.email??"",_=w.split("@")[0];return<div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-semibold text-white shadow-sm">
            D
          </div>
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">Dayton Permit Watch</h1>
            <p className="text-sm text-neutral-500"title={w}>
              {j()}
              {_&&`, ${_}`} ·{" "}
              <N href="/alerts"className="font-medium text-blue-600 hover:text-blue-700">
                Alerts
              </N>{" "}
              ·{" "}
              <N href="/profile"className="font-medium text-blue-600 hover:text-blue-700">
                Profile
              </N>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <I/>
          <H/>
        </div>
      </header>

      <D permitTypes={v??[]}recipients={k??[]}/>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Recent runs
        </h2>
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="px-4 py-2 font-medium">Started</th>
                <th className="px-4 py-2 font-medium">Trigger</th>
                <th className="px-4 py-2 font-medium">Types</th>
                <th className="px-4 py-2 font-medium">Date range</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Records</th>
                <th className="px-4 py-2 font-medium">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {(a??[]).map(e=>{const S=e.summary,T=Array.isArray(S)?S.reduce((L,P)=>L+(P.count??0),0):0;return<tr key={e.id}className="hover:bg-neutral-50">
                    <td className="px-4 py-2">
                      <N href={`/runs/${e.id}`}className="font-medium text-blue-600 hover:text-blue-700">
                        <E iso={e.started_at}/>
                      </N>
                    </td>
                    <td className="px-4 py-2 capitalize text-neutral-600">{e.trigger_type}</td>
                    <td className="px-4 py-2 text-neutral-600">{e.permit_type_values.length}</td>
                    <td className="px-4 py-2 text-neutral-600">
                      {e.start_date} → {e.end_date}
                    </td>
                    <td className="px-4 py-2">
                      <B status={e.status}/>
                    </td>
                    <td className="px-4 py-2 text-neutral-600">{T}</td>
                    <td className="px-4 py-2 text-neutral-600">
                      {e.email_sent?`sent (${e.email_recipients.length})`:e.email_error?"failed":"-"}
                    </td>
                  </tr>})}
              {(a??[]).length===0&&<tr>
                  <td colSpan={7}className="px-4 py-10 text-center text-neutral-400">
                    <div className="flex flex-col items-center gap-2">
                      <G className="h-7 w-7 text-neutral-300"/>
                      <span>No runs yet. Trigger one above to get started.</span>
                    </div>
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>}function B({status:t}){const a={running:{badge:"bg-amber-50 text-amber-800",dot:"bg-amber-500"},completed:{badge:"bg-green-50 text-green-800",dot:"bg-green-500"},failed:{badge:"bg-red-50 text-red-800",dot:"bg-red-500"}}[t]??{badge:"bg-neutral-100 text-neutral-600",dot:"bg-neutral-400"};return<span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${a.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`}/>
      {t}
    </span>}function H(){return<form action="/auth/signout"method="post">
      <button type="submit"className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-600 shadow-sm transition-colors hover:bg-neutral-50 hover:text-neutral-900">
        <A className="h-3.5 w-3.5"/>
        Sign out
      </button>
    </form>}
