import N from"next/link";import{supabaseServer as k}from"@/lib/supabase/server";import A from"./RecipientManager";import{ArrowLeftIcon as I}from"@/components/icons";export const dynamic="force-dynamic";export default async function L(){const e=await k(),[{data:t},{data:a}]=await Promise.all([e.from("permitwatch_recipients").select("*").order("is_default",{ascending:!1}).order("email"),e.auth.getUser()]),r=a.user?.id??"";return<div className="mx-auto max-w-2xl px-4 py-8">
      <N href="/"className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-blue-600">
        <I className="h-4 w-4"/>
        Back
      </N>
      <h1 className="mt-3 mb-2 text-xl font-semibold text-neutral-900">Your profile</h1>
      <p className="mb-6 text-sm text-neutral-500">
        This list is private to your account, nobody else using the app can see it. Anyone marked
        default gets every run you trigger, plus the shared daily digest. Want to loop someone in
        just once instead? Add them under &quot;Customize a run&quot; on the home page, that one
        stays temporary and only applies to that single run.
      </p>
      <A initialRecipients={t??[]}userId={r}/>
    </div>}
