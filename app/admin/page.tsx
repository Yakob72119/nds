import { Suspense } from "react";
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
import AdminPageContent from "@/components/admin_component/AdminPageContent";

export default function Page() {
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
                      {/* You can keep this static or you can lift tab state if needed */}
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            {/* Dynamic Content */}
            <Suspense fallback={<div>Loading...</div>}>
              <div className="p-4">
                <AdminPageContent />
              </div>
            </Suspense>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
