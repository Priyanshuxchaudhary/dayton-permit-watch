"use client";import{useEffect as l,useState as c}from"react";import{useRouter as p}from"next/navigation";import{supabaseBrowser as y}from"@/lib/supabase/client";import _ from"@/components/RunProgressView";export default function R({runId:t,initial:s}){const[r,m]=c(s),o=p();return l(()=>{if(s.status!=="running")return;const u=y();let a=!1;const n=setInterval(async()=>{const{data:e}=await u.from("permitwatch_runs").select("status, error, email_sent, email_recipients, email_error, summary, logs").eq("id",t).single();if(a||!e)return;const i={status:e.status,error:e.error,email_sent:e.email_sent,email_recipients:e.email_recipients??[],email_error:e.email_error,summary:Array.isArray(e.summary)?e.summary:[],logs:Array.isArray(e.logs)?e.logs:[]};m(i),i.status!=="running"&&(clearInterval(n),o.refresh())},2e3);return()=>{a=!0,clearInterval(n)}},[t]),<>
      <p className="mt-1 text-sm text-neutral-500">
        status: {r.status}
        {r.error&&<span className="text-red-600"> · error: {r.error}</span>}
      </p>
      <p className="mt-1 text-sm text-neutral-500">
        Email:{" "}
        {r.email_sent?`sent to ${r.email_recipients.join(", ")}`:r.email_error?`failed: ${r.email_error}`:"not sent"}
      </p>

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          {r.status==="running"?"Live progress":"Per-type outcome"}
        </h2>
        <_ status={r.status}summary={r.summary}logs={r.logs}/>
      </section>
    </>}
