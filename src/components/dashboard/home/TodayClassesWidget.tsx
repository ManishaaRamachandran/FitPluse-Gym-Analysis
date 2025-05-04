
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClassSession {
  id: string;
  name: string;
  time: string;
  trainer: string;
  participants: number;
  maxParticipants: number;
}

interface TodayClassesWidgetProps {
  className?: string;
}

export function TodayClassesWidget({ className }: TodayClassesWidgetProps) {
  // Sample data for today's classes
  const todayClasses: ClassSession[] = [
    {
      id: '1',
      name: 'Morning Yoga Flow',
      time: '07:00 - 08:00',
      trainer: 'Sarah Lee',
      participants: 12,
      maxParticipants: 20
    },
    {
      id: '2',
      name: 'HIIT Challenge',
      time: '10:30 - 11:30',
      trainer: 'Mike Johnson',
      participants: 15,
      maxParticipants: 15
    },
    {
      id: '3',
      name: 'Power Lifting',
      time: '17:00 - 18:30',
      trainer: 'Chris Davis',
      participants: 8,
      maxParticipants: 10
    },
    {
      id: '4',
      name: 'Spin Class',
      time: '19:00 - 20:00',
      trainer: 'Lisa Wong',
      participants: 18,
      maxParticipants: 20
    }
  ];

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-fitpulse-purple" />
          Today's Classes
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-80 overflow-y-auto">
        <div className="space-y-4">
          {todayClasses.map((classItem) => (
            <div 
              key={classItem.id} 
              className="p-3 rounded-md border border-gray-200 hover:border-fitpulse-purple/50 hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">{classItem.name}</h4>
                  <p className="text-xs text-gray-500">Trainer: {classItem.trainer}</p>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {classItem.time}
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs">
                  <span>{classItem.participants}/{classItem.maxParticipants} participants</span>
                  {classItem.participants >= classItem.maxParticipants && (
                    <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">Full</span>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="text-xs hover:text-fitpulse-purple">
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4 border-t">
        <Button variant="outline" size="sm" className="w-full hover:border-fitpulse-purple hover:text-fitpulse-purple">
          View Full Schedule
        </Button>
      </CardFooter>
    </Card>
  );
}
