
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { Gallery } from "@/components/home/Gallery";
import { Contact } from "@/components/home/Contact";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const Index = () => {
  // Check for saved theme preference or respect OS settings
  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      ((!localStorage.getItem("theme")) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Add Inter font if not already loaded
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(linkElement);
  }, []);

  return (
    <div className="bg-white dark:bg-fitpulse-dark-bg">
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Features />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
