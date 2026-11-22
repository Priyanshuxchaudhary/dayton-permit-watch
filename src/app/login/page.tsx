import O from"./LoginForm";export default async function P({searchParams:n}){const{signedOut:r}=await n;return<O showSignedOutBanner={r==="1"}/>}
