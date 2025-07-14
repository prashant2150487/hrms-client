import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Compass,
  HeartHandshake,
  House,
  Icon,
  Inbox,
  PersonStanding,
  User,
} from "lucide-react";
import { NavMain } from "./NavMain";
// import { NavDocuments } from "./NavDocument"
import { NavSecondary } from "./NavSecondary";
import { NavUser } from "./NavUser";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home/dashboard",
      icon: House,
    },
    {
      title: "Me",
      url: "/me/attendance",
      icon: User,
    },
    {
      title: "Inbox",
      url: "/dashboard/inbox",
      icon: Inbox,
    },
    {
      title: "My Teams",
      url: "#",
      icon: HeartHandshake,
    },

    // {
    //   title: "Engage",
    //   url: "#",
    //   icon: Icon,
    // },
    // {
    //   title: "Performance",
    //   url: "#",
    //   icon: Icon,
    // },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: Icon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: Icon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: Icon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Icon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: Icon,
    },
    {
      title: "Search",
      url: "#",
      icon: Icon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: Icon,
    },
    {
      name: "Reports",
      url: "#",
      icon: Icon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: Icon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userData = useSelector((state: RootState) => state.userInfo.user);
  const navMain = useMemo(() => {
    const items = [...data.navMain];
    if (userData?.role == "admin") {
      items.push({
        title: "Admin",
        url: "/admin/onboard",
        icon: PersonStanding,
      });
    }else if(userData?.role==="superadmin"){
      items.push({
        title: "Super Admin",
        url: "/super-admin/onboard",
        icon: PersonStanding,
      });

    }
    return items;
  }, [userData]);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <Compass className="!size-5" />
                <span className="text-base font-semibold">Smart HR</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="">
        <NavMain items={navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
