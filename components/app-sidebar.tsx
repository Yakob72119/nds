"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BookOpen,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data?.user?.email ?? null);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // 👇 Same structure as admin sidebar
  const data = {
    user: {
      name: "NDS User",
      email: userEmail ?? "Loading...",
      avatar: "/avatars/shadcn.jpg",
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
        title: "Dashboard Overview",
        url: "#",
        icon: SquareTerminal,
        items: [
          {
            title: "Invite link",
            url: "/dashboard?section=dashboard&tab=invite",
          },
        ],
      },
      {
        title: "NDS Services",
        url: "#",
        icon: SquareTerminal,
        items: [
          {
            title: "Current Nds Service",
            url: "/dashboard?section=services&tab=nds",
          },
        ],
      },
    
      {
        title: "NDS License",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "License Document",
            url: "/dashboard?section=docs&tab=licence",
          },
        ],
      },
      {
        title: "My Services",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Active Services",
            url: "/dashboard?section=my-services&tab=active",
          },
          {
            title: "Pending Services",
            url: "/dashboard?section=my-services&tab=pending",
          },
          {
            title: "Canceled Services",
            url: "/dashboard?section=my-services&tab=cancelled",
          },
        ],
      },
    ],
  };

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
  );
}
