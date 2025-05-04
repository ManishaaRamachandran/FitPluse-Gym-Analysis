
import { Activity, BarChart, Calendar, Check, Clock, Dumbbell, List, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const features = [
  {
    name: 'Track Your Progress',
    description: 'Monitor your fitness journey with detailed metrics, visualizations, and goal tracking.',
    icon: BarChart,
  },
  {
    name: 'Easy Program Management',
    description: 'Create, edit, and assign fitness programs with our intuitive user interface.',
    icon: List,
  },
  {
    name: 'Personalized Fitness Plans',
    description: 'Get customized workout routines based on your goals, experience, and preferences.',
    icon: Dumbbell,
  },
  {
    name: 'Real-Time Attendance Tracking',
    description: 'Check in members and monitor gym usage patterns with our attendance system.',
    icon: Check,
  },
  {
    name: 'Billing & Payments Management',
    description: 'Handle membership fees, process payments, and manage billing cycles effortlessly.',
    icon: Activity,
  },
  {
    name: 'Notifications & Reminders',
    description: 'Stay connected with automatic alerts for workouts, payments, and important updates.',
    icon: Clock,
  },
];

export function Features() {
  // Ref for scroll animations
  const sectionRef = useRef<HTMLDivElement>(null);

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

    // Observe feature cards
    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    // Observe title
    if (sectionRef.current) {
      const titleElement = sectionRef.current.querySelector('.section-title');
      if (titleElement) {
        titleElement.classList.add('opacity-0');
        observer.observe(titleElement);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      id="features" 
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-fitpulse-purple">Powerful Features</h2>
          <p className="section-title mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-fitpulse-purple to-fitpulse-dark-purple pb-2">
            Everything you need to manage your fitness business
          </p>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-fitpulse-purple to-pink-400 rounded-full mb-6"></div>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            FitPulse Gym Hub provides powerful tools for both gym owners and members, 
            making fitness management easier than ever before.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => (
              <div 
                key={feature.name} 
                className={cn(
                  "feature-card relative p-8 rounded-2xl transition-all duration-300",
                  "bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl",
                  "border border-white/20 hover:border-white/40",
                  "hover:translate-y-[-5px] hover:bg-white/90"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <dt className="text-lg font-semibold leading-7 text-gray-900 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fitpulse-purple to-fitpulse-dark-purple shadow-md">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600 pl-16">{feature.description}</dd>
                <div className="absolute inset-0 border border-fitpulse-purple/10 rounded-2xl pointer-events-none"></div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
