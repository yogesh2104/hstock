import { auth } from "@/auth";
import { AdminHeroSection } from "@/components/admin-hero-section";
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

const callHeroSectionList=async(token:string)=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    const response = await fetch(`${BASE_URL}${API_ENDPOINT.heroSection}`,requestOptions);
    const data = response.json();

    return data
}

export default async function HeroPanel() {
    const session = await auth();
    const cookieStore = await  cookies()
    const env = process.env.NODE_ENV

    const isDev = env == "development" ?  "authjs.session-token": "__Secure-authjs.session-token"
    const token = cookieStore.get(isDev)?.value as string

    if(!session){
        redirect("/")
    }

    const getAPIData = await callHeroSectionList(token)

    return (
        <div className="container max-w-6xl mx-auto mt-10">
            <AdminHeroSection getAPIData={getAPIData?.data || []}/>
        </div>
    )
}
