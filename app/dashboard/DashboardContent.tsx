"use client";

import { useSearchParams } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Import your page components here
import Nds from "@/components/user_components/nds";
import Licence from "@/components/user_components/Licence";
import MyActiveServices from "@/components/user_components/MyActiveServices";
import MyPendingServices from "@/components/user_components/MyPendingServices";
import MyCancelledServices from "@/components/user_components/MyCancelledServices";
import DashboardOverview from "@/components/user_components/DashboardOverview";

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const tab = searchParams.get("tab");

  const renderPage = () => {
    if (section === "dashboard" && tab === "invite") return <DashboardOverview />;
    if (section === "services" && tab === "nds") return <Nds />;
    if (section === "docs" && tab === "licence") return <Licence />;
    if (section === "my-services" && tab === "active") return <MyActiveServices />;
    if (section === "my-services" && tab === "pending") return <MyPendingServices />;
    if (section === "my-services" && tab === "cancelled") return <MyCancelledServices />;

    return <div className="p-6 text-muted-foreground">← Select a menu from sidebar</div>;
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block md:w-64 fixed inset-y-0 left-0 z-30">
        <AppSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">NDS User</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {tab
                        ? tab.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
                        : "Dashboard"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <div className="p-4">{renderPage()}</div>
        </SidebarInset>
      </div>
    </div>
  );
}
