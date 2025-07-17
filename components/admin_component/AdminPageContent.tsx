"use client";

import { useSearchParams } from "next/navigation";
import CurrentUsers from "@/components/admin_component/users";
import ActiveServices from "@/components/admin_component/ActiveServices";
import PendingServices from "@/components/admin_component/PendingServices";
import CancelledServices from "@/components/admin_component/CancelledServices";

export default function AdminPageContent() {
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

  return <>{renderPage()}</>;
}
