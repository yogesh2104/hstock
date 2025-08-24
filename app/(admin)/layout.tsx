import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/provider/theme-provider";


const MainLayout = async ({children}:{children:React.ReactNode}) => {
     const session = await auth();

    //@ts-expect-error
    if(session?.user?.role !=="admin"){
        return redirect("/")
    }

    return ( 
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
                <AppSidebar variant="inset" session={session}/>
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">{children}</div>
                    </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
     );
}
 
export default MainLayout;