"use client";import{useMemo as ne,useState as m}from"react";import{useRouter as re}from"next/navigation";import{AlertCircleIcon as Re,CheckCircleIcon as Se,ChevronDownIcon as Ne,PlayIcon as L}from"@/components/icons";import{supabaseBrowser as Ee}from"@/lib/supabase/client";import O from"@/components/RunProgressView";function Y(a=0){const l=new Date;return l.setDate(l.getDate()+a),`${String(l.getMonth()+1).padStart(2,"0")}/${String(l.getDate()).padStart(2,"0")}/${l.getFullYear()}`}function Ce(a){return new Date(Date.now()-a).toISOString()}function V(a){let l=5381;for(let u=0;u<a.length;u++)l=l*33^a.charCodeAt(u);return l>>>0}const y=12;function ke(a,l){const u=[...a].sort((o,v)=>V(o.value)-V(v.value)),d=Math.ceil(u.length/q(u.length,l)),x=[];for(let o=0;o<u.length;o+=d)x.push(u.slice(o,o+d));return x}function q(a,l){return Math.ceil(a/l)}export default function De({permitTypes:a,recipients:l}){const u=re(),[d,x]=m(!1),[o,v]=m(()=>new Set(a.map(e=>e.value))),[N,U]=m(Y(-1)),[E,W]=m(Y(0)),[C,X]=m(!0),[P,G]=m(""),[g,_]=m(!1),[p,k]=m(null),[z,$]=m(null),[K,w]=m(null),[R,S]=m(null),[f,D]=m(null),[B,A]=m(null),Q=ne(()=>{var s;const e={};for(const r of a)(e[s=r.category]??(e[s]=[])).push(r);return e},[a]);function Z(e){v(s=>{const r=new Set(s);return r.has(e)?r.delete(e):r.add(e),r})}function ee(e,s){v(r=>{const t=new Set(r),n=s.every(i=>t.has(i));for(const i of s)n?t.delete(i):t.add(i);return t})}async function M(e,s){let r=!0;w(null),S(null);const t=Ce(3e3);te(t,()=>r);try{const n=await fetch("/api/run",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({permitTypeValues:e.map(h=>h.value),startDate:N,endDate:E,useDefaultRecipients:s.useDefaultRecipients,extraRecipients:s.extraRecipients})}),i=await n.json();if(!n.ok)throw new Error(i.error??"run failed");return i}finally{r=!1}}async function j(){_(!0),$(null),k(null),w(null),S(null),D(null),A(null);const e=a.filter(t=>o.has(t.value)),s=P.split(",").map(t=>t.trim()).filter(Boolean),r=e.length>y?ke(e,y):[e];try{if(r.length===1){const c=await M(e,{useDefaultRecipients:C,extraRecipients:s});k(c),u.refresh();return}const t=[];let n=0,i=[];for(let c=0;c<r.length;c++){D({current:c+1,total:r.length,currentBatchSize:r[c].length,recordsSoFar:n});const b=await M(r[c],{useDefaultRecipients:!1,extraRecipients:[]});t.push(b.runId),n+=b.totalRecords,i=i.concat(b.summary??[])}A(i);let h=!1,T=null,F=t[t.length-1];try{const c=await fetch("/api/run/combine",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({runIds:t,startDate:N,endDate:E,permitTypeValues:e.map(I=>I.value),permitTypeLabels:e.map(I=>I.label),useDefaultRecipients:C,extraRecipients:s})}),b=await c.json();if(!c.ok)throw new Error(b.error??"combine failed");h=b.emailSent,T=b.emailError,b.runId&&(F=b.runId)}catch(c){T=c instanceof Error?c.message:String(c)}k({runId:F,totalRecords:n,emailSent:h,emailError:T,batchCount:r.length,runIds:t}),u.refresh()}catch(t){$(t instanceof Error?t.message:String(t))}finally{_(!1),w(null),S(null),D(null)}}async function te(e,s){const r=Ee();let t=null;for(let n=0;n<20&&s()&&!t;n++){const{data:i}=await r.from("permitwatch_runs").select("id").eq("status","running").gte("started_at",e).order("started_at",{ascending:!1}).limit(1);i&&i[0]?t=i[0].id:await new Promise(h=>setTimeout(h,750))}if(!(!t||!s()))for(w(t);s();){const{data:n}=await r.from("permitwatch_runs").select("status, summary, logs").eq("id",t).single();if(!s()||!n||(S({status:n.status,summary:Array.isArray(n.summary)?n.summary:[],logs:Array.isArray(n.logs)?n.logs:[]}),n.status!=="running"))return;await new Promise(i=>setTimeout(i,2e3))}}return<section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={()=>j()}disabled={g||o.size===0}className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600">
          {g?<>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"/>
              Running…
            </>:<>
              <L className="h-3.5 w-3.5"/>
              Run
            </>}
        </button>
        <button onClick={()=>x(e=>!e)}className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          {d?"Hide customize":"Customize a run"}
          <Ne className={`h-4 w-4 transition-transform ${d?"rotate-180":""}`}/>
        </button>
      </div>

      {g&&<div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-blue-100">
          <div className="h-full w-1/3 animate-[progress-indeterminate_1.1s_ease-in-out_infinite] rounded-full bg-blue-600"/>
        </div>}

      {g&&f&&<p className="mt-3 text-xs font-medium text-blue-700">
          Batch {f.current} of {f.total} ({f.currentBatchSize} type(s)) ·{" "}
          {f.recordsSoFar} record(s) so far
        </p>}

      {g&&K&&R&&<div className="mt-4">
          <O status={R.status}summary={R.summary}logs={R.logs}totalTypes={f?f.currentBatchSize:o.size}/>
        </div>}

      {d&&<div className="mt-6 space-y-5 border-t border-neutral-100 pt-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">Record types</label>
            <div className="max-h-72 space-y-4 overflow-y-auto rounded-md border border-neutral-200 p-3">
              {Object.entries(Q).map(([e,s])=>{const r=s.map(n=>n.value),t=r.every(n=>o.has(n));return<div key={e}>
                    <button onClick={()=>ee(e,r)}className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-600 hover:text-blue-700">
                      {e} {t?"(clear all)":"(select all)"}
                    </button>
                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                      {s.map(n=><label key={n.value}className="flex items-center gap-2 text-sm text-neutral-700">
                          <input type="checkbox"checked={o.has(n.value)}onChange={()=>Z(n.value)}className="accent-blue-600"/>
                          {n.label}
                        </label>)}
                    </div>
                  </div>})}
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              {o.size} type(s) selected
              {o.size>y&&` \xB7 will run as ${q(o.size,y)} sequential batches (up to ${y} types each), to stay inside each run's time limit`}
            </p>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Start date</label>
              <input type="date"value={H(N)}onChange={e=>U(J(e.target.value))}className="rounded-md border border-neutral-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">End date</label>
              <input type="date"value={H(E)}onChange={e=>W(J(e.target.value))}className="rounded-md border border-neutral-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox"checked={C}onChange={e=>X(e.target.checked)}className="accent-blue-600"/>
              Email default recipients ({l.filter(e=>e.is_default).map(e=>e.email).join(", ")||"none set"})
            </label>
            <label className="mt-2 block text-sm font-medium text-neutral-700">
              Also send to (comma-separated, one-off, optional)
            </label>
            <input type="text"value={P}onChange={e=>G(e.target.value)}placeholder="someone@example.com, other@example.com"className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
          </div>

          <button onClick={()=>j()}disabled={g||o.size===0}className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600">
            {g?<>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"/>
                Running…
              </>:<>
                <L className="h-3.5 w-3.5"/>
                {`Run ${o.size} type(s)`}
              </>}
          </button>
        </div>}

      {z&&<div className="mt-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800 animate-[fade-in_0.2s_ease-out]">
          <Re className="mt-0.5 h-4 w-4 shrink-0"/>
          <p>Failed: {z}</p>
        </div>}
      {p&&<div className="mt-4 flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-800 animate-[fade-in_0.2s_ease-out]">
          <Se className="mt-0.5 h-4 w-4 shrink-0"/>
          <p>
            Done. {p.totalRecords} record(s) found.{" "}
            {p.emailSent?"Email sent.":p.emailError?`Email failed: ${p.emailError}`:"No email sent (nothing found, or no recipients)."}{" "}
            <a href={`/runs/${p.runId}`}className="font-medium underline underline-offset-2 hover:text-green-900">
              View details
            </a>
          </p>
        </div>}
      {p&&p.batchCount&&p.batchCount>1&&B&&<div className="mt-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Per-type outcome
          </h3>
          <O status="completed"summary={B}logs={[]}/>
        </div>}
    </section>}function H(a){const[l,u,d]=a.split("/");return`${d}-${l}-${u}`}function J(a){const[l,u,d]=a.split("-");return`${u}/${d}/${l}`}
