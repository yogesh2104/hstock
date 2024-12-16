import { auth } from "@/auth";
import VideoTable from "@/components/video-page";
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";


const callAllVideoList=async(token:string)=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    let response = await fetch(`${BASE_URL}${API_ENDPOINT.youtubeVideo}`,requestOptions);
    let data = response.json();

    return data
}

export default async function VideoPanel() {
    const session = await auth();
    const cookieStore = await  cookies()
    const env = process.env.NODE_ENV

    const isDev = env == "development" ?  "authjs.session-token": "__Secure-authjs.session-token"
    const token = cookieStore.get(isDev)?.value as string

    if(!session){
        redirect("/")
    }

    const getVideoList = await callAllVideoList(token)

    return (
        <div className="container max-w-6xl mx-auto mt-10 ">
            <p>Video List</p>
            <VideoTable apiResponse={getVideoList?.data || []}/>
        </div>
    )
}
