import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Users,
  FileText,
  BarChart3,
  Settings,
  Send,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  FileSpreadsheet,
  Beaker,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Главная",
    items: [
      { title: "Дашборд", url: "/", icon: LayoutDashboard },
      { title: "Кампании", url: "/campaigns", icon: Mail },
      { title: "Контакты", url: "/contacts", icon: Users },
      { title: "Шаблоны", url: "/templates", icon: FileText },
      { title: "Ответы", url: "/replies", icon: MessageSquare },
    ],
  },
  {
    title: "Аналитика",
    items: [
      { title: "Отчеты", url: "/reports", icon: FileSpreadsheet },
      { title: "A/B Тестирование", url: "/ab-testing", icon: Beaker },
      { title: "Аналитика", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Автоматизация",
    items: [
      { title: "Триггеры", url: "/triggers", icon: Zap },
      { title: "Воронки", url: "/funnels", icon: TrendingUp },
      { title: "Сегментация", url: "/segmentation", icon: Target },
      { title: "Валидация", url: "/validation", icon: CheckCircle },
    ],
  },
  {
    title: "Инструменты",
    items: [
      { title: "Отправка", url: "/send", icon: Send },
      { title: "Настройки", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Mail className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-lg">ColdReach</span>
            )}
          </div>
        </div>

        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            {!isCollapsed && (
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-sm"
                              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}