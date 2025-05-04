
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, User, Send, Copy, Check, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Refs for the input fields
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    
    toast({
      title: "Copied to clipboard!",
      description: `${text} has been copied to your clipboard.`,
    });
    
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <div 
      id="contact" 
      className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div 
          className="mx-auto max-w-2xl text-center animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-base font-semibold leading-7 text-fitpulse-purple">Contact Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl bg-clip-text relative">
            <span className="relative z-10">
              Get in touch with our team
              <span className="absolute bottom-0 left-1/4 right-1/4 h-3 bg-gradient-to-r from-fitpulse-light-purple/0 via-fitpulse-purple/20 to-fitpulse-light-purple/0 -z-10 transform -translate-y-2"></span>
            </span>
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Have questions about our services or need assistance? We're here to help!
          </p>
        </div>
        
        <div 
          className="mx-auto mt-16 max-w-5xl grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2"
          style={{ perspective: "1000px" }}
        >
          <Card 
            className="animate-fade-in-up overflow-hidden shadow-lg border-0"
            style={{ 
              animationDelay: "0.2s",
              background: "linear-gradient(to bottom right, #ffffff, #f8f9ff)",
              borderRadius: "1.5rem",
              transform: "rotateY(0deg)",
              transition: "transform 0.5s ease" 
            }}
          >
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <div className="flex items-center space-x-2 absolute left-3 top-3 text-gray-400">
                    <User size={18} className="opacity-70" />
                  </div>
                  <Label 
                    htmlFor="name" 
                    className={cn(
                      "absolute left-10 transition-all duration-200 text-gray-500",
                      formData.name ? "text-xs -top-2 bg-white px-1" : "top-3"
                    )}
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    ref={nameInputRef}
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => nameInputRef.current?.parentElement?.classList.add("focused")}
                    onBlur={() => nameInputRef.current?.parentElement?.classList.remove("focused")}
                    className="pl-12 pt-4 pb-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-fitpulse-purple transition-all duration-200 shadow-sm"
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="flex items-center space-x-2 absolute left-3 top-3 text-gray-400">
                    <Mail size={18} className="opacity-70" />
                  </div>
                  <Label 
                    htmlFor="email" 
                    className={cn(
                      "absolute left-10 transition-all duration-200 text-gray-500",
                      formData.email ? "text-xs -top-2 bg-white px-1" : "top-3"
                    )}
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    ref={emailInputRef}
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => emailInputRef.current?.parentElement?.classList.add("focused")}
                    onBlur={() => emailInputRef.current?.parentElement?.classList.remove("focused")}
                    className="pl-12 pt-4 pb-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-fitpulse-purple transition-all duration-200 shadow-sm"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Label 
                    htmlFor="message" 
                    className={cn(
                      "absolute left-3 transition-all duration-200 text-gray-500",
                      formData.message ? "text-xs -top-2 bg-white px-1" : "top-3"
                    )}
                  >
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    ref={messageInputRef}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => messageInputRef.current?.parentElement?.classList.add("focused")}
                    onBlur={() => messageInputRef.current?.parentElement?.classList.remove("focused")}
                    rows={5}
                    className="pt-6 pb-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-fitpulse-purple transition-all duration-200 shadow-sm resize-none"
                    required
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-fitpulse-purple to-fitpulse-deeper-purple hover:from-fitpulse-deeper-purple hover:to-fitpulse-purple text-white py-6 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div 
            className="space-y-10 lg:pl-8 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">Get in Touch</h3>
              <p className="mt-3 text-base text-gray-500">
                Have questions or need assistance? Our team is ready to help you with any inquiries regarding our gym services or the FitPulse platform.
              </p>
              
              <div className="mt-8 space-y-6">
                <button 
                  onClick={() => copyToClipboard("+91 98765 43210", "phone")} 
                  className="flex items-start gap-x-4 group w-full text-left"
                >
                  <div className="flex-shrink-0 p-3 rounded-full bg-fitpulse-light-purple/20 group-hover:bg-fitpulse-light-purple/30 transition-colors duration-200">
                    <Phone className="h-6 w-6 text-fitpulse-purple animate-[pulse_3s_ease-in-out_infinite]" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-fitpulse-purple transition-colors">Phone</h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center">
                      +91 98765 43210
                      {copiedField === "phone" ? (
                        <Check size={16} className="ml-2 text-green-500" />
                      ) : (
                        <Copy size={14} className="ml-2 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </p>
                  </div>
                </button>
                
                <button 
                  onClick={() => copyToClipboard("contact@fitpulsegym.in", "email")} 
                  className="flex items-start gap-x-4 group w-full text-left"
                >
                  <div className="flex-shrink-0 p-3 rounded-full bg-fitpulse-light-purple/20 group-hover:bg-fitpulse-light-purple/30 transition-colors duration-200">
                    <Mail className="h-6 w-6 text-fitpulse-purple animate-[pulse_4s_ease-in-out_infinite]" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-fitpulse-purple transition-colors">Email</h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center">
                      contact@fitpulsegym.in
                      {copiedField === "email" ? (
                        <Check size={16} className="ml-2 text-green-500" />
                      ) : (
                        <Copy size={14} className="ml-2 opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </p>
                  </div>
                </button>
                
                <div className="flex items-start gap-x-4">
                  <div className="flex-shrink-0 p-3 rounded-full bg-fitpulse-light-purple/20">
                    <MapPin className="h-6 w-6 text-fitpulse-purple animate-[pulse_5s_ease-in-out_infinite]" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Location 🇮🇳</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      123 Fitness Avenue<br />
                      Chennai, Tamil Nadu 600001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90089925053!2d80.0883449684176!3d13.047525287232781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sin!4v1650458345811!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FitPulse Chennai Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* Replace the invalid JSX style tag with global CSS classes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .focused label {
            font-size: 0.75rem;
            top: -0.5rem;
            background: white;
            padding: 0 0.25rem;
            color: #8B5CF6;
          }
        `
      }} />
    </div>
  );
}
