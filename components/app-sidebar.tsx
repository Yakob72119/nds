"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  BookOpen,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUserEmail(data.user.email ?? null)
      } else {
        setUserEmail(null)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/") // Redirect to homepage
  }

  const navData = {
    user: {
      name: "NDS User",
      email: userEmail ?? "Loading...",
      avatar: "/avatars/shadcn.jpg", // Optional: replace with user's profile pic if stored
      onLogout: handleLogout,
      onHome: () => router.push("/"),
    },
    teams: [
      {
        name: "Nds Trading Hub",
        logo: GalleryVerticalEnd,
        plan: "Startup",
      },
    ],
    navMain: [
      {
        title: "Nds Services",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: "Social Media Service", url: "#" },
          { title: "Healthcare Service", url: "#" },
          { title: "Educational Service", url: "#" },
        ],
      },
      {
        title: "Nds License and Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "Introduction", url: "#" },
          { title: "Get Started", url: "#" },
          { title: "Tutorials", url: "#" },
          { title: "Changelog", url: "#" },
        ],
      },
      {
        title: "My Services",
        url: "#",
        icon: Settings2,
        items: [
          { title: "Active Services", url: "#" },
          { title: "Pending Services", url: "#" },
          { title: "Canceled Services", url: "#" },
        ],
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
