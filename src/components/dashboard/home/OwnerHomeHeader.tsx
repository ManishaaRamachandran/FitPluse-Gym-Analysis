
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface OwnerHomeHeaderProps {
  className?: string;
}

export function OwnerHomeHeader({ className }: OwnerHomeHeaderProps) {
  const randomQuote = () => {
    const quotes = [
      "Stronger every day – together!",
      "Building healthier communities one member at a time.",
      "Success happens one rep at a time.",
      "Your gym, your community, your success story.",
      "Help your members achieve what they thought was impossible."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className={`relative overflow-hidden rounded-xl mb-8 ${className}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
          backgroundPosition: 'center'
        }}
      />
      <div className="relative z-10 px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Home</h1>
            <p className="text-muted-foreground">Welcome back to your gym management portal.</p>
            <p className="text-fitpulse-purple font-medium mt-2 italic">"{randomQuote()}"</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-fitpulse-purple hover:bg-fitpulse-dark-purple transition-all duration-300 hover:shadow-lg"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Member
          </Button>
        </div>
      </div>
    </div>
  );
}
