
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserPlus, CreditCard, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'new-member' | 'payment' | 'class-booking' | 'other';
  description: string;
  time: string;
}

interface RecentActivityWidgetProps {
  className?: string;
}

export function RecentActivityWidget({ className }: RecentActivityWidgetProps) {
  // Sample data
  const activities: Activity[] = [
    {
      id: '1',
      type: 'new-member',
      description: 'Sarah Johnson joined as a Premium Member',
      time: '15 minutes ago'
    },
    {
      id: '2',
      type: 'payment',
      description: 'Michael Brown renewed their membership',
      time: '2 hours ago'
    },
    {
      id: '3',
      type: 'class-booking',
      description: '8 people booked for Yoga Class tomorrow',
      time: '3 hours ago'
    },
    {
      id: '4',
      type: 'new-member',
      description: 'David Wang joined as a Standard Member',
      time: '5 hours ago'
    },
    {
      id: '5',
      type: 'payment',
      description: 'Emily Chen purchased personal training sessions',
      time: 'Yesterday'
    }
  ];

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'new-member':
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-green-500" />;
      case 'class-booking':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="max-h-80 overflow-y-auto">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="mt-0.5">
                {getIcon(activity.type)}
              </div>
              <div>
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
