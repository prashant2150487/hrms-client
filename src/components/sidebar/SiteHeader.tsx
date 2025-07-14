import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BellRing, Search } from "lucide-react";
import { Input } from "../ui/input";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2  shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 py-2">
        <SidebarTrigger className="-ml-2 cursor-pointer" />
        
        <h1 className="text-base font-medium">Lucent Innovation</h1>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center justify-start border border-gray-300 rounded-3xl bg-white px-3">
            <Search className="size-5" />
            <Input
              className="border-none"
              placeholder="Search employee or actions"
            />
          </div>
          <div className="text-black rounded-full bg-white p-3">
            <BellRing className="size-4" />
          </div>
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
