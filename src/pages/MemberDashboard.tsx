import { Routes, Route, Navigate, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Calendar, 
  CheckCheck, 
  User, 
  BarChart2, 
  CreditCard, 
  Bell, 
  Lock, 
  Target, 
  History, 
  FileText, 
  List 
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const MemberHome = () => {
  return (
    <div className="space-y-8">
      <div className="relative mb-6 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-fitpulse-purple/80 to-fitpulse-dark-purple/90 mix-blend-multiply" />
        <div className="hero-gradient rounded-lg p-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Member Dashboard</h1>
          <p className="text-white/90 italic">
            "Consistency is stronger than perfection. Keep going!"
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="p-6 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Attendance This Month</h3>
                <Activity className="h-5 w-5 text-fitpulse-purple animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                      strokeDasharray="85, 100"
                      className="animate-[progress_1s_ease-out]"
                    />
                    <text
                      x="18"
                      y="19"
                      className="text-[10px] font-bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="currentColor"
                    >
                      85%
                    </text>
                  </svg>
                </div>
              </div>
              <div className="text-sm text-center text-muted-foreground mt-4">17 of 20 sessions attended</div>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <p>Great job! You've attended 17 out of 20 classes this month! 🎉</p>
          </TooltipContent>
        </Tooltip>
        
        <Card className="p-6 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Enrolled Programs</h3>
            <List className="h-5 w-5 text-fitpulse-purple" />
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Weight Training", desc: "Build strength with professional guidance" },
                { name: "Yoga", desc: "Improve flexibility and mindfulness" },
                { name: "HIIT", desc: "High-intensity interval training for maximum results" }
              ].map((program) => (
                <HoverCard key={program.name}>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full">
                      {program.name}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{program.name}</h4>
                      <p className="text-sm text-muted-foreground">{program.desc}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
            <Button size="sm" variant="outline" className="w-full" asChild>
              <Link to="/member-dashboard/programs">View All Programs</Link>
            </Button>
          </div>
        </Card>
        
        <Card className="p-6 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Payment Status</h3>
            <CreditCard className="h-5 w-5 text-fitpulse-purple" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge 
                variant="default" 
                className="bg-green-500 text-white relative animate-pulse"
              >
                Paid
              </Badge>
              <span className="font-medium">Premium Plan</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next payment: May 15, 2025</span>
            </div>
            <Button size="sm" variant="outline" className="w-full" asChild>
              <Link to="/member-dashboard/settings/billing">View Details</Link>
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Your Achievements</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Workout Warrior", desc: "5 classes streak achieved!", icon: "🏆" },
            { title: "Century Club", desc: "Completed 100 sessions this year!", icon: "💪" },
            { title: "Early Bird", desc: "Attended 10 morning classes", icon: "🌅" },
            { title: "Perfect Form", desc: "Received 5 trainer compliments", icon: "⭐" }
          ].map((achievement) => (
            <div 
              key={achievement.title}
              className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 border transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-fitpulse-purple/5 to-transparent border-l-4 border-fitpulse-purple">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-fitpulse-purple/10">
            <Activity className="h-5 w-5 text-fitpulse-purple" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Tip of the Day</h4>
            <p className="text-muted-foreground">
              Stay hydrated — drink at least 2L of water daily! 💧
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const OverviewPage = () => {
  const attendanceData = [
    { name: 'Jan', attendance: 75 },
    { name: 'Feb', attendance: 68 },
    { name: 'Mar', attendance: 82 },
    { name: 'Apr', attendance: 85 },
    { name: 'May', attendance: 92 },
    { name: 'Jun', attendance: 88 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Track your progress and upcoming activities</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Attendance Graph</h3>
            <BarChart2 className="h-5 w-5 text-fitpulse-purple" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Payment Information</h3>
            <FileText className="h-5 w-5 text-fitpulse-purple" />
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Last Payment</div>
              <div className="font-medium">$59.99 - Apr 15, 2025</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Plan</div>
              <div className="font-medium">Premium Membership</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Payment Method</div>
              <div className="font-medium">Visa ending in 4242</div>
            </div>
            <Button size="sm" className="w-full mt-2">View Payment History</Button>
          </div>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Upcoming Workouts</h3>
            <Calendar className="h-5 w-5 text-fitpulse-purple" />
          </div>
          <div className="space-y-4">
            {[
              { day: "Monday", time: "7:00 AM", class: "Morning Yoga" },
              { day: "Wednesday", time: "5:30 PM", class: "Weight Training" },
              { day: "Friday", time: "6:00 PM", class: "HIIT Challenge" }
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <div className="font-medium">{session.class}</div>
                  <div className="text-sm text-gray-500">{session.day}, {session.time}</div>
                </div>
                <Button size="sm" variant="outline">Add to Calendar</Button>
              </div>
            ))}
            <Button className="w-full" variant="outline" asChild>
              <a href="/member-dashboard/schedule">View Full Schedule</a>
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Program Progress</h3>
            <Activity className="h-5 w-5 text-fitpulse-purple" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Weight Training</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Yoga Fundamentals</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">HIIT Challenge</span>
                <span className="text-sm font-medium">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            <Button className="w-full" asChild>
              <a href="/member-dashboard/programs">View All Programs</a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const MyProgramsPage = () => {
  const programs = [
    { 
      id: 1, 
      name: "Weight Training", 
      description: "Progressive strength training program", 
      duration: "12 weeks", 
      progress: 75 
    },
    { 
      id: 2, 
      name: "Yoga Fundamentals", 
      description: "Learn yoga basics and improve flexibility", 
      duration: "8 weeks", 
      progress: 40 
    },
    { 
      id: 3, 
      name: "HIIT Challenge", 
      description: "High-intensity interval training for fat loss", 
      duration: "6 weeks", 
      progress: 90 
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Programs</h1>
        <p className="text-muted-foreground">View and track your enrolled fitness programs</p>
      </div>
      
      <div className="grid gap-6">
        {programs.map(program => (
          <Card key={program.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{program.name}</h3>
                <p className="text-muted-foreground">{program.description}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{program.duration}</Badge>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Progress:</span>
                    <span className="text-sm font-medium">{program.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64">
                <Progress value={program.progress} className="h-2 mb-2" />
                <Button className="w-full">View Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SchedulePage = () => {
  const schedule = [
    { id: 1, date: "2025-04-28", day: "Monday", time: "7:00 AM", program: "Morning Yoga", trainer: "Sarah Johnson", location: "Studio A" },
    { id: 2, date: "2025-04-30", day: "Wednesday", time: "5:30 PM", program: "Weight Training", trainer: "Mike Peterson", location: "Weights Room" },
    { id: 3, date: "2025-05-02", day: "Friday", time: "6:00 PM", program: "HIIT Challenge", trainer: "Alex Rivera", location: "Cardio Zone" },
    { id: 4, date: "2025-05-05", day: "Monday", time: "7:00 AM", program: "Morning Yoga", trainer: "Sarah Johnson", location: "Studio A" },
    { id: 5, date: "2025-05-07", day: "Wednesday", time: "5:30 PM", program: "Weight Training", trainer: "Mike Peterson", location: "Weights Room" },
    { id: 6, date: "2025-05-09", day: "Friday", time: "6:00 PM", program: "HIIT Challenge", trainer: "Alex Rivera", location: "Cardio Zone" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">View your upcoming workout sessions</p>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map(session => (
              <TableRow key={session.id}>
                <TableCell>{session.date}</TableCell>
                <TableCell>{session.day}</TableCell>
                <TableCell>{session.time}</TableCell>
                <TableCell>{session.program}</TableCell>
                <TableCell>{session.trainer}</TableCell>
                <TableCell>{session.location}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">Add to Calendar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const AttendancePage = () => {
  const attendance = [
    { id: 1, date: "2025-04-25", program: "HIIT Challenge", status: "Present" },
    { id: 2, date: "2025-04-24", program: "Weight Training", status: "Present" },
    { id: 3, date: "2025-04-22", program: "Morning Yoga", status: "Absent" },
    { id: 4, date: "2025-04-21", program: "HIIT Challenge", status: "Present" },
    { id: 5, date: "2025-04-19", program: "Weight Training", status: "Present" },
    { id: 6, date: "2025-04-17", program: "Morning Yoga", status: "Present" },
    { id: 7, date: "2025-04-15", program: "HIIT Challenge", status: "Present" },
    { id: 8, date: "2025-04-14", program: "Weight Training", status: "Absent" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">View your attendance history</p>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Program/Session</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map(record => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.program}</TableCell>
                <TableCell>
                  <Badge variant={record.status === "Present" ? "default" : "destructive"} className={record.status === "Present" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const ProfileSettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
      <p className="text-muted-foreground">Update your personal information</p>
    </div>
    
    <Card className="p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input type="text" defaultValue="John Doe" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input type="email" defaultValue="john@example.com" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input type="tel" defaultValue="555-123-4567" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Emergency Contact</label>
            <input type="tel" defaultValue="555-987-6543" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>
    </Card>
  </div>
);

const NotificationsSettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Notification Settings</h1>
      <p className="text-muted-foreground">Manage how and when you receive notifications</p>
    </div>
    
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
          </div>
          <input type="checkbox" defaultChecked className="toggle" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">SMS Alerts</h3>
            <p className="text-sm text-muted-foreground">Receive text message alerts</p>
          </div>
          <input type="checkbox" defaultChecked className="toggle" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Class Reminders</h3>
            <p className="text-sm text-muted-foreground">Get reminders before scheduled classes</p>
          </div>
          <input type="checkbox" defaultChecked className="toggle" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Payment Reminders</h3>
            <p className="text-sm text-muted-foreground">Get alerts about upcoming payments</p>
          </div>
          <input type="checkbox" defaultChecked className="toggle" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Promotional Messages</h3>
            <p className="text-sm text-muted-foreground">Receive offers and promotions</p>
          </div>
          <input type="checkbox" className="toggle" />
        </div>
        <Button>Save Preferences</Button>
      </div>
    </Card>
  </div>
);

const BillingSettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Billing Settings</h1>
      <p className="text-muted-foreground">Manage your billing information and payment details</p>
    </div>
    
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Current Membership</h3>
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Plan</div>
            <div className="font-medium">Premium Membership</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="font-medium">$59.99 per month</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Renewal Date</div>
            <div className="font-medium">May 15, 2025</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Status</div>
            <Badge variant="default" className="bg-green-500 text-white">Active</Badge>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center">
              <div className="mr-4">
                <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="4" fill="#F3F4F6" />
                  <path d="M9 20h14" stroke="#4F46E5" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Visa ending in 4242</div>
                <div className="text-sm text-muted-foreground">Expires 04/2026</div>
              </div>
            </div>
            <Badge>Default</Badge>
          </div>
          <Button variant="outline" className="w-full">Add Payment Method</Button>
        </div>
      </Card>
      
      <Card className="p-6 md:col-span-2">
        <h3 className="text-lg font-medium mb-4">Billing History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { date: "Apr 15, 2025", amount: "$59.99", description: "Premium Membership - Monthly", status: "Paid" },
              { date: "Mar 15, 2025", amount: "$59.99", description: "Premium Membership - Monthly", status: "Paid" },
              { date: "Feb 15, 2025", amount: "$59.99", description: "Premium Membership - Monthly", status: "Paid" }
            ].map((payment, i) => (
              <TableRow key={i}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-green-500 text-white">{payment.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">Download</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  </div>
);

const PasswordSettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Password Settings</h1>
      <p className="text-muted-foreground">Update your password</p>
    </div>
    
    <Card className="p-6">
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Password</label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">New Password</label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm New Password</label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <Button>Update Password</Button>
      </div>
    </Card>
  </div>
);

const FitnessGoalsSettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Fitness Goals</h1>
      <p className="text-muted-foreground">Set and track your fitness objectives</p>
    </div>
    
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Primary Goal</label>
          <select className="w-full p-2 border border-gray-300 rounded-md">
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Improve Endurance</option>
            <option>Increase Flexibility</option>
            <option>General Fitness</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Weight (lbs)</label>
          <input type="number" defaultValue="165" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Weekly Workout Goal</label>
          <select className="w-full p-2 border border-gray-300 rounded-md">
            <option>1-2 workouts</option>
            <option>3-4 workouts</option>
            <option>5+ workouts</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Date</label>
          <input type="date" defaultValue="2025-07-30" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Additional Notes</label>
          <textarea 
            className="w-full p-2 border border-gray-300 rounded-md" 
            rows={4}
            defaultValue="Focus on core strength and improving overall flexibility. Would like to reduce body fat percentage by 5%."
          />
        </div>
        
        <Button>Save Goals</Button>
      </div>
    </Card>
  </div>
);

const MemberDashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout userType="member" />}>
        <Route index element={<MemberHome />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="programs" element={<MyProgramsPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="settings/profile" element={<ProfileSettingsPage />} />
        <Route path="settings/notifications" element={<NotificationsSettingsPage />} />
        <Route path="settings/billing" element={<BillingSettingsPage />} />
        <Route path="settings/password" element={<PasswordSettingsPage />} />
        <Route path="settings/goals" element={<FitnessGoalsSettingsPage />} />
        <Route path="*" element={<Navigate to="/member-dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default MemberDashboard;
