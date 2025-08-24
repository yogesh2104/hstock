"use client"

import * as React from "react"
import {
  CircleDollarSign,
  GalleryHorizontal,
  IndianRupee,
  LayoutDashboard,
  Mail,
  Send,
  Video,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Session } from "next-auth"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain:[
    {
      title:'Hero Section',
      icon: GalleryHorizontal,
      url:'/control-panel/hero-section'
    },
    {
      title:'User Info',
      icon:LayoutDashboard,
      url:'/control-panel'
    },
    {
      title:'Payment',
      icon: CircleDollarSign,
      url:'/control-panel/payment-info'
    },
    {
      title:'Referral',
      icon: Send,
      url:'/control-panel/referral'
    },
    {
      title:'Plan',
      icon: IndianRupee,
      url:'/control-panel/plan'
    },
    {
      title:'Youtube Video',
      icon: Video,
      url:'/control-panel/video'
    },
    {
      title:'Email Content',
      icon: Mail,
      url:'/control-panel/email-section'
    }
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  session: Session | null;
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-16"
            >
              <Link href={'/'}>
                <img className='size-10' src='/logo.png' />
                HStock
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  )
}
