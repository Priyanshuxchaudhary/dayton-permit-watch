"use client";import{useState as r}from"react";import{useRouter as v}from"next/navigation";import{supabaseBrowser as m}from"@/lib/supabase/client";import{AlertCircleIcon as _,InboxIcon as R,PlusIcon as E,TrashIcon as C}from"@/components/icons";export default function I({initialRecipients:N,userId:d}){const l=v(),[c,o]=r(N),[u,p]=r(""),[f,b]=r(""),[x,i]=r(null);async function h(e){e.preventDefault(),i(null);const n=m(),{data:a,error:s}=await n.from("permitwatch_recipients").insert({owner_id:d,created_by:d,email:u.trim(),name:f.trim()||null,is_default:!0}).select().single();if(s){i(s.message);return}o(t=>[...t,a]),p(""),b(""),l.refresh()}async function g(e){const n=m(),{error:a}=await n.from("permitwatch_recipients").update({is_default:!e.is_default}).eq("id",e.id);if(a){i(a.message);return}o(s=>s.map(t=>t.id===e.id?{...t,is_default:!t.is_default}:t)),l.refresh()}async function y(e){const n=m(),{error:a}=await n.from("permitwatch_recipients").delete().eq("id",e.id);if(a){i(a.message);return}o(s=>s.filter(t=>t.id!==e.id)),l.refresh()}return<div>
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Default</th>
              <th className="px-3 py-2 font-medium"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {c.map(e=><tr key={e.id}>
                <td className="px-3 py-2">{e.email}</td>
                <td className="px-3 py-2 text-neutral-500">{e.name||"-"}</td>
                <td className="px-3 py-2">
                  <input type="checkbox"checked={e.is_default}onChange={()=>g(e)}className="accent-blue-600"/>
                </td>
                <td className="px-3 py-2">
                  <button onClick={()=>y(e)}className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700">
                    <C className="h-3.5 w-3.5"/>
                    remove
                  </button>
                </td>
              </tr>)}
            {c.length===0&&<tr>
                <td colSpan={4}className="px-3 py-8 text-center text-neutral-400">
                  <div className="flex flex-col items-center gap-2">
                    <R className="h-6 w-6 text-neutral-300"/>
                    <span>No recipients yet. Add one below.</span>
                  </div>
                </td>
              </tr>}
          </tbody>
        </table>
      </div>

      <form onSubmit={h}className="mt-4 flex items-end gap-2">
        <div className="flex-1">
          <label className="mb-1 block text-xs text-neutral-500">Email</label>
          <input type="email"required value={u}onChange={e=>p(e.target.value)}className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs text-neutral-500">Name (optional)</label>
          <input type="text"value={f}onChange={e=>b(e.target.value)}className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
        </div>
        <button type="submit"className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
          <E className="h-3.5 w-3.5"/>
          Add
        </button>
      </form>
      {x&&<div className="mt-3 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <_ className="mt-0.5 h-4 w-4 shrink-0"/>
          <span>{x}</span>
        </div>}
    </div>}
