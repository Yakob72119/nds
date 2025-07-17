"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/admin_component/nav-main"
import { NavUser } from "@/components/admin_component/nav-user"
import { TeamSwitcher } from "@/components/admin_component/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/admin_ui/sidebar"



// This is sample data.
const data = {
  user: {
    name: "NDS Admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Nds Trading Hub",
      logo: GalleryVerticalEnd,
      plan: "Start up",
    },
  ],
  navMain: [
  {
    title: "Nds users",
    url: "#",
    icon: SquareTerminal,
    items: [
      {
        title: "Current Users",
        url: "/admin?section=users&tab=current",
      },
    ],
  },
  {
    title: "Manage Services",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "Active Services",
        url: "/admin?section=services&tab=active",
      },
      {
        title: "Pending Services",
        url: "/admin?section=services&tab=pending",
      },
      {
        title: "Cancelled Service",
        url: "/admin?section=services&tab=cancelled",
      },
    ],
  },
],

 
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


    
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
