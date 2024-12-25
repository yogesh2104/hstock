import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import AnnouncementBar from "@/components/announcement";

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
        <Footer/>
      </div>
    )
}

export default MainLayout