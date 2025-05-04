
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  userType: "owner" | "member";
}

export function DashboardLayout({ userType }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} userType={userType} />
      
      <div className="lg:pl-64 transition-all duration-300">
        <DashboardHeader 
          toggleSidebar={toggleSidebar} 
          userType={userType}
          sidebarCollapsed={sidebarCollapsed} 
        />
        
        <main className="p-4 sm:p-6 md:p-8 animate-in fade-in-50">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-gray-600 bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
