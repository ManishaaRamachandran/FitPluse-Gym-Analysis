
import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "medium", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-4xl"
  };

  const iconSizes = {
    small: 18,
    medium: 24,
    large: 36
  };

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="relative">
        <Dumbbell size={iconSizes[size]} className="text-fitpulse-purple" />
      </span>
      {showText && (
        <span className={`font-bold tracking-tight ${sizeClasses[size]}`}>
          <span className="text-fitpulse-purple">Fit</span>
          <span>Pulse</span>
        </span>
      )}
    </Link>
  );
}
