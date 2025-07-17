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

  // Fetch user data from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data?.user?.email ?? null);
    };
    fetchUser();
  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to home page after logout
  };

  // Data to pass to the NavUser component
  const data = {
    user: {
      name: "NDS Admin",
      email: userEmail ?? "Loading...",
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
        {/* Pass user data and methods separately */}
        <NavUser
          user={data.user}
          onHome={() => router.push("/")} // Home route
          onLogout={handleLogout} // Logout functionality
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
