import { auth } from "@/auth";
import ContactForm from "@/components/contact-form";
import FeaturesAndHighlight from "@/components/feature&highlight";
import { HeroSection } from "@/components/hero-section";
import ImageEditor from "@/components/Latest image-editor";
import { OurDesign } from "@/components/our-design";
import PricingPlans from "@/components/pricing";
import { WelcomeDialog } from "@/components/show-alert-dialog";
import { API_ENDPOINT, BASE_URL } from "@/config/api-endpoint";

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`API endpoint not found: ${url}`);
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON. Received:", text.substring(0, 200));
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
  const session = await auth();
  const [getPlan, getAPIData] = await Promise.all([
    callAllPlanList(),
    callHeroSectionList()
  ]);

  return (
    <>
      <WelcomeDialog/>
      {getAPIData?.data?.length !== 0 && <HeroSection getAPIData={getAPIData?.data || []} />}
      {getPlan?.data && <PricingPlans getPlan={getPlan.data} session={session} />}
      <FeaturesAndHighlight />
      <OurDesign />
      <ImageEditor />
      <ContactForm />
    </>
  );
}

