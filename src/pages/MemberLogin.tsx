
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { EnhancedLoginForm } from "@/components/login/EnhancedLoginForm";
import { Home } from "lucide-react";

const MemberLogin = () => {
  const [fadeIn, setFadeIn] = useState(false);

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
              "url('https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
          }}
        >
          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-fitpulse-dark-bg/90 to-fitpulse-dark-bg/70 backdrop-blur-sm"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Logo size="large" className="z-10" />
          <div className="z-10">
            <h2 className="text-3xl font-bold mb-4">Track your fitness journey</h2>
            <p className="text-lg text-white/90">
              FitPulse helps you track workouts, monitor progress, and achieve your fitness goals.
            </p>
            <div className="mt-4 p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <p className="text-white/90">
                <strong>New!</strong> You can now log in using your email or member name after signing up.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex items-center justify-center p-8 bg-gradient-to-br from-white to-soft-blue/30 animate-fade-in">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="lg:hidden mb-8">
            <Logo size="large" />
          </div>
          
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Member Login</h1>
            <p className="text-gray-500">
              Sign in to access your fitness dashboard
            </p>
            <p className="text-sm text-fitpulse-purple">
              You can use either your email or full name to log in.
            </p>
          </div>
          
          <EnhancedLoginForm type="member" />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            Are you an owner?{" "}
            <Link to="/owner-login" className="text-fitpulse-purple hover:text-fitpulse-dark-purple font-semibold transition-colors">
              Go to owner login
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-gray-500 mb-3">New here?</p>
            <Link 
              to="/sign-up" 
              className="block w-full text-center py-2 px-4 bg-gradient-to-r from-fitpulse-light-purple/90 to-fitpulse-purple/90 text-white rounded-lg hover:from-fitpulse-light-purple hover:to-fitpulse-purple transition-all duration-300 hover:scale-[1.02] shadow-sm"
            >
              Create your account
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

export default MemberLogin;
