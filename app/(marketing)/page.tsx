import { auth } from "@/auth";
import ContactForm from "@/components/contact-form";
import FeaturesAndHighlight from "@/components/feature&highlight";
import { HeroSection } from "@/components/hero-section";
import Highlights from "@/components/highlight";
import ImageEditor from "@/components/Latest image-editor";
import { OurDesign } from "@/components/our-design";
import PricingPlans from "@/components/pricing";
import { ServiceWeProvide } from "@/components/service-we-provide";
import { SetpForDesgin } from "@/components/step-for-design";
import { cookies } from "next/headers";

export default async function Home() {
  const session = await auth();
  const cookieStore = await cookies()
  const env = process.env.NODE_ENV
  const isDev = env == "development" ? "authjs.session-token" : "__Secure-authjs.session-token"
  const token = cookieStore.get(isDev)?.value as string


  return (
    <>
    <HeroSection/>
    {/* <ServiceWeProvide/> */}
    {/* <Highlights/> */}
    <FeaturesAndHighlight/>
    {/* <SetpForDesgin/> */}
    <OurDesign/>
    <ImageEditor/>
    <PricingPlans/>
    <ContactForm/>
    </>
  );
}
