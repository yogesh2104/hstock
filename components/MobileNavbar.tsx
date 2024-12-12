"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LucideIcon, Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from 'react';
import { ToggleTheme } from "./ToggleTheme";

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="flex lg:hidden items-center justify-end">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    {!isOpen&& <Button size="icon" aria-label="menu-button" variant="ghost"><Menu className="w-5 h-5" /></Button>}
                </SheetTrigger>
                {!isOpen && <div className="">
                    <ToggleTheme/>
                </div>}
                <SheetContent className="w-screen">
                    <SheetTitle><span className="sr-only">Title</span></SheetTitle>    
                    <div className="flex flex-col items-start w-full py-2 mt-10">
                        <div className="flex items-center justify-evenly w-full space-x-2">
                            <Link href="/sign-in" className={buttonVariants({ variant: "outline", className: "w-full" })}>Sign In</Link>
                            <Link href="/sign-up" className={buttonVariants({ className: "w-full" })}>Sign Up</Link>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
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
                    <h6 className="text-sm !leading-none">
                        {title}
                    </h6>
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
