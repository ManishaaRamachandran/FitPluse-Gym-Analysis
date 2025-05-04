import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  Calendar, 
  Home, 
  Settings, 
  Users, 
  BarChart2, 
  ChevronDown, 
  ChevronRight,
  User,
  Dumbbell,
  UserPlus,
  CreditCard,
  Bell,
  Lock,
  Shield,
  Target,
  List,
  History,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  isOpen: boolean;
  userType: "owner" | "member";
}

interface MenuItem {
  name: string;
  to: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

export function Sidebar({ isOpen, userType }: SidebarProps) {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const ownerMenuItems: MenuItem[] = [
    { name: 'Home', to: '/owner-dashboard', icon: Home },
    { name: 'Dashboard', to: '/owner-dashboard/dashboard', icon: BarChart2 },
    { name: 'Members', to: '/owner-dashboard/members', icon: Users },
    { name: 'Programs', to: '/owner-dashboard/programs', icon: Activity },
    { 
      name: 'Settings', 
      to: '/owner-dashboard/settings', 
      icon: Settings,
      children: [
        { name: 'Profile', to: '/owner-dashboard/settings/profile', icon: User },
        { name: 'Gym Info', to: '/owner-dashboard/settings/gym-info', icon: Dumbbell },
        { name: 'User Management', to: '/owner-dashboard/settings/user-management', icon: UserPlus },
        { name: 'Billing', to: '/owner-dashboard/settings/billing', icon: CreditCard },
        { name: 'Notification', to: '/owner-dashboard/settings/notification', icon: Bell },
        { name: 'Password', to: '/owner-dashboard/settings/password', icon: Lock },
        { name: 'Reports', to: '/owner-dashboard/settings/reports', icon: BarChart2 },
        { name: 'Security', to: '/owner-dashboard/settings/security', icon: Shield }
      ]
    }
  ];

  const memberMenuItems: MenuItem[] = [
    { name: 'Home', to: '/member-dashboard', icon: Home },
    { name: 'Overview', to: '/member-dashboard/overview', icon: BarChart2 },
    { name: 'My Programs', to: '/member-dashboard/programs', icon: List },
    { name: 'Schedules', to: '/member-dashboard/schedule', icon: Calendar },
    { name: 'Attendance', to: '/member-dashboard/attendance', icon: History },
    { 
      name: 'Settings', 
      to: '/member-dashboard/settings', 
      icon: Settings,
      children: [
        { name: 'Profile', to: '/member-dashboard/settings/profile', icon: User },
        { name: 'Notifications', to: '/member-dashboard/settings/notifications', icon: Bell },
        { name: 'Billing', to: '/member-dashboard/settings/billing', icon: CreditCard },
        { name: 'Password', to: '/member-dashboard/settings/password', icon: Lock },
        { name: 'Fitness Goals', to: '/member-dashboard/settings/goals', icon: Target }
      ]
    }
  ];

  const menuItems = userType === 'owner' ? ownerMenuItems : memberMenuItems;

  const toggleSubMenu = (menuName: string) => {
    if (openSubMenu === menuName) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(menuName);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.to);
    const expanded = openSubMenu === item.name;

    return (
      <div key={item.name} className="mb-1">
        {hasChildren ? (
          <>
            <Button
              variant={active ? "default" : "ghost"}
              className={cn(
                "w-full justify-between transition-all duration-300 hover:scale-[1.02]",
                active 
                  ? "bg-gradient-to-r from-fitpulse-purple to-fitpulse-dark-purple text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
              onClick={() => toggleSubMenu(item.name)}
            >
              <div className="flex items-center">
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")} />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </div>
              {!collapsed && (expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
            </Button>

            {expanded && !collapsed && (
              <div className="mt-1 ml-6 space-y-1 animate-in slide-in-from-left-2">
                {item.children!.map((child) => (
                  <Link key={child.name} to={child.to}>
                    <Button
                      variant={isActive(child.to) ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start transition-all duration-200 hover:scale-[1.02]",
                        isActive(child.to)
                          ? "bg-fitpulse-purple/80 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      <child.icon className="mr-2 h-4 w-4" />
                      <span className="truncate">{child.name}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <Link to={item.to}>
            <Button
              variant={active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-300 hover:scale-[1.02]",
                active
                  ? "bg-gradient-to-r from-fitpulse-purple to-fitpulse-dark-purple text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")} />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Button>
          </Link>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col transform transition-all duration-300 ease-in-out bg-white border-r border-gray-200",
        collapsed ? "w-20" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-gray-200 justify-between">
        {!collapsed && <Logo />}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="lg:flex hidden hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>
      
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="px-2 py-4 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt={userType === 'owner' ? 'Gym Owner' : 'Member'} />
              <AvatarFallback>{userType === 'owner' ? 'JD' : 'M'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{userType === 'owner' ? 'Gym Owner' : 'Premium Member'}</div>
              <div className="text-sm text-gray-500 truncate">{userType === 'owner' ? 'owner@demo.com' : 'member123'}</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
