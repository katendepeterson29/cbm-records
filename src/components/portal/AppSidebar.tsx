import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Upload,
  Disc3,
  Wallet,
  ShieldCheck,
  Megaphone,
  MessagesSquare,
  LifeBuoy,
  BookOpen,
  Bell,
  Settings,
  UserRound,
  Sparkles,
} from "lucide-react";

const groups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/app", icon: LayoutDashboard, exact: true },
      { title: "Notifications", url: "/app/notifications", icon: Bell },
    ],
  },
  {
    label: "Music",
    items: [
      { title: "Distribution", url: "/app/distribution", icon: Upload },
      { title: "Releases", url: "/app/releases", icon: Disc3 },
      { title: "Copyright", url: "/app/copyright", icon: ShieldCheck },
    ],
  },
  {
    label: "Business",
    items: [
      { title: "Royalties", url: "/app/royalties", icon: Wallet },
      { title: "Marketing", url: "/app/marketing", icon: Megaphone },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "Messages", url: "/app/messages", icon: MessagesSquare },
      { title: "Support", url: "/app/support", icon: LifeBuoy },
      { title: "Resources", url: "/app/resources", icon: BookOpen },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/app/profile", icon: UserRound },
      { title: "Settings", url: "/app/settings", icon: Settings },
    ],
  },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string, exact?: boolean) =>
    exact ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-1.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-brand shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate font-display text-sm font-semibold">CBM Records</p>
            <p className="truncate text-xs text-muted-foreground">Artist portal</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((it) => (
                  <SidebarMenuItem key={it.url}>
                    <SidebarMenuButton asChild isActive={isActive(it.url, (it as { exact?: boolean }).exact)} tooltip={it.title}>
                      <Link to={it.url}>
                        <it.icon className="h-4 w-4" />
                        <span>{it.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          v0.1 · Demo build
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
