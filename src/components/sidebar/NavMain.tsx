// import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PiIcon, PinIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon; // single source of truth
};
export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map(({ title, url, icon: Icon }) => (
            <SidebarMenuItem key={title}>
              {/* keep the link semantics inside the button */}
              <SidebarMenuButton
                asChild
                tooltip={title}
                className="bg-[#CAE162] rounded-md font-semibold p-2"
              >
                <a href={url} className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span>{title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
