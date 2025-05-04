
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface GrowthChartWidgetProps {
  className?: string;
}

// Sample data with proper month sorting
export function GrowthChartWidget({ className }: GrowthChartWidgetProps) {
  // Data with consistent chronological order
  const data = [
    { month: 'Jan', monthIndex: 0, members: 70, growthPercent: null },
    { month: 'Feb', monthIndex: 1, members: 90, growthPercent: 28.6 },
    { month: 'Mar', monthIndex: 2, members: 105, growthPercent: 16.7 },
    { month: 'Apr', monthIndex: 3, members: 115, growthPercent: 9.5 },
    { month: 'May', monthIndex: 4, members: 128, growthPercent: 11.3 },
    { month: 'Jun', monthIndex: 5, members: 140, growthPercent: 9.4 }
  ];
  
  const chartConfig = {
    members: {
      label: "Members",
      color: "#8B5CF6",
      icon: TrendingUp
    }
  };

  // Calculate min and max for Y axis
  const minValue = 35; 
  const maxValue = 140;
  
  return (
    <Card className={cn("h-full overflow-visible", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Membership Growth</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="w-full h-[300px] sm:h-[320px] md:h-[340px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <LineChart 
              data={data} 
              margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="membersGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9b87f5" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#7E69AB" />
                </linearGradient>
                
                <linearGradient id="membersArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.2)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.02)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" opacity={0.4} vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                dy={10}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(value) => `${value}`}
                domain={[minValue, maxValue]}
                dx={-5}
                padding={{ top: 10, bottom: 10 }}
              />
              <ChartTooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const members = payload[0].value;
                    const growthPercent = payload[0].payload.growthPercent;
                    
                    return (
                      <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-sm shadow-xl">
                        <div className="font-medium">{label}</div>
                        <div className="mt-1 font-semibold">{members} members</div>
                        {growthPercent !== null && (
                          <div className={cn(
                            "text-xs flex items-center gap-1 mt-1",
                            growthPercent > 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {growthPercent > 0 ? "+" : ""}{growthPercent}% from previous
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="members"
                stroke="none"
                fill="url(#membersArea)"
                fillOpacity={0.8}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Line 
                type="monotone" 
                dataKey="members" 
                stroke="url(#membersGradient)" 
                strokeWidth={2.5}
                dot={{ 
                  stroke: '#8B5CF6', 
                  strokeWidth: 2, 
                  r: 5, 
                  fill: '#fff',
                  filter: 'drop-shadow(0px 2px 3px rgba(139, 92, 246, 0.4))' 
                }}
                activeDot={{ 
                  r: 7, 
                  fill: '#8B5CF6',
                  stroke: '#fff',
                  strokeWidth: 2,
                  filter: 'drop-shadow(0px 2px 5px rgba(139, 92, 246, 0.6))'
                }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
