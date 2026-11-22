"use client";import{useMemo as F,useState as r}from"react";import{useRouter as ne}from"next/navigation";import{supabaseBrowser as $}from"@/lib/supabase/client";import{getStoredTimezone as re,listTimezones as se}from"@/lib/timezone";import{AlertCircleIcon as _e,PlusIcon as Ne,TrashIcon as Ce}from"@/components/icons";import Se from"@/components/LocalTime";const K=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function U(s){const i=s<12?"AM":"PM";return`${s%12===0?12:s%12} ${i}`}function Ae(s){const i=`${U(s.hour_of_day)} ${s.timezone.replace(/_/g," ")}`;return s.cadence==="weekly"?`Weekly on ${K[s.day_of_week??0]} at ${i}`:`Daily at ${i}`}function f(){const s=new Date;return`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`}export default function Ee({initialAlerts:s,permitTypes:i,recipients:z,userId:V}){const O=ne(),[R,c]=r(s),[l,m]=r(null),[g,W]=r(!1),[M,o]=r(null),[I,x]=r(""),[p,y]=r(new Set),[h,v]=r(f()),[_,w]=r(f()),[b,N]=r("daily"),[P,k]=r(1),[j,C]=r(8),[q,S]=r("America/New_York"),[L,A]=r(!0),[B,E]=r(""),[H,D]=r(!1),G=F(()=>{var a;const e={};for(const t of i)(e[a=t.category]??(e[a]=[])).push(t);return e},[i]),J=F(()=>se(),[]);function Q(e){y(a=>{const t=new Set(a);return t.has(e)?t.delete(e):t.add(e),t})}function X(){o(null),x(""),y(new Set),v(f()),w(f()),N("daily"),k(1),C(8),S(re()),A(!0),E(""),D(!1),m("new")}function Z(e){o(null),x(e.name),y(new Set(e.permit_type_values)),v(e.start_date),w(e.end_date),N(e.cadence),k(e.day_of_week??1),C(e.hour_of_day),S(e.timezone),A(e.use_default_recipients),E(e.extra_recipients.join(", ")),D(e.notify_on_empty),m(e)}async function ee(){o(null);const e=I.trim();if(!e)return o("Name is required.");if(p.size===0)return o("Select at least one record type.");if(_<h)return o("End date can't be before start date.");W(!0);const a=$(),t=B.split(",").map(n=>n.trim()).filter(Boolean),d={owner_id:V,name:e,permit_type_values:[...p],start_date:h,end_date:_,cadence:b,day_of_week:b==="weekly"?P:null,hour_of_day:j,timezone:q,use_default_recipients:L,extra_recipients:t,notify_on_empty:H};try{if(l==="new"){const{data:n,error:u}=await a.from("permitwatch_alerts").insert(d).select().single();if(u)throw u;c(T=>[n,...T])}else if(l){const{data:n,error:u}=await a.from("permitwatch_alerts").update(d).eq("id",l.id).select().single();if(u)throw u;c(T=>T.map(Y=>Y.id===l.id?n:Y))}m(null),O.refresh()}catch(n){o(n instanceof Error?n.message:String(n))}finally{W(!1)}}async function te(e){const a=$(),{error:t}=await a.from("permitwatch_alerts").update({enabled:!e.enabled}).eq("id",e.id);if(t)return o(t.message);c(d=>d.map(n=>n.id===e.id?{...n,enabled:!n.enabled}:n))}async function ae(e){if(!window.confirm(`Delete the alert "${e.name}"? This can't be undone.`))return;const a=$(),{error:t}=await a.from("permitwatch_alerts").delete().eq("id",e.id);if(t)return o(t.message);c(d=>d.filter(n=>n.id!==e.id)),O.refresh()}return<div>
      {M&&<div className="mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <_e className="mt-0.5 h-4 w-4 shrink-0"/>
          <p>{M}</p>
        </div>}

      <div className="space-y-3">
        {R.map(e=><div key={e.id}className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-neutral-900">{e.name}</h3>
                  {!e.enabled&&<span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
                      paused
                    </span>}
                </div>
                <p className="mt-0.5 text-sm text-neutral-500">
                  {Ae(e)} · {e.permit_type_values.length} type(s) · {e.start_date} → {e.end_date}
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">
                  Last fired:{" "}
                  {e.last_fired_at?<Se iso={e.last_fired_at}/>:"never"}
                  {e.last_run_id&&<>
                      {" "}
                      ·{" "}
                      <a href={`/runs/${e.last_run_id}`}className="text-blue-600 hover:text-blue-700">
                        view last result
                      </a>
                    </>}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <input type="checkbox"checked={e.enabled}onChange={()=>te(e)}className="accent-blue-600"/>
                  enabled
                </label>
                <button onClick={()=>Z(e)}className="text-xs font-medium text-blue-600 hover:text-blue-700">
                  edit
                </button>
                <button onClick={()=>ae(e)}className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700">
                  <Ce className="h-3.5 w-3.5"/>
                  delete
                </button>
              </div>
            </div>
          </div>)}
        {R.length===0&&l===null&&<p className="rounded-lg border border-dashed border-neutral-300 px-4 py-8 text-center text-sm text-neutral-400">
            No alerts yet. Create one below to get a recurring search on its own schedule.
          </p>}
      </div>

      {l===null&&<button onClick={X}className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
          <Ne className="h-3.5 w-3.5"/>
          New alert
        </button>}

      {l!==null&&<div className="mt-4 space-y-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-900">{l==="new"?"New alert":"Edit alert"}</h3>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Name</label>
            <input type="text"value={I}onChange={e=>x(e.target.value)}placeholder="e.g. Weekly commercial wrecking check"className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Record types</label>
            <div className="max-h-56 space-y-3 overflow-y-auto rounded-md border border-neutral-200 p-3">
              {Object.entries(G).map(([e,a])=><div key={e}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">{e}</p>
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {a.map(t=><label key={t.value}className="flex items-center gap-2 text-sm text-neutral-700">
                        <input type="checkbox"checked={p.has(t.value)}onChange={()=>Q(t.value)}className="accent-blue-600"/>
                        {t.label}
                      </label>)}
                  </div>
                </div>)}
            </div>
            <p className="mt-1 text-xs text-neutral-500">{p.size} type(s) selected</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Start date</label>
              <input type="date"value={h}onChange={e=>v(e.target.value)}className="rounded-md border border-neutral-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">End date</label>
              <input type="date"value={_}onChange={e=>w(e.target.value)}className="rounded-md border border-neutral-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>
          </div>
          <p className="-mt-3 text-xs text-neutral-500">
            This exact date range is searched again every time the alert fires -- edit it any time to move the window.
          </p>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Repeats</label>
              <select value={b}onChange={e=>N(e.target.value)}className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            {b==="weekly"&&<div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Day</label>
                <select value={P}onChange={e=>k(Number(e.target.value))}className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  {K.map((e,a)=><option key={e}value={a}>
                      {e}
                    </option>)}
                </select>
              </div>}
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Hour</label>
              <select value={j}onChange={e=>C(Number(e.target.value))}className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                {Array.from({length:24},(e,a)=><option key={a}value={a}>
                    {U(a)}
                  </option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Timezone</label>
              <select value={q}onChange={e=>S(e.target.value)}className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                {J.map(e=><option key={e}value={e}>
                    {e.replace(/_/g," ")}
                  </option>)}
              </select>
            </div>
          </div>
          <p className="-mt-3 text-xs text-neutral-500">
            Vercel&apos;s free plan only guarantees hourly precision, so this fires sometime within the chosen hour, not
            necessarily on the minute.
          </p>

          <div>
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox"checked={L}onChange={e=>A(e.target.checked)}className="accent-blue-600"/>
              Email default recipients ({z.filter(e=>e.is_default).map(e=>e.email).join(", ")||"none set"})
            </label>
            <label className="mt-2 block text-sm font-medium text-neutral-700">Also send to (comma-separated, optional)</label>
            <input type="text"value={B}onChange={e=>E(e.target.value)}placeholder="someone@example.com, other@example.com"className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input type="checkbox"checked={H}onChange={e=>D(e.target.checked)}className="accent-blue-600"/>
            Email me even when nothing new is found (otherwise this alert stays silent, like manual runs)
          </label>

          <div className="flex items-center gap-3">
            <button onClick={ee}disabled={g}className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50">
              {g?"Saving…":l==="new"?"Create alert":"Save changes"}
            </button>
            <button onClick={()=>m(null)}disabled={g}className="text-sm text-neutral-500 hover:text-neutral-700">
              Cancel
            </button>
          </div>
        </div>}
    </div>}
