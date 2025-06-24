
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BadgeDollarSign, Compass, HeartHandshake, House, Icon, Inbox, User } from "lucide-react"
import { NavMain } from "./NavMain"
import { NavDocuments } from "./NavDocument"
import { NavSecondary } from "./NavSecondary"
import { NavUser } from "./NavUser"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: House,
    },
    {
      title: "Me",
      url: "#",
      icon: User,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "My Teams",
      url: "#",
      icon: HeartHandshake,
    },
    {
      title: "My Finance",
      url: "#",
      icon: BadgeDollarSign,
    },
    // {
    //   title: "Org",
    //   url: "#",
    //   icon: Icon,
    // },
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Compass className="!size-5" />
                <span className="text-base font-semibold">Smart HR</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="">
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
