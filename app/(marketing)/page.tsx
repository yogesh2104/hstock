// import ContactForm from "@/components/contact-form";
// import FeaturesAndHighlight from "@/components/feature&highlight";
// import { HeroSection } from "@/components/hero-section";
// import ImageEditor from "@/components/Latest image-editor";
// import { OurDesign } from "@/components/our-design";
// import PricingPlans from "@/components/pricing";
// import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";


// const callAllPlanList=async()=>{
//     let response = await fetch(`${BASE_URL}${API_ENDPOINT.planApi}`);
//     let data =  response.json();

//     return data
// }

// const callHeroSectionList=async()=>{
//   let response = await fetch(`${BASE_URL}${API_ENDPOINT.heroSection}?getFilter=true`);
//   let data =  response.json();

//   return data
// }

// export default async function Home() {
//   const getPlan = await callAllPlanList()
//   const getAPIData = await callHeroSectionList()

//   return (
//     <>
//     {getAPIData?.data?.length!==0  && <HeroSection getAPIData={getAPIData?.data || []}/> }
//     {/* <ServiceWeProvide/> */}
//     {/* <Highlights/> */}
//     <FeaturesAndHighlight/>
//     {/* <SetpForDesgin/> */}
//     <OurDesign/>
//     <ImageEditor/>
//     <PricingPlans getPlan={getPlan?.data || []}/>
//     <ContactForm/>
//     </>
//   );
// }




import ContactForm from "@/components/contact-form";
import FeaturesAndHighlight from "@/components/feature&highlight";
import { HeroSection } from "@/components/hero-section";
import ImageEditor from "@/components/Latest image-editor";
import { OurDesign } from "@/components/our-design";
import PricingPlans from "@/components/pricing";
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text(); // Get the response as text first
    try {
      return JSON.parse(text); // Try to parse it as JSON
    } catch (e) {
      console.error("Failed to parse JSON. Received:", text.substring(0, 200)); // Log the first 200 characters of the response
      throw new Error("Invalid JSON response");
    }
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

const callAllPlanList = () => fetchData(`${BASE_URL}${API_ENDPOINT.planApi}`);
const callHeroSectionList = () => fetchData(`${BASE_URL}${API_ENDPOINT.heroSection}?getFilter=true`);

export default async function Home() {
  const [getPlan, getAPIData] = await Promise.all([
    callAllPlanList(),
    callHeroSectionList()
  ]);

  return (
    <>
      {getAPIData?.data?.length !== 0 && <HeroSection getAPIData={getAPIData?.data || []} />}
      <FeaturesAndHighlight />
      <OurDesign />
      <ImageEditor />
      {getPlan?.data && <PricingPlans getPlan={getPlan.data} />}
      <ContactForm />
    </>
  );
}

