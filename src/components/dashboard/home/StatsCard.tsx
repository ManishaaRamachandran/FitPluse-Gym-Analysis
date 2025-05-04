
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
    label: string;
  };
  className?: string;
  gradientColors?: string;
  miniChart?: React.ReactNode;
  footer?: React.ReactNode;
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  className,
  gradientColors = 'from-fitpulse-purple/20 to-fitpulse-purple/5',
  miniChart,
  footer
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animationDuration = 1500; // 1.5 seconds

  useEffect(() => {
    // Animation function to count up the number
    const animateValue = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / animationDuration, 1);
      
      setDisplayValue(Math.floor(percentage * value));
      
      if (percentage < 1) {
        animationRef.current = requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(value); // Ensure we end on the exact value
      }
    };
    
    animationRef.current = requestAnimationFrame(animateValue);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value]);

  return (
    <Card 
      className={cn(
        "p-6 overflow-hidden relative group transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        className
      )}
    >
      {/* Gradient background */}
      <div className={cn(
        `absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-50 transition-opacity duration-300 group-hover:opacity-70`
      )} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{displayValue}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-fitpulse-purple/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>
        
        {trend && (
          <div className={cn(
            "mt-4 flex items-center text-sm",
            trend.isUp ? "text-green-500" : "text-red-500"
          )}>
            {trend.isUp ? 
              <ArrowUp className="mr-1 h-4 w-4" /> : 
              <ArrowDown className="mr-1 h-4 w-4" />
            }
            <span>{trend.value}% {trend.label}</span>
          </div>
        )}
        
        {miniChart && (
          <div className="mt-2">
            {miniChart}
          </div>
        )}
        
        {footer && (
          <div className="mt-4 text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </Card>
  );
}
