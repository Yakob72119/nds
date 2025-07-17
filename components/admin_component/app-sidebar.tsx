"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { NavMain } from "@/components/admin_component/nav-main";
import { NavUser } from "@/components/admin_component/nav-user";
import { TeamSwitcher } from "@/components/admin_component/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/admin_ui/sidebar";

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

  const data = {
    user: {
      name: "NDS Admin",
      email: userEmail ?? "Loading...",
      avatar: "/avatars/shadcn.jpg",
      onLogout: handleLogout,
      onHome: () => router.push("/"),
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
