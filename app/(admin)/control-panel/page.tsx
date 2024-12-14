import { auth } from "@/auth";
import ContactPage from "@/components/contact-page";
import { columns } from "@/components/data-table/column";
import { DataTable } from "@/components/data-table/data-table";
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

const callAllUserList=async(token:string)=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    let response = await fetch(`${BASE_URL}${API_ENDPOINT.alluserList}`,requestOptions);

    console.log("allUserList",response)
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

    const allUserList = await callAllUserList(token as string)
  return (
    <div className="container max-w-6xl mx-auto mt-10 ">
        <p>All User List</p>
        <DataTable columns={columns} data={allUserList?.data || []} />

        <ContactPage data={allUserList?.contact || []} />
    </div>
    
)}
