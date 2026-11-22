"use client";import{useEffect as a,useState as t}from"react";import{GlobeIcon as T}from"@/components/icons";import{browserTimezone as z,getStoredTimezone as N,listTimezones as k,setStoredTimezone as y}from"@/lib/timezone";export default function S(){const[n,o]=t(null),[l,s]=t([]);a(()=>{o(N()),s(k())},[]);function i(e){y(e),o(e),window.location.reload()}const r=n===null?null:z();return<label className="flex items-center gap-1.5 text-xs text-neutral-500">
      <T className="h-3.5 w-3.5 shrink-0"/>
      <span className="hidden sm:inline">Times shown in</span>
      <select value={n??""}onChange={e=>i(e.target.value)}className="rounded-md border border-neutral-300 bg-white px-1.5 py-1 text-xs text-neutral-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
        {n===null&&<option value="">…</option>}
        {l.map(e=><option key={e}value={e}>
            {e.replace(/_/g," ")}
            {e===r?" (your device)":""}
          </option>)}
      </select>
    </label>}
