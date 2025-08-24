import { auth } from "@/auth";
import FeatureSectionsManager from "@/components/admin-email-section";
import { redirect } from "next/navigation";


export default async function HeroPanel() {
    const session = await auth();
    if(!session){
        redirect("/")
    }


    return (
        <div className="container max-w-6xl mx-auto">
            <FeatureSectionsManager/>
        </div>
    )
}
