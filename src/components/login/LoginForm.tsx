
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  type: "owner" | "member";
}

export function LoginForm({ type }: LoginFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    identifier: "", // email for owner, memberId for member
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        // Owner login validation with hardcoded credentials
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
        // Member login validation with hardcoded credentials
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="identifier" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {type === "owner" ? "Email Address" : "Member ID / Email"}
        </label>
        <Input
          id="identifier"
          name="identifier"
          type={type === "owner" ? "email" : "text"}
          value={formData.identifier}
          onChange={handleChange}
          placeholder={type === "owner" ? "Enter your email" : "Enter member ID or email"}
          required
          autoComplete={type === "owner" ? "email" : "username"}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Password
          </label>
          <a href="#" className="text-sm text-fitpulse-purple hover:text-fitpulse-dark-purple">
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          autoComplete="current-password"
          className="w-full"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-fitpulse-purple hover:bg-fitpulse-dark-purple"
      >
        {isLoading ? "Logging in..." : "Sign in"}
      </Button>
    </form>
  );
}
