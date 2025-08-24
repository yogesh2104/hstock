import TrainingVideos from "@/components/traning-demo-video";
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";

const callAllVideoList=async()=>{
    const requestOptions = {
        method: "GET",
    };

    let response = await fetch(`${BASE_URL}${API_ENDPOINT.youtubeVideo}/?getFilter=true`,requestOptions);
    let data = response.json();

    return data
}

export default async function DemoVideo() {
    const getVideoList = await callAllVideoList()

    return <TrainingVideos apiData={getVideoList?.data || []}/>
}
