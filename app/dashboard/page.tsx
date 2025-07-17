// Remove "use client" here — this file is now a server component

import React, { Suspense } from "react";
import DashboardContent from "./DashboardContent"; // new client component
import { SidebarProvider } from "@/components/ui/sidebar";

export default function UserDashboardPage() {
  return (
    <SidebarProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </SidebarProvider>
  );
}
