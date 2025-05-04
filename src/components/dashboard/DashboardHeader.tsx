
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "../Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
  userType: "owner" | "member";
  sidebarCollapsed?: boolean;
}

export function DashboardHeader({ toggleSidebar, userType, sidebarCollapsed }: DashboardHeaderProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Member Registration",
      message: "Emily Johnson just signed up",
      time: "5 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Membership payment from James Wilson",
      time: "2 hours ago",
      read: false
    },
    {
      id: 3,
      title: "Class Booking",
      message: "12 members booked for HIIT class",
      time: "Yesterday",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <Logo size="medium" />
          </div>
          
          <div className="flex-1 ml-8 hidden md:block">
            <div>
              <p className="text-sm text-muted-foreground">{format(new Date(), "EEEE, MMMM do, yyyy")}</p>
              <h2 className="text-xl font-semibold">
                {greeting}, {userType === "owner" ? "John" : "Member"}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-x-4">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2 animate-pulse">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2" role="menu">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
                    <h3 className="font-medium">Notifications</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={markAllAsRead} 
                        className="text-xs text-fitpulse-purple hover:text-fitpulse-dark-purple"
                      >
                        Mark all as read
                      </button>
                      <button 
                        onClick={() => setShowNotifications(false)} 
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {notifications.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-gray-50 border-l-4 ${notification.read ? 'border-transparent' : 'border-fitpulse-purple'}`}
                        >
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <p>No new notifications</p>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-100 px-4 py-2">
                    <a href="#" className="text-xs text-fitpulse-purple hover:text-fitpulse-dark-purple font-medium">
                      View all notifications
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="default"
                className="flex items-center gap-2"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Owner" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {showUserMenu && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm">Signed in as</p>
                    <p className="truncate text-sm font-medium text-gray-900">
                      {userType === "owner" ? "owner@demo.com" : "member123"}
                    </p>
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Settings
                  </a>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
