"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ShieldAiLogo } from "@/components/icons/ShieldAiLogo";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  DatabaseZap,
  ShieldCheck,
  BellRing,
  History,
  UserCircle,
  LogOut,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  tooltip: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, tooltip: "Dashboard" },
  { href: "/data-lake", label: "Data Lake", icon: DatabaseZap, tooltip: "Data Lake" },
  { href: "/real-time-defense", label: "Real-time Defense", icon: ShieldCheck, tooltip: "Real-time Defense" },
  { href: "/alert-config", label: "Alert Configuration", icon: BellRing, tooltip: "Alert Configuration" },
  { href: "/threat-logs", label: "Threat Logs", icon: History, tooltip: "Threat Logs" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/90">
            <ShieldAiLogo className="w-8 h-8 text-accent" />
            <h1 className="text-xl font-semibold font-headline group-data-[collapsible=icon]:hidden">Shield AI</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent asChild>
          <ScrollArea className="flex-1">
            <SidebarMenu className="gap-1 p-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                      tooltip={{children: item.tooltip, className: "text-xs"}}
                    >
                      <a>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="p-2 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
               <Link href="/login" legacyBehavior passHref>
                <SidebarMenuButton asChild tooltip={{children: "Logout", className: "text-xs"}}>
                  <a>
                    <LogOut />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-background border-b md:px-6">
          <div>
             <SidebarTrigger className="md:hidden" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="w-6 h-6" />
              <span className="sr-only">User Profile</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 overflow-auto md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
