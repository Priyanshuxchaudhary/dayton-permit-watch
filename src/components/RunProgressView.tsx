import N from"@/components/LocalTime";export default function v({status:s,summary:t,logs:a,totalTypes:r}){return<div className="space-y-4">
      {s==="running"&&<div>
          <p className="mb-1 text-xs font-medium text-blue-700">
            {typeof r=="number"?`Running -- ${t.length} of ${r} type(s) done`:`Running -- ${t.length} type(s) done`}
          </p>
          {a.length>0&&<div className="max-h-56 overflow-y-auto rounded-md bg-neutral-900 p-2.5 font-mono text-xs leading-relaxed text-neutral-100">
              {a.map((e,i)=><div key={i}className="whitespace-pre-wrap">
                  <span className="text-neutral-500">
                    <N iso={e.ts}timeOnly/>
                  </span>{" "}
                  {e.message}
                </div>)}
            </div>}
        </div>}

      {t.length>0&&<div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Path</th>
                <th className="px-3 py-2 font-medium">Count</th>
                <th className="px-3 py-2 font-medium">Pages</th>
                <th className="px-3 py-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {t.map(e=><tr key={e.value}>
                  <td className="px-3 py-2">{e.label}</td>
                  <td className="px-3 py-2 text-neutral-500">{e.path}</td>
                  <td className="px-3 py-2">{e.count}</td>
                  <td className="px-3 py-2 text-neutral-500">{e.pagesWalked}</td>
                  <td className="px-3 py-2 text-amber-700">
                    {e.hitSafetyPageCap&&"hit safety page cap, data may be incomplete for this type "}
                    {e.hitPaginationTimeBudget&&"run's overall time budget ran out mid-search, some records (not just descriptions) may be missing "}
                    {e.hitDetailFetchCap&&"hit detail-fetch cap, some project descriptions may be missing "}
                    {e.detailFetchFailures>0&&`${e.detailFetchFailures} project description${e.detailFetchFailures===1?"":"s"} failed to load after retrying `}
                    {e.error&&`error: ${e.error}`}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
    </div>}
