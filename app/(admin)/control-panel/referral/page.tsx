import { auth } from "@/auth";
import { ReferralDataTable } from "@/components/data-table/referral-table/referral-table";
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";


const callAllReferralCodeList=async(token:string)=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    let response = await fetch(`${BASE_URL}${API_ENDPOINT.getAllCode}`,requestOptions);
    let data = response.json();

    return data
}

export default async function ControlPanel() {
    const session = await auth();
    const cookieStore = await  cookies()
    const env = process.env.NODE_ENV

    const isDev = env == "development" ?  "authjs.session-token": "__Secure-authjs.session-token"
    const token = cookieStore.get(isDev)?.value as string

    if(!session){
        redirect("/")
    }

    const getCode = await callAllReferralCodeList(token)


  return (
    <div className="container max-w-6xl mx-auto mt-10 ">
        <p>Refrral Code List.</p>
        <ReferralDataTable data={getCode?.referral || []} />
    </div>
    
)}
