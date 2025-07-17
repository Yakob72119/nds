"use client";

import { AppSidebar } from "@/components/admin_component/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/admin_ui/breadcrumb";
import { Separator } from "@/components/admin_ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/admin_ui/sidebar";
import { useSearchParams } from "next/navigation";

// Page components (create them as placeholders)
import CurrentUsers from "@/components/admin_component/users";
import ActiveServices from "@/components/admin_component/ActiveServices";
import PendingServices from "@/components/admin_component/PendingServices";
import CancelledServices from "@/components/admin_component/CancelledServices";

export default function Page() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const tab = searchParams.get("tab");

  const renderPage = () => {
    if (section === "users" && tab === "current") return <CurrentUsers />;
    if (section === "services" && tab === "active") return <ActiveServices />;
    if (section === "services" && tab === "pending") return <PendingServices />;
    if (section === "services" && tab === "cancelled") return <CancelledServices />;
    return <div className="p-6 text-muted-foreground">← Select a menu from sidebar</div>;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:block md:w-64 fixed inset-y-0 left-0 z-30">
          <AppSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-64">
          <SidebarInset>
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
                      <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{tab ?? "Dashboard"}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            {/* Dynamic Content */}
            <div className="p-4">{renderPage()}</div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
