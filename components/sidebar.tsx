"use client"

import { cn } from '@/lib/utils'
import React, { useEffect, useState, useRef, ElementRef, } from 'react'
import { ChevronsLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { MenuIcon } from 'lucide-react';
import { useIsMobile } from '@/hook/use-mobile';
import { Item } from './item';
import { siteConfig } from '@/config/site-config';

const Navigation = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useIsMobile()
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

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
            <img className='size-10' src='/logo.png' />
          </div>
          <div className='border-b dark:border-white/[.30]'/> 
        </div>
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