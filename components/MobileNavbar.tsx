"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet,SheetContent,SheetTitle,SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LucideIcon, Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useUseSideBar } from "@/hook/use-open-sidebar";

const MobileNavbar = ({session}:any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { setIsOpen:setOpenSidebar } = useUseSideBar()
    return (
        <div className="flex lg:hidden items-center justify-end" data-sidebar={isOpen ? "open" : "closed"}>
            <Sheet open={isOpen} onOpenChange={(e)=>{setIsOpen(e), setOpenSidebar(e)}}>
                <SheetTrigger asChild className="">
                    {!isOpen&& <Button size="icon" aria-label="menu-button" variant="ghost"><Menu className="w-5 h-5 z-50" /></Button>}
                </SheetTrigger>
                <SheetContent className="w-screen" side={"left"}>
                    <SheetTitle><span className="sr-only">Title</span></SheetTitle>    
                    {session ? 
                        <div className="w-full py-2 mt-10">
                            <div className="flex items-center justify-evenly w-full space-x-2">
                            {session?.user?.role=="admin" &&
                                <Link href={'/control-panel'} className={cn(buttonVariants({ size: "sm"}),"bg-primary w-full")} >Admin Dashboard</Link>
                                // :
                                // <div className={cn(buttonVariants({ size: "sm", variant: "outline"}),"w-full")}>{session?.user?.name}</div>
                            }
                            <MobileLink href={"/#pricing-plan"} onOpenChange={setIsOpen} className={cn(buttonVariants({ size: "sm"}),"bg-primary w-full")}>Buy Now</MobileLink>
                            <MobileLink href={"/purchases"} onOpenChange={setIsOpen} className={cn(buttonVariants({ size: "sm"}),"bg-primary w-full")}>My purchases</MobileLink>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col  w-full py-2 mt-10">
                            <div className="flex items-center w-full gap-x-4">
                                <MobileLink href={"/sign-in"} className={cn(buttonVariants({ size: "sm"}),"bg-primary w-full")}  onOpenChange={setIsOpen}>Sign In</MobileLink>
                                <MobileLink href={"/sign-up"} className={cn(buttonVariants({ size: "sm"}),"bg-primary w-full")}  onOpenChange={setIsOpen}>Sign Up</MobileLink>
                            </div>
                        </div>
                    }
                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-col space-y-3 pt-6 text-xs">
                            <MobileLink href={"/"} onOpenChange={setIsOpen}>Home</MobileLink>
                            <MobileLink href={"/#features"}  onOpenChange={setIsOpen}>Feature</MobileLink>
                            <MobileLink href={"/#our-design"}  onOpenChange={setIsOpen}>Our Design</MobileLink>
                            <MobileLink href={"/traning-demo-videos"}  onOpenChange={setIsOpen}>Traning & Demo Videos</MobileLink>
                            <MobileLink href={"/contact"}  onOpenChange={setIsOpen}>Contact</MobileLink>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
};

const ListItem = React.forwardRef<React.ElementRef<"a">,React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }>((
    { className, title, href, icon: Icon, children, ...props }, ref) => {
    return (
        <li>
            <Link
                href={href!}
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}
            >
                <div className="flex items-center space-x-2 text-foreground">
                    <Icon className="h-4 w-4" />
                    <h6 className="text-sm !leading-none">{title}</h6>
                </div>
                <p title={children! as string} className="line-clamp-1 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </Link>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default MobileNavbar


interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
}
  
function MobileLink({href,onOpenChange,className,children,...props}: MobileLinkProps) {
    const router = useRouter()
    return (
      <Link
        href={href}
        onClick={() => {
          router.push(href.toString())
          onOpenChange?.(false)
        }}
        className={cn("text-base", className)}
        {...props}
      >
        {children}
      </Link>
    )
  }
