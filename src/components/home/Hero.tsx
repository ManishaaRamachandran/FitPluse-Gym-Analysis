
import { ArrowRight, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-br from-fitpulse-light-purple via-white to-soft-blue overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-gradient-to-r from-purple-300/40 to-pink-300/40 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 left-[15%] w-72 h-72 bg-gradient-to-r from-blue-300/30 to-teal-300/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-32 left-[35%] w-72 h-72 bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#8B5CF6" fillOpacity="0.1" d="M0,224L48,224C96,224,192,224,288,224C384,224,480,224,576,208C672,192,768,160,864,165.3C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="animate-fade-in-up">
            <h1 className="font-display mt-10 text-4xl font-bold tracking-tight text-fitpulse-dark-bg sm:text-6xl drop-shadow-sm">
              Transform Your<br />Fitness Journey
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 font-sans">
              The all-in-one platform for gym owners and members to manage memberships, 
              track progress, and achieve fitness goals.
            </p>
            
            {/* Social proof */}
            <div className="mt-4 flex items-center text-sm text-gray-600 animate-fade-in animation-delay-500">
              <Users size={16} className="mr-2 text-fitpulse-purple" />
              <span>Trusted by 5,000+ fitness enthusiasts</span>
              <div className="ml-4 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={14} 
                    className="text-amber-400 fill-amber-400" 
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-10 flex items-center gap-x-6">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-fitpulse-purple to-pink-500 hover:from-fitpulse-purple/90 hover:to-pink-500/90 hover:scale-105 shadow-lg shadow-fitpulse-purple/20 transition-all duration-300 px-6"
              >
                <Link to="/member-login" className="flex items-center">
                  Join Now <ArrowRight className="ml-2 h-4 w-4 animate-bounce-x" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-fitpulse-dark-bg border-fitpulse-dark-bg/20 bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:scale-105 transition-all duration-300"
              >
                <Link to="/owner-login">
                  Owner Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow animate-fade-in animation-delay-700">
          <div className="relative animate-float">
            <div className="mx-auto w-[250px] max-w-full lg:w-[350px] overflow-hidden rounded-2xl bg-white/70 shadow-[0_8px_32px_rgba(139,92,246,0.15)] backdrop-blur-lg border border-white/60 relative hover:shadow-[0_12px_36px_rgba(139,92,246,0.25)] transition-all duration-300">
              <div className="relative p-8 space-y-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-fitpulse-purple to-pink-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M6.382 3.936A3 3 0 0 1 10.32 1H12a3 3 0 0 1 3 3v5"></path>
                      <path d="M6.8 23H5.2a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2h1.6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2"></path>
                      <path d="M18.8 23h-1.6a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2h1.6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2"></path>
                      <path d="M2 13h5"></path>
                      <path d="M17 13h5"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-fitpulse-dark-bg mb-0 font-display">Try FitPulse</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Kickstart your fitness journey today!
                    </p>
                  </div>
                </div>

                {/* Feature points */}
                <div className="space-y-3 mt-4">
                  {[
                    "7-day free trial",
                    "No credit card required",
                    "Full access to all features"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
                
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-fitpulse-purple to-pink-500 hover:from-fitpulse-purple/90 hover:to-pink-500/90 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all duration-300"
                >
                  <Link to="/member-login" className="flex items-center justify-center">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
