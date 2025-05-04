
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SignUpForm } from "@/components/login/SignUpForm";
import { Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle successful registration
  const handleSuccessfulRegistration = (data: any) => {
    toast({
      title: "Registration successful!",
      description: "Your account has been created. You can now log in.",
    });
    
    // Navigate to the login page after a short delay
    setTimeout(() => {
      navigate("/member-login");
    }, 2000);
  };

  // Trigger fade-in animation on component mount
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`min-h-screen grid lg:grid-cols-2 ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      {/* Left side - Image with gradient overlay */}
      <div className="hidden lg:block relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80')",
          }}
        >
          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-fitpulse-dark-bg/90 to-fitpulse-dark-bg/70 backdrop-blur-sm"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Logo size="large" className="z-10" />
          <div className="z-10">
            <h2 className="text-3xl font-bold mb-4">Start your fitness journey today</h2>
            <p className="text-lg text-white/90">
              Join thousands of members who have transformed their lives with FitPulse.
            </p>
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <p className="italic text-white/90">
                "FitPulse has completely transformed my approach to fitness. The personalized workouts and progress tracking keep me motivated every day!"
              </p>
              <p className="mt-2 font-semibold">— Sarah M., Member since 2022</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign-up form */}
      <div className="flex items-center justify-center p-6 bg-gradient-to-br from-white to-soft-blue/30 overflow-y-auto max-h-screen">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 my-6">
          <div className="lg:hidden mb-6">
            <Logo size="large" />
          </div>
          
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500">
              Join FitPulse to start tracking your fitness journey
            </p>
          </div>
          
          <SignUpForm onSuccess={handleSuccessfulRegistration} />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/member-login" className="text-fitpulse-purple hover:text-fitpulse-dark-purple font-semibold transition-colors">
              Sign in here
            </Link>
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-gray-500 hover:text-fitpulse-purple transition-colors"
            >
              <Home size={16} className="mr-1" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
