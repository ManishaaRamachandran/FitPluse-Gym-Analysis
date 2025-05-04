
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Check if link is active
  const isActive = (href: string) => {
    if (href === "#") return location.hash === "" && location.pathname === "/";
    return location.hash === href;
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  
  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/80 backdrop-blur-md shadow-md border-b border-white/10" 
        : "bg-transparent"
    )}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Logo className="transition-transform duration-300 hover:scale-105" />
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="relative z-50 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {!mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {[
            { name: "Features", href: "#features" }, 
            { name: "Testimonials", href: "#testimonials" }, 
            { name: "Gallery", href: "#gallery" }, 
            { name: "Contact", href: "#contact" }
          ].map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className={cn(
                "text-sm font-medium relative transition-colors duration-300",
                "hover:text-fitpulse-purple after:absolute after:left-0 after:-bottom-1 after:h-0.5",
                "after:w-full after:origin-left after:scale-x-0 after:bg-fitpulse-purple after:transition-transform",
                "hover:after:scale-x-100",
                isActive(item.href) 
                  ? "text-fitpulse-purple after:scale-x-100" 
                  : "text-gray-900"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
          <button 
            onClick={toggleDarkMode}
            className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {darkMode ? (
              <Sun size={18} className="text-amber-500" />
            ) : (
              <Moon size={18} className="text-indigo-500" />
            )}
          </button>
          
          <Button 
            asChild 
            variant="outline" 
            className="rounded-full border-fitpulse-purple/30 hover:border-fitpulse-purple hover:bg-fitpulse-purple/5 transition-all duration-300 hover:scale-105"
          >
            <Link to="/member-login" className="flex items-center gap-1">
              <span className="relative">
                <span className="absolute inset-0 rounded-full bg-fitpulse-purple/10 animate-ping opacity-75 group-hover:opacity-100"></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fitpulse-purple">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              Member Login
            </Link>
          </Button>
          
          <Button 
            asChild 
            className="rounded-full bg-gradient-to-r from-fitpulse-purple to-fitpulse-deeper-purple hover:from-fitpulse-purple/90 hover:to-fitpulse-deeper-purple/90 shadow-sm hover:shadow-md hover:shadow-fitpulse-purple/20 transition-all duration-300 hover:scale-105 group"
          >
            <Link to="/owner-login" className="flex items-center gap-1">
              <span className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-300">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                  <path d="m15 10 2 2 4-4"></path>
                </svg>
              </span>
              Owner Login
            </Link>
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu, show/hide based on menu open state. */}
      <div 
        className={cn(
          "fixed inset-0 z-40 transform transition-all duration-300 ease-in-out lg:hidden",
          mobileMenuOpen 
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0"
        )}
      >
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        
        <div className="fixed inset-y-0 right-0 z-40 w-full max-w-sm overflow-y-auto bg-white/90 backdrop-blur-md px-6 py-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-8 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-1 py-6">
                {[
                  { name: "Features", href: "#features" }, 
                  { name: "Testimonials", href: "#testimonials" }, 
                  { name: "Gallery", href: "#gallery" }, 
                  { name: "Contact", href: "#contact" }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "group flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium transition-all duration-300",
                      isActive(item.href)
                        ? "bg-fitpulse-purple/10 text-fitpulse-purple"
                        : "text-gray-900 hover:bg-fitpulse-purple/5 hover:text-fitpulse-purple"
                    )}
                  >
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all duration-300",
                      isActive(item.href)
                        ? "bg-fitpulse-purple"
                        : "bg-gray-300 group-hover:bg-fitpulse-purple"
                    )} />
                    {item.name}
                  </a>
                ))}
              </div>
              
              <div className="py-6 space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Toggle theme</span>
                  <button 
                    onClick={toggleDarkMode}
                    className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {darkMode ? (
                      <Sun size={18} className="text-amber-500" />
                    ) : (
                      <Moon size={18} className="text-indigo-500" />
                    )}
                  </button>
                </div>
                
                <Button 
                  asChild 
                  variant="outline"
                  className="w-full rounded-lg border-fitpulse-purple/30 hover:border-fitpulse-purple hover:bg-fitpulse-purple/5"
                >
                  <Link
                    to="/member-login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fitpulse-purple">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Member Login
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  className="w-full rounded-lg bg-gradient-to-r from-fitpulse-purple to-fitpulse-deeper-purple"
                >
                  <Link
                    to="/owner-login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                      <path d="m15 10 2 2 4-4"></path>
                    </svg>
                    Owner Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
