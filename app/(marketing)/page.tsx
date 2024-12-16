import ContactForm from "@/components/contact-form";
import FeaturesAndHighlight from "@/components/feature&highlight";
import { HeroSection } from "@/components/hero-section";
import ImageEditor from "@/components/Latest image-editor";
import { OurDesign } from "@/components/our-design";
import PricingPlans from "@/components/pricing";
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";
import { cookies } from "next/headers";


const callAllPlanList=async(token:string)=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    let response = await fetch(`${BASE_URL}${API_ENDPOINT.planApi}`,requestOptions);
    let data = response.json();

    return data
}

export default async function Home() {
  const cookieStore = await cookies()
  const env = process.env.NODE_ENV
  const isDev = env == "development" ? "authjs.session-token" : "__Secure-authjs.session-token"
  const token = cookieStore.get(isDev)?.value as string

  const getPlan = await callAllPlanList(token)

  return (
    <>
    <HeroSection/>
    {/* <ServiceWeProvide/> */}
    {/* <Highlights/> */}
    <FeaturesAndHighlight/>
    {/* <SetpForDesgin/> */}
    <OurDesign/>
    <ImageEditor/>
    <PricingPlans getPlan={getPlan?.data || []}/>
    <ContactForm/>
    </>
  );
}
