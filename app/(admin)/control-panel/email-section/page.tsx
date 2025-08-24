import { auth } from "@/auth";
import FeatureSectionsManager from "@/components/admin-email-section";
// import AdminEmailSection from "@/components/admin-email-section";
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";


export default async function HeroPanel() {
    const session = await auth();
    const cookieStore = await  cookies()
    const env = process.env.NODE_ENV

    const isDev = env == "development" ?  "authjs.session-token": "__Secure-authjs.session-token"
    const token = cookieStore.get(isDev)?.value as string

    if(!session){
        redirect("/")
    }


    return (
        <div className="container max-w-6xl mx-auto">
            <FeatureSectionsManager/>
        </div>
    )
}
