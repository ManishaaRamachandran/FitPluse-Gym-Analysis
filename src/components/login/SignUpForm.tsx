import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Phone, Lock, Eye, EyeOff, Target } from "lucide-react";

// Define the base schema without the refinement
const baseSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  fitnessGoal: z.string().min(1, "Please select your fitness goal"),
});

// Add the refinement to create the final schema
const formSchema = baseSchema.refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

// Define the correct type for the form data
type FormData = z.infer<typeof formSchema>;

interface SignUpFormProps {
  onSuccess?: (data: FormData) => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const [focused, setFocused] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
  });
  
  // Initialize the form with react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      fitnessGoal: "",
    },
  });
  
  const handleFocus = (field: keyof typeof focused) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof typeof focused) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };
  
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
    return strength;
  };
  
  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    
    // Get existing registered users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if email is already registered
    const isEmailRegistered = existingUsers.some((user: any) => user.email === data.email);
    
    if (isEmailRegistered) {
      toast({
        title: "Registration failed",
        description: "This email is already registered. Please try another one.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Create new user object
    const newUser = {
      ...data,
      type: 'member', // Assuming all signups are for members
      registeredAt: new Date().toISOString(),
    };
    
    // Add to registered users
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    
    // Show success message
    toast({
      title: "Registration successful!",
      description: "Your account has been created. You can now log in using your email and password.",
    });
    
    if (onSuccess) {
      onSuccess(data);
    }
    
    setIsLoading(false);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors duration-200 ${focused.fullName ? 'text-fitpulse-purple' : 'text-gray-500'}`}>
                  <User className="h-5 w-5" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    className="pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-fitpulse-purple focus:border-transparent transition-all peer hover:border-fitpulse-purple/70"
                    placeholder=" "
                    onFocus={() => handleFocus('fullName')}
                    onBlur={() => handleBlur('fullName')}
                  />
                </FormControl>
                <FormLabel className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-fitpulse-purple left-9">
                  Full Name
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors duration-200 ${focused.email ? 'text-fitpulse-purple' : 'text-gray-500'}`}>
                  <Mail className="h-5 w-5" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-fitpulse-purple focus:border-transparent transition-all peer hover:border-fitpulse-purple/70"
                    placeholder=" "
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                  />
                </FormControl>
                <FormLabel className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-fitpulse-purple left-9">
                  Email Address
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors duration-200 ${focused.phoneNumber ? 'text-fitpulse-purple' : 'text-gray-500'}`}>
                  <Phone className="h-5 w-5" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    className="pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-fitpulse-purple focus:border-transparent transition-all peer hover:border-fitpulse-purple/70"
                    placeholder=" "
                    onFocus={() => handleFocus('phoneNumber')}
                    onBlur={() => handleBlur('phoneNumber')}
                  />
                </FormControl>
                <FormLabel className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-fitpulse-purple left-9">
                  Phone Number
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors duration-200 ${focused.password ? 'text-fitpulse-purple' : 'text-gray-500'}`}>
                  <Lock className="h-5 w-5" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-fitpulse-purple focus:border-transparent transition-all peer hover:border-fitpulse-purple/70"
                    placeholder=" "
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    onChange={(e) => {
                      field.onChange(e);
                      calculatePasswordStrength(e.target.value);
                    }}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-fitpulse-purple transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <FormLabel className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-fitpulse-purple left-9">
                  Password
                </FormLabel>
              </div>
              
              {/* Password strength indicator */}
              {field.value && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full flex-1 ${
                          i < passwordStrength 
                            ? passwordStrength <= 2 
                              ? 'bg-orange-500' 
                              : passwordStrength <= 3 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${
                    passwordStrength <= 2 
                      ? 'text-orange-500' 
                      : passwordStrength <= 3 
                        ? 'text-yellow-500' 
                        : 'text-green-500'
                  }`}>
                    {passwordStrength <= 2 
                      ? 'Weak' 
                      : passwordStrength <= 3 
                        ? 'Good' 
                        : 'Strong'} password
                  </p>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors duration-200 ${focused.confirmPassword ? 'text-fitpulse-purple' : 'text-gray-500'}`}>
                  <Lock className="h-5 w-5" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    className="pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-fitpulse-purple focus:border-transparent transition-all peer hover:border-fitpulse-purple/70"
                    placeholder=" "
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={() => handleBlur('confirmPassword')}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-fitpulse-purple transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <FormLabel className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-fitpulse-purple left-9">
                  Confirm Password
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="fitnessGoal"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <Target className="h-5 w-5" />
                </div>
                <FormLabel className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-9">
                  Fitness Goal
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10 bg-white border rounded-lg focus:ring-2 focus:ring-fitpulse-purple focus:border-transparent transition-all hover:border-fitpulse-purple/70">
                      <SelectValue placeholder="Select your fitness goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weightLoss">Weight Loss</SelectItem>
                    <SelectItem value="muscleGain">Muscle Gain</SelectItem>
                    <SelectItem value="generalFitness">General Fitness</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                    <SelectItem value="athleticPerformance">Athletic Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-fitpulse-light-purple to-fitpulse-purple hover:from-fitpulse-purple hover:to-fitpulse-dark-purple hover:scale-[1.02] transition-all duration-200 text-white py-3 rounded-lg font-medium text-base"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
