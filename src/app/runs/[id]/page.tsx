import _ from"next/link";import{notFound as N}from"next/navigation";import{supabaseServer as b}from"@/lib/supabase/server";import{ArrowLeftIcon as R,ExternalLinkIcon as L}from"@/components/icons";import A from"@/components/LocalTime";import E from"./RunStatusLive";export const dynamic="force-dynamic";export default async function S({params:n}){const{id:a}=await n,s=await b(),{data:e}=await s.from("permitwatch_runs").select("*").eq("id",a).single();e||N();const m=e.batch_child_ids&&e.batch_child_ids.length>0?e.batch_child_ids:[a],{data:r}=await s.from("permitwatch_records").select("*").in("run_id",m).order("permit_type_value").order("record_number",{ascending:!1}),i=Array.isArray(e.summary)?e.summary:[],l=Array.isArray(e.logs)?e.logs:[];return<div className="mx-auto max-w-5xl px-4 py-8">
      <_ href="/"className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-blue-600">
        <R className="h-4 w-4"/>
        Back
      </_>
      <h1 className="mt-3 text-xl font-semibold text-neutral-900">
        Run <A iso={e.started_at}/>
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        {e.trigger_type} · {e.start_date} → {e.end_date}
      </p>
      <E runId={a}initial={{status:e.status,error:e.error,email_sent:e.email_sent,email_recipients:e.email_recipients??[],email_error:e.email_error,summary:i,logs:l}}/>

      <section className="mt-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Records ({r?.length??0})
        </h2>
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Record #</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Project</th>
                <th className="px-3 py-2 font-medium">Address</th>
                <th className="px-3 py-2 font-medium">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {(r??[]).map(t=><tr key={t.id}>
                  <td className="px-3 py-2 font-mono text-xs">{t.record_number}</td>
                  <td className="px-3 py-2 text-neutral-500">{t.permit_type_value}</td>
                  <td className="px-3 py-2">{t.project_name||<span className="text-neutral-400">-</span>}</td>
                  <td className="px-3 py-2">{t.address||<span className="text-neutral-400">-</span>}</td>
                  <td className="px-3 py-2">
                    {t.record_details_link&&<a href={t.record_details_link}target="_blank"rel="noreferrer"className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700">
                        view
                        <L className="h-3 w-3"/>
                      </a>}
                  </td>
                </tr>)}
              {(r??[]).length===0&&<tr>
                  <td colSpan={5}className="px-3 py-6 text-center text-neutral-400">
                    No records in this run.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>}
