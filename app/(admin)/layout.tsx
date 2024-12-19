import { auth } from "@/auth";
import Navigation from "@/components/sidebar";
import { redirect } from "next/navigation";

const MainLayout = async ({children}:{children:React.ReactNode}) => {
     const session = await auth();

     //@ts-expect-error
     if(session?.user?.role !=="admin"){
        return redirect("/")
     }

    return ( 
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation session={session}/>
            <main className="flex-1 h-full overflow-y-auto">{children}</main>
        </div>
     );
}
 
export default MainLayout;