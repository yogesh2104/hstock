import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import AnnouncementBar from "@/components/announcement";
import SocialMedia from "@/components/social-media";
export const revalidate = 3600;

const MainLayout=async({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    const session = await auth();
 
    return(
      <div>
        <AnnouncementBar/>
        <Navbar session={session}/>
        {children}
        <SocialMedia/>
        <Footer/>
      </div>
    )
}

export default MainLayout