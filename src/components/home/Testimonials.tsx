
import { Star, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const testimonials = [
  {
    id: 1,
    content: "FitPulse has completely transformed my gym management. Before, I was juggling spreadsheets and paper forms. Now everything is automated and accessible in one place.",
    author: "Michael Thomas",
    role: "Gym Owner",
    rating: 5,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 2,
    content: "As a fitness trainer, I needed a platform to track client progress. FitPulse makes it easy to assign workouts and monitor results. My clients love the mobile access too!",
    author: "Sarah Johnson",
    role: "Personal Trainer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 3,
    content: "Being able to check in with my phone and access my workout plans anytime has made my fitness routine so much more consistent. I've achieved more in 3 months than the past 2 years!",
    author: "David Rodriguez",
    role: "Gym Member",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    id: 4,
    content: "The payment tracking feature alone is worth it. No more chasing members for dues or manually updating spreadsheets. FitPulse has saved me hours every week.",
    author: "Jennifer Lee",
    role: "Fitness Center Manager",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
];

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  // Auto play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextTestimonial();
      }, 4000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const titleElement = sectionRef.current.querySelector('.testimonial-title');
      const cardElement = sectionRef.current.querySelector('.testimonial-card');
      
      if (titleElement) {
        titleElement.classList.add('opacity-0');
        observer.observe(titleElement);
      }
      
      if (cardElement) {
        cardElement.classList.add('opacity-0');
        observer.observe(cardElement);
      }
    }

    return () => observer.disconnect();
  }, []);

  const testimonial = testimonials[currentTestimonial];

  return (
    <div 
      id="testimonials" 
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #E5DEFF 0%, #fff 100%)",
        backgroundSize: "cover"
      }}
    >
      {/* Abstract shape decoration */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-fitpulse-light-purple/30 to-transparent rounded-full blur-3xl -z-10"
        style={{ transform: "translate(30%, -30%)" }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-fitpulse-light-purple/20 to-transparent rounded-full blur-3xl -z-10"
        style={{ transform: "translate(-30%, 30%)" }}
      />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-fitpulse-purple">Testimonials</h2>
          <p className="testimonial-title mt-2 text-3xl font-bold tracking-tight sm:text-4xl transition-all duration-500 bg-gradient-to-r from-fitpulse-purple to-fitpulse-dark-purple bg-clip-text text-transparent">
            What our users are saying
          </p>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-fitpulse-purple to-pink-500 rounded-full mt-4"></div>
        </div>
        
        <div 
          className="testimonial-card mx-auto max-w-4xl transition-all duration-500"
          style={{ transitionDelay: "200ms" }}
        >
          <div 
            className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_15px_35px_rgb(139,92,246,0.1)] border border-white"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
          >
            {/* Accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-fitpulse-purple to-pink-500 rounded-full" />
            
            <div className="flex items-start gap-6 mb-8 relative pl-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-fitpulse-purple/30 to-pink-500/30 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-70"></div>
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="relative h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-display text-xl font-bold text-gray-900">{testimonial.author}</div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{testimonial.role}</span>
                  <Badge 
                    variant="outline" 
                    className="border-fitpulse-purple/30 bg-fitpulse-purple/5 text-fitpulse-purple text-xs"
                  >
                    <Dumbbell className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
              <div className="ml-auto flex group perspective-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      i === 0 && "animate-fade-in",
                      i === 1 && "animate-fade-in delay-100",
                      i === 2 && "animate-fade-in delay-200",
                      i === 3 && "animate-fade-in delay-300",
                      i === 4 && "animate-fade-in delay-400",
                      i < testimonial.rating 
                        ? "text-yellow-400 fill-yellow-400 group-hover:rotate-[10deg]" 
                        : "text-gray-300"
                    )}
                    style={{
                      transitionDelay: `${i * 50}ms`
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative pl-6">
              <Quote className="absolute top-0 left-0 h-6 w-6 text-fitpulse-purple/20 rotate-180" />
              <blockquote className="text-lg font-medium text-gray-800 mb-8 relative">
                <span className="relative z-10">{testimonial.content}</span>
                <Quote className="absolute bottom-0 right-0 h-6 w-6 text-fitpulse-purple/20" />
              </blockquote>
            </div>
            
            <div className="flex justify-between items-center pl-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === currentTestimonial 
                        ? "w-10 bg-gradient-to-r from-fitpulse-purple to-pink-500" 
                        : "w-6 bg-gray-200 hover:bg-gray-300 hover:w-8"
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  ></button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={prevTestimonial}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-fitpulse-purple/20 hover:border-fitpulse-purple hover:bg-fitpulse-purple/5 transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={nextTestimonial}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-fitpulse-purple/20 hover:border-fitpulse-purple hover:bg-fitpulse-purple/5 transition-all duration-300"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import missing icons
import { ArrowLeft, ArrowRight, Dumbbell } from "lucide-react";
