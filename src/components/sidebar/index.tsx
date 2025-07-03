import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { SiteHeader } from "./SiteHeader";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" className="" />
      <SidebarInset className="bg-[#F6F4F3]">
        <SiteHeader />
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
