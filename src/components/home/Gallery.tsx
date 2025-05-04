
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ZoomIn, Grid3X3 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";

// Enhanced with categories for filtering
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "People working out in a gym",
    category: "training"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
    alt: "Weight training equipment",
    category: "equipment"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Fitness class in session",
    category: "classes"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Modern gym interior",
    category: "facilities"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Person working out with a trainer",
    category: "training"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1521805103424-d8f8430e8933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Weights and exercise equipment",
    category: "equipment"
  },
];

const categories = [
  { value: "all", label: "All" },
  { value: "training", label: "Training" },
  { value: "equipment", label: "Equipment" },
  { value: "classes", label: "Classes" },
  { value: "facilities", label: "Facilities" },
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Filter images based on active category
  const filteredImages = activeFilter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);
  
  // Reset current index when filter changes to avoid out-of-bounds
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);
  
  // Mobile carousel controls
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  };
  
  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate in items sequentially
          const timer = setTimeout(() => {
            setVisibleItems(filteredImages.map((_, i) => i));
          }, 100);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [filteredImages]);
  
  // Reset visibility when filter changes
  useEffect(() => {
    setVisibleItems([]);
    // Stagger the appearance of items
    const timers = filteredImages.map((_, i) => 
      setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, 100 + (i * 100))
    );
    
    return () => timers.forEach(clearTimeout);
  }, [activeFilter, filteredImages]);

  return (
    <div 
      id="gallery" 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-indigo-50/30 to-white py-24 sm:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute opacity-10 -top-10 -right-20 w-72 h-72 bg-fitpulse-purple rounded-full blur-3xl"></div>
        <div className="absolute opacity-10 bottom-10 -left-20 w-72 h-72 bg-fitpulse-light-purple rounded-full blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div 
          className="mx-auto max-w-2xl text-center opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <h2 className="text-base font-semibold leading-7 text-fitpulse-purple">Gallery</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl relative inline-block">
            Experience our facilities
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-fitpulse-light-purple via-fitpulse-purple to-fitpulse-light-purple transform origin-left"></span>
          </p>
          <p 
            className="mt-6 text-lg leading-8 text-gray-600 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            Modern, Safe & Fully Equipped — Take a virtual tour of our premium gym and fitness facilities.
          </p>
        </div>
        
        {/* Category filters */}
        <div 
          className="mt-8 flex justify-center opacity-0 animate-fade-in"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Tabs 
            defaultValue="all" 
            value={activeFilter} 
            onValueChange={setActiveFilter}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-5 w-full bg-muted/50 backdrop-blur-sm">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.value} 
                  value={category.value}
                  className="data-[state=active]:bg-fitpulse-purple data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Mobile Carousel */}
        <div className="mt-16 block sm:hidden">
          <div className="relative">
            {filteredImages.length > 0 ? (
              <>
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <AspectRatio ratio={16/9} className="group">
                    <img
                      src={filteredImages[currentIndex].src}
                      alt={filteredImages[currentIndex].alt}
                      className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-medium">{filteredImages[currentIndex].alt}</p>
                    </div>
                  </AspectRatio>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {filteredImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        "h-2 w-2 rounded-full transition-all duration-300",
                        idx === currentIndex 
                          ? "bg-fitpulse-purple w-6" 
                          : "bg-gray-300 hover:bg-fitpulse-light-purple"
                      )}
                      aria-label={`Go to image ${idx + 1}`}
                    ></button>
                  ))}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all"
                    onClick={prevImage}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all"
                    onClick={nextImage}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="rounded-xl bg-muted/20 aspect-[16/9] flex items-center justify-center">
                <p className="text-muted-foreground">No images to display</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Desktop Grid */}
        <div className="mt-16 hidden sm:block">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((image, index) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div 
                    className={cn(
                      "group relative cursor-pointer opacity-0",
                      visibleItems.includes(index) && "animate-fade-in"
                    )}
                    style={{
                      animationDelay: `${0.1 * (index % 3)}s`,
                      animationFillMode: "forwards"
                    }}
                  >
                    <div className="overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white">
                      <AspectRatio ratio={16/9}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                          <p className="text-white font-medium">{image.alt}</p>
                          <div className="bg-white/80 backdrop-blur-sm rounded-full p-1">
                            <ZoomIn className="h-4 w-4 text-gray-800" />
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl">
                  <div className="relative aspect-video w-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-contain rounded-lg"
                    />
                  </div>
                  <p className="text-center font-medium mt-2">{image.alt}</p>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
        
        {/* Empty state for when no images match the filter */}
        {filteredImages.length === 0 && (
          <div className="mt-16 p-8 rounded-lg bg-muted/20 flex flex-col items-center justify-center">
            <Grid3X3 className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium">No images available</h3>
            <p className="text-muted-foreground text-center mt-2">
              There are no images in the {activeFilter} category.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setActiveFilter("all")} 
              className="mt-4"
            >
              View all images
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
