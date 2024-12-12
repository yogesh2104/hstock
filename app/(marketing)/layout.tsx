import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";

const MainLayout=async({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    const session = await auth();
 
    return(
      <div>
        <Navbar session={session}/>
        {children}
        <Footer/>
      </div>
    )
}

export default MainLayout