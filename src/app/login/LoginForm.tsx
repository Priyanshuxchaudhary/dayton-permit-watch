"use client";import{useEffect as h,useState as s}from"react";import{useRouter as w}from"next/navigation";import{supabaseBrowser as y}from"@/lib/supabase/client";import{AlertCircleIcon as N,CheckCircleIcon as C}from"@/components/icons";export default function S({showSignedOutBanner:r}){const l=w(),[n,f]=s("signin"),[a,p]=s(""),[i,g]=s(""),[u,o]=s(null),[m,d]=s(!1),[x,c]=s(r);h(()=>{if(!r)return;const t=setTimeout(()=>c(!1),6e3);return()=>clearTimeout(t)},[r]);async function v(t){t.preventDefault(),o(null),d(!0);const b=y();try{if(n==="signin"){const{error:e}=await b.auth.signInWithPassword({email:a,password:i});if(e)throw e}else{const{error:e}=await b.auth.signUp({email:a,password:i});if(e)throw e}l.push("/"),l.refresh()}catch(e){o(e instanceof Error?e.message:String(e))}finally{d(!1)}}return<div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm">
        {x&&<div className="mb-4 flex items-start justify-between gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 animate-[fade-in_0.2s_ease-out]">
            <div className="flex items-start gap-2">
              <C className="mt-0.5 h-4 w-4 shrink-0"/>
              <span>You&apos;ve been signed out. See you next time!</span>
            </div>
            <button type="button"onClick={()=>c(!1)}className="shrink-0 text-blue-400 hover:text-blue-600"aria-label="Dismiss">
              ×
            </button>
          </div>}
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-semibold text-white">
              D
            </div>
            <div>
              <h1 className="text-lg font-semibold text-neutral-900">Dayton Permit Watch</h1>
              <p className="text-sm text-neutral-500">
                {n==="signin"?"Welcome back.":"Let's get you set up."}
              </p>
            </div>
          </div>
          <form onSubmit={v}className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-neutral-700">Email</label>
              <input type="email"required value={a}onChange={t=>p(t.target.value)}className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="mb-1 block text-sm text-neutral-700">Password</label>
              <input type="password"required minLength={6}value={i}onChange={t=>g(t.target.value)}className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            </div>
            {u&&<div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <N className="mt-0.5 h-4 w-4 shrink-0"/>
                <p>{u}</p>
              </div>}
            <button type="submit"disabled={m}className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50">
              {m?"Working…":n==="signin"?"Sign in":"Create account"}
            </button>
          </form>
          <button type="button"className="mt-4 text-sm text-neutral-500 hover:text-blue-600"onClick={()=>{f(n==="signin"?"signup":"signin"),o(null)}}>
            {n==="signin"?"Need an account? Sign up":"Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>}
