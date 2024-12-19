"use client"

import Link from 'next/link';
import { useTheme } from 'next-themes';
import React, { useEffect, useState, useRef, ElementRef, } from 'react'
import { LogOut, Users, ChevronsLeft, Moon, Sun, MenuIcon, Mail } from "lucide-react"
import { usePathname, useRouter } from 'next/navigation';

import { Item } from './item';
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site-config';
import { useIsMobile } from '@/hook/use-mobile';
import { Button } from "@/components/ui/button"
import { logOut } from '@/app/action/signin-action';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Session } from 'next-auth';

const Navigation = ({session}:{session:Session | null}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile()
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
      if (isMobile) {
      collapse();
      } else {
      resetWidth();
      }
  }, [isMobile]);

  useEffect(() => {
      if (isMobile) {
      collapse();
      }
  }, [pathname, isMobile]);

  const handleMouseMove = (event: MouseEvent) => {
      if (!isResizingRef.current) return;
      let newWidth = event.clientX;

      if (newWidth < 240) newWidth = 240;
      if (newWidth > 480) newWidth = 480;

      if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
      }
  };

  const handleMouseUp = () => {
      isResizingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
      if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("width",isMobile ? "0" : "calc(100% - 240px)");
      navbarRef.current.style.setProperty("left",isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
      }
  };

  const collapse = () => {
      if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
      }
  }
  
  const handleNavigation=(path:string)=>{
      router.replace(path)
  }



  return (
    <>
      <aside ref={sidebarRef} className={cn("group/sidebar border-r dark:border-white/[.30] overflow-y-auto relative flex w-52 flex-col ",isResetting && "transition-all ease-in-out duration-300",isMobile && "w-0")}>
        <div onClick={collapse} role="button" className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-5 right-2 opacity-0 group-hover/sidebar:opacity-100 transition", isMobile && "opacity-100")}>
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <div className='text-start p-[10px]'>
            <Link href={'/'}>
              <img className='size-10' src='/logo.png' />
            </Link>
          </div>
          <div className='border-b dark:border-white/[.30]'/> 
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 focus-visible:ring-0'>
            <Button variant="ghost" className='w-full'>{session?.user?.email}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users />
                <span>{session?.user?.name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail />
                <span>{session?.user?.email}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem>
              {theme == "light" ? <Moon /> : <Sun />}
              <span className='capitalize' onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme}</span>
              
            </DropdownMenuItem>

            <DropdownMenuItem>
              <LogOut />
              <span onClick={logOut}>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='border-b dark:border-white/[.30]'/> 
        <div className='mt-6 p-1 h-screen'>
          {siteConfig.NavigationItem?.map((nav,navKey)=>{
            return(
              <Item key={navKey} onClickFn={()=>handleNavigation(nav?.path)} label={nav?.label} active={pathname==nav?.path}  icon={nav.icon}/>
            )
          })}
        </div>
        <div  className="opacity-0 transition absolute h-full w-1 bg-primary/10 right-0 top-0"/>
      </aside>
      <div ref={navbarRef} className={cn("absolute top-0 z-50 left-60 w-[calc(100%-200px)]",isResetting && "transition-all ease-in-out duration-300",isMobile && "left-0 w-full",)}>   
        <nav className={cn("bg-background dark:bg-[#1F1F1F] px-3 w-full flex !items-center gap-x-4 pt-[11px] pb-[11px] dark:border-white/[.30]")}>
          {isCollapsed && (<MenuIcon role="button" onClick={resetWidth} className="h-6 w-6 text-muted-foreground"/>)}
        </nav>
      </div>
    </>
  )
}

export default Navigation