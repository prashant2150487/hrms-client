// import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon; // single source of truth
};
export function NavMain({ items }: { items: NavItem[] }) {
  const { page } = useParams<{ page: string }>()
  console.log(page,items)
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
                className={`bg-[#CAE162] rounded-md font-semibold p-2 hover:bg-gray-100 ${page==title.toLowerCase() ? "bg-[#CAE162]": "bg-white text-black"}`}
              >
                <Link to={url} className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
