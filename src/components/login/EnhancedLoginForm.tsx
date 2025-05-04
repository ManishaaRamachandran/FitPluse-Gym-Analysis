
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Eye, EyeOff } from "lucide-react";

interface EnhancedLoginFormProps {
  type: "owner" | "member";
}

export function EnhancedLoginForm({ type }: EnhancedLoginFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    identifier: "", // email for owner, memberId for member
    password: "",
  });
  
  const [focused, setFocused] = useState({
    identifier: false,
    password: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: 'identifier' | 'password') => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: 'identifier' | 'password') => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check localStorage for registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Simulate authentication process
    setTimeout(() => {
      // Check for hardcoded credentials first
      if (type === "owner") {
        // Owner login validation with both original demo and new Manisha credentials
        if ((formData.identifier === "owner@demo.com" && formData.password === "password") || 
            (formData.identifier === "manisha@fitpulse.com" && formData.password === "password")) {
          loginSuccess();
          return;
        }
        
        // Check for registered owner accounts
        const foundUser = registeredUsers.find((user: any) => 
          user.type === 'owner' && user.email === formData.identifier && user.password === formData.password
        );
        
        if (foundUser) {
          loginSuccess();
        } else {
          loginFailed();
        }
      } else {
        // Member login validation with both original demo and new Dharaniya credentials
        if ((formData.identifier === "member123" && formData.password === "password") || 
            (formData.identifier === "dharaniya" && formData.password === "password")) {
          loginSuccess();
          return;
        }
        
        // Check for registered member accounts
        // Try with email or memberId (full name used as memberId for simplicity)
        const foundUser = registeredUsers.find((user: any) => 
          user.type === 'member' && 
          (user.email === formData.identifier || user.fullName === formData.identifier) && 
          user.password === formData.password
        );
        
        if (foundUser) {
          loginSuccess();
        } else {
          loginFailed();
        }
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  const loginSuccess = () => {
    toast({
      title: "Login successful",
      description: "Welcome back to FitPulse Gym Hub!",
    });
    navigate(type === "owner" ? "/owner-dashboard" : "/member-dashboard");
  };
  
  const loginFailed = () => {
    toast({
      title: "Login failed",
      description: type === "owner" ? "Invalid email or password." : "Invalid member ID or password.",
      variant: "destructive",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Member ID / Email field with floating label */}
      <div className="relative">
        <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 transition-colors duration-200 ${focused.identifier ? 'text-fitpulse-purple' : 'text-gray-500'}`}>
          <User className={`h-5 w-5 transition-transform duration-200 ${focused.identifier ? 'scale-110' : 'scale-100'}`} />
        </div>
        <input
          id="identifier"
          name="identifier"
          type={type === "owner" ? "email" : "text"}
          value={formData.identifier}
          onChange={handleChange}
          onFocus={() => handleFocus('identifier')}
          onBlur={() => handleBlur('identifier')}
          placeholder=" "
          required
          autoComplete={type === "owner" ? "email" : "username"}
          className="block w-full pl-10 pr-3 py-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitpulse-purple focus:border-transparent transition-all peer hover:border-fitpulse-purple/70"
        />
        <label 
          htmlFor="identifier" 
          className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-fitpulse-purple left-9"
        >
          {type === "owner" ? "Email Address" : "Member ID / Email"}
        </label>
      </div>
      
      {/* Password field with floating label */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <a href="#" className="text-sm font-medium text-fitpulse-purple hover:text-fitpulse-dark-purple transition-colors hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors duration-200 ${focused.password ? 'text-fitpulse-purple' : 'text-gray-500'}`}>
            <Lock className={`h-5 w-5 transition-transform duration-200 ${focused.password ? 'scale-110' : 'scale-100'}`} />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            placeholder=" "
            required
            autoComplete="current-password"
            className="block w-full pl-10 pr-10 py-3 text-base text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitpulse-purple focus:border-transparent transition-all peer hover:border-fitpulse-purple/70"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-fitpulse-purple transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          <label 
            htmlFor="password" 
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-fitpulse-purple left-9"
          >
            Password
          </label>
        </div>
      </div>
      
      {/* Enhanced Sign In Button with loading state */}
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-fitpulse-purple hover:bg-fitpulse-dark-purple hover:scale-[1.02] transition-all duration-200 text-white py-3 rounded-lg font-medium text-base"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}

