import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { 
  BarChart2, 
  Activity, 
  Users, 
  Calendar, 
  ArrowUp,
  User,
  Dumbbell,
  UserPlus,
  CreditCard,
  Bell,
  Lock,
  Shield 
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OwnerHomeHeader } from "@/components/dashboard/home/OwnerHomeHeader";
import { StatsCard } from "@/components/dashboard/home/StatsCard";
import { MiniLineChart } from "@/components/dashboard/home/MiniLineChart";
import { RecentActivityWidget } from "@/components/dashboard/home/RecentActivityWidget";
import { TodayClassesWidget } from "@/components/dashboard/home/TodayClassesWidget";
import { GrowthChartWidget } from "@/components/dashboard/home/GrowthChartWidget";

const OwnerHome = () => {
  // Sample data for the mini charts
  const membersData = [70, 75, 82, 90, 95, 105, 112, 120, 128];
  const activeData = [60, 65, 68, 72, 75, 80, 84, 90, 98];
  const programsData = [15, 16, 18, 20, 20, 22, 22, 23, 24];
  const classesData = [6, 7, 7, 6, 8, 7, 9, 8, 8];

  return (
    <div className="space-y-8 animate-in fade-in-50">
      {/* Enhanced header with banner and motivational quote */}
      <OwnerHomeHeader />
      
      {/* Enhanced Statistics Cards with animations, gradients, and mini charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Members"
          value={128}
          icon={<Users className="h-6 w-6 text-purple-600" />}
          trend={{ value: 12, isUp: true, label: "from last month" }}
          gradientColors="from-purple-100 to-purple-50"
          miniChart={<MiniLineChart data={membersData} lineColor="#9333ea" height={35} />}
        />
        
        <StatsCard
          title="Active Members"
          value={98}
          icon={<User className="h-6 w-6 text-blue-500" />}
          trend={{ value: 4, isUp: true, label: "from last month" }}
          gradientColors="from-blue-100 to-blue-50"
          miniChart={<MiniLineChart data={activeData} lineColor="#3b82f6" height={35} />}
        />
        
        <StatsCard
          title="Programs"
          value={24}
          icon={<Activity className="h-6 w-6 text-green-500" />}
          footer={<span>4 new this month</span>}
          gradientColors="from-green-100 to-green-50"
          miniChart={<MiniLineChart data={programsData} lineColor="#22c55e" height={35} />}
        />
        
        <StatsCard
          title="Classes Today"
          value={8}
          icon={<Calendar className="h-6 w-6 text-orange-500" />}
          footer={<span>Next class: <span className="font-medium">Yoga Class at 10:30 AM</span></span>}
          gradientColors="from-orange-100 to-orange-50"
          miniChart={<MiniLineChart data={classesData} lineColor="#f97316" height={35} />}
        />
      </div>
      
      {/* Widgets section - Recent Activity, Today's Classes, and Growth Chart */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RecentActivityWidget className="lg:col-span-1" />
        <TodayClassesWidget className="lg:col-span-1" />
        <GrowthChartWidget className="md:col-span-2 lg:col-span-1" />
      </div>
    </div>
  );
};

const DashboardPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
    <Card>
      <iframe 
        src="https://eu2.ca.analytics.ibm.com/bi/?perspective=dashboard&amp;pathRef=.my_folders%2FBI-dashboard%2Bnew&amp;closeWindowOnLastView=true&amp;ui_appbar=false&amp;ui_navbar=false&amp;shareMode=embedded&amp;action=view&amp;mode=dashboard&amp;subView=model00000195adf9971b_00000002" 
        width="100%" 
        height="1000px" 
        frameBorder="0" 
        allowFullScreen
        title="Analytics Dashboard"
      />
    </Card>
  </div>
);

const MembersPage = () => {
  const members = [
    { id: "M001", name: "John Doe", email: "john@example.com", phone: "123-456-7890", status: "Active" },
    { id: "M002", name: "Jane Smith", email: "jane@example.com", phone: "234-567-8901", status: "Active" },
    { id: "M003", name: "Robert Johnson", email: "robert@example.com", phone: "345-678-9012", status: "Inactive" },
    { id: "M004", name: "Emily Chen", email: "emily@example.com", phone: "456-789-0123", status: "Active" },
    { id: "M005", name: "Michael Brown", email: "michael@example.com", phone: "567-890-1234", status: "Active" },
    { id: "M006", name: "Sarah Wilson", email: "sarah@example.com", phone: "678-901-2345", status: "Inactive" }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members Management</h1>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search members..." 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fitpulse-purple"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fitpulse-purple">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    member.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {member.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const ProgramsPage = () => {
  const programs = [
    { id: "P001", name: "Weight Training 101", duration: "8 weeks", fee: "$120", schedule: "Mon, Wed, Fri 9-10AM", trainer: "John Smith" },
    { id: "P002", name: "Morning Yoga Flow", duration: "12 weeks", fee: "$150", schedule: "Tue, Thu 7-8AM", trainer: "Sarah Lee" },
    { id: "P003", name: "HIIT Challenge", duration: "6 weeks", fee: "$180", schedule: "Mon, Wed, Fri 6-7PM", trainer: "Mike Johnson" },
    { id: "P004", name: "Spin Class", duration: "10 weeks", fee: "$140", schedule: "Tue, Thu, Sat 5-6PM", trainer: "Lisa Wong" }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Programs Management</h1>
        <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
          Create New Program
        </button>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Program Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell>{program.id}</TableCell>
                <TableCell>{program.name}</TableCell>
                <TableCell>{program.duration}</TableCell>
                <TableCell>{program.fee}</TableCell>
                <TableCell>{program.schedule}</TableCell>
                <TableCell>{program.trainer}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const SettingsProfilePage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input type="text" defaultValue="GymOwner" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" defaultValue="owner@demo.com" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input type="tel" defaultValue="(555) 123-4567" className="w-full p-2 border rounded-md" />
        </div>
        <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
          Save Changes
        </button>
      </div>
    </Card>
  </div>
);

const SettingsGymInfoPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Gym Information</h1>
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Gym Name</label>
          <input type="text" defaultValue="FitPulse Gym" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input type="text" defaultValue="123 Fitness Street, Workout City" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input type="tel" defaultValue="(555) 987-6543" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Opening Hours</label>
          <input type="text" defaultValue="Mon-Fri: 6AM-10PM, Sat-Sun: 8AM-8PM" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gym Logo</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
              Logo
            </div>
            <button className="px-4 py-2 border rounded-md">Upload New Logo</button>
          </div>
        </div>
        <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
          Save Changes
        </button>
      </div>
    </Card>
  </div>
);

const SettingsUserManagementPage = () => {
  const staffMembers = [
    { id: 1, name: "John Smith", email: "john@fitpulse.com", role: "Trainer", status: "Active" },
    { id: 2, name: "Sarah Lee", email: "sarah@fitpulse.com", role: "Trainer", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@fitpulse.com", role: "Manager", status: "Active" },
    { id: 4, name: "Lisa Wong", email: "lisa@fitpulse.com", role: "Cleaner", status: "Inactive" }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
          Add New Staff
        </button>
      </div>
      
      <Card className="mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    staff.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {staff.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Permission Roles</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <h3 className="font-medium">Admin</h3>
                <p className="text-sm text-gray-500">Full access to all features</p>
              </div>
              <button className="text-blue-600">Edit</button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <h3 className="font-medium">Editor</h3>
                <p className="text-sm text-gray-500">Can edit but not delete content</p>
              </div>
              <button className="text-blue-600">Edit</button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <h3 className="font-medium">Viewer</h3>
                <p className="text-sm text-gray-500">Can only view content</p>
              </div>
              <button className="text-blue-600">Edit</button>
            </div>
            <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
              Add New Role
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const SettingsBillingPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Billing Settings</h1>
    
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center p-3 border rounded-md">
            <div className="flex items-center gap-4">
              <CreditCard className="h-6 w-6" />
              <div>
                <h3 className="font-medium">Credit Card</h3>
                <p className="text-sm text-gray-500">VISA ending in 4242</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600">Edit</button>
              <button className="text-red-600">Remove</button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 border rounded-md">
            <div className="flex items-center gap-4">
              <CreditCard className="h-6 w-6" />
              <div>
                <h3 className="font-medium">Bank Transfer</h3>
                <p className="text-sm text-gray-500">Account ending in 5678</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600">Edit</button>
              <button className="text-red-600">Remove</button>
            </div>
          </div>
          
          <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
            Add Payment Method
          </button>
        </div>
      </Card>
    </div>
    
    <div>
      <h2 className="text-xl font-bold mb-4">Membership Plans</h2>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center p-3 border rounded-md">
            <div>
              <h3 className="font-medium">Basic Plan</h3>
              <p className="text-sm text-gray-500">$29.99/month</p>
            </div>
            <button className="text-blue-600">Edit</button>
          </div>
          
          <div className="flex justify-between items-center p-3 border rounded-md">
            <div>
              <h3 className="font-medium">Premium Plan</h3>
              <p className="text-sm text-gray-500">$49.99/month</p>
            </div>
            <button className="text-blue-600">Edit</button>
          </div>
          
          <div className="flex justify-between items-center p-3 border rounded-md">
            <div>
              <h3 className="font-medium">Annual Plan</h3>
              <p className="text-sm text-gray-500">$299.99/year</p>
            </div>
            <button className="text-blue-600">Edit</button>
          </div>
          
          <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
            Add New Plan
          </button>
        </div>
      </Card>
    </div>
  </div>
);

const SettingsNotificationPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>
    
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Alert Settings</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Payment Due</h3>
              <p className="text-sm text-gray-500">Get notified when payments are due</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fitpulse-purple"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Low Attendance</h3>
              <p className="text-sm text-gray-500">Alert when a member's attendance drops</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fitpulse-purple"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">New Member Signup</h3>
              <p className="text-sm text-gray-500">Notification when a new member joins</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fitpulse-purple"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">System Updates</h3>
              <p className="text-sm text-gray-500">Get notified about system changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fitpulse-purple"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
    
    <div>
      <h2 className="text-xl font-bold mb-4">Email Templates</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="p-3 border rounded-md">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Payment Due Template</h3>
              <button className="text-blue-600">Edit</button>
            </div>
            <p className="text-sm text-gray-500">Template for payment due reminders</p>
          </div>
          
          <div className="p-3 border rounded-md">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Low Attendance Template</h3>
              <button className="text-blue-600">Edit</button>
            </div>
            <p className="text-sm text-gray-500">Template for low attendance alerts</p>
          </div>
          
          <div className="p-3 border rounded-md">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">New Member Welcome</h3>
              <button className="text-blue-600">Edit</button>
            </div>
            <p className="text-sm text-gray-500">Template for welcoming new members</p>
          </div>
          
          <div className="p-3 border rounded-md">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">System Update Notice</h3>
              <button className="text-blue-600">Edit</button>
            </div>
            <p className="text-sm text-gray-500">Template for system update notifications</p>
          </div>
          
          <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
            Create New Template
          </button>
        </div>
      </Card>
    </div>
  </div>
);

const SettingsPasswordPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Password Settings</h1>
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input type="password" className="w-full p-2 border rounded-md" placeholder="Enter current password" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input type="password" className="w-full p-2 border rounded-md" placeholder="Enter new password" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input type="password" className="w-full p-2 border rounded-md" placeholder="Confirm new password" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-4">Password requirements:</p>
          <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
            <li>Minimum 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one number</li>
            <li>At least one special character</li>
          </ul>
        </div>
        <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
          Update Password
        </button>
      </div>
    </Card>
  </div>
);

const SettingsReportsPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Reports Settings</h1>
    
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Schedule Reports</h2>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Daily Reports</h3>
            <div className="flex items-center gap-4 mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-fitpulse-purple" />
                <span className="ml-2">Attendance Summary</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-fitpulse-purple" />
                <span className="ml-2">Revenue Report</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span>Send at:</span>
              <select className="p-2 border rounded-md">
                <option>6:00 AM</option>
                <option>9:00 AM</option>
                <option>12:00 PM</option>
                <option>5:00 PM</option>
              </select>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Weekly Reports</h3>
            <div className="flex items-center gap-4 mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-fitpulse-purple" checked />
                <span className="ml-2">Member Progress</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-fitpulse-purple" checked />
                <span className="ml-2">Popular Programs</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span>Send on:</span>
              <select className="p-2 border rounded-md">
                <option>Monday</option>
                <option>Friday</option>
                <option>Sunday</option>
              </select>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Monthly Reports</h3>
            <div className="flex items-center gap-4 mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-fitpulse-purple" checked />
                <span className="ml-2">Financial Summary</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-fitpulse-purple" checked />
                <span className="ml-2">Membership Growth</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span>Send on day:</span>
              <select className="p-2 border rounded-md">
                <option>1</option>
                <option>15</option>
                <option>Last day</option>
              </select>
            </div>
          </div>
          
          <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
            Save Report Settings
          </button>
        </div>
      </Card>
    </div>
    
    <div>
      <h2 className="text-xl font-bold mb-4">Key Performance Indicators</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="p-3 border rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Member Retention Rate</h3>
                <p className="text-sm text-gray-500">Track how many members stay enrolled</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fitpulse-purple"></div>
              </label>
            </div>
          </div>
          
          <div className="p-3 border rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Revenue Growth</h3>
                <p className="text-sm text-gray-500">Monitor monthly revenue changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fitpulse-purple"></div>
              </label>
            </div>
          </div>
          
          <div className="p-3 border rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Member Attendance</h3>
                <p className="text-sm text-gray-500">Track how often members visit</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fitpulse-purple"></div>
              </label>
            </div>
          </div>
          
          <div className="p-3 border rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Program Popularity</h3>
                <p className="text-sm text-gray-500">See which programs are most attended</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fitpulse-purple"></div>
              </label>
            </div>
          </div>
          
          <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
            Add Custom KPI
          </button>
        </div>
      </Card>
    </div>
  </div>
);

const SettingsSecurityPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
    
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Two-Factor Authentication</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">Enable 2FA</h3>
              <p className="text-sm text-gray-500">Secure your account with two-factor authentication</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fitpulse-purple"></div>
            </label>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm">Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to sign in.</p>
          </div>
          
          <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple" disabled>
            Set Up 2FA
          </button>
        </div>
      </Card>
    </div>
    
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Active Sessions</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="p-3 border rounded-md flex justify-between items-center">
            <div>
              <h3 className="font-medium">Current Session</h3>
              <p className="text-sm text-gray-500">Chrome on Windows • 192.168.1.1</p>
              <p className="text-xs text-green-600">Active now</p>
            </div>
            <button className="px-3 py-1 border rounded-md text-sm">This Device</button>
          </div>
          
          <div className="p-3 border rounded-md flex justify-between items-center">
            <div>
              <h3 className="font-medium">Mobile Session</h3>
              <p className="text-sm text-gray-500">Safari on iPhone • 192.168.1.2</p>
              <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
            </div>
            <button className="px-3 py-1 border rounded-md text-sm text-red-600">Revoke</button>
          </div>
          
          <div className="p-3 border rounded-md flex justify-between items-center">
            <div>
              <h3 className="font-medium">Tablet Session</h3>
              <p className="text-sm text-gray-500">Chrome on iPad • 192.168.1.3</p>
              <p className="text-xs text-gray-500">Last active: 3 days ago</p>
            </div>
            <button className="px-3 py-1 border rounded-md text-sm text-red-600">Revoke</button>
          </div>
          
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Revoke All Other Sessions
          </button>
        </div>
      </Card>
    </div>
    
    <div>
      <h2 className="text-xl font-bold mb-4">Access Controls</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="p-3 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Member Management</h3>
              <select className="p-1 border rounded-md text-sm">
                <option>Admin Only</option>
                <option>Admin, Manager</option>
                <option>All Staff</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">Who can add, edit, and remove members</p>
          </div>
          
          <div className="p-3 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Financial Records</h3>
              <select className="p-1 border rounded-md text-sm">
                <option>Admin Only</option>
                <option>Admin, Manager</option>
                <option>All Staff</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">Who can view and modify payment information</p>
          </div>
          
          <div className="p-3 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Program Management</h3>
              <select className="p-1 border rounded-md text-sm">
                <option>Admin Only</option>
                <option>Admin, Manager</option>
                <option selected>All Staff</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">Who can create and modify fitness programs</p>
          </div>
          
          <div className="p-3 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">System Settings</h3>
              <select className="p-1 border rounded-md text-sm">
                <option selected>Admin Only</option>
                <option>Admin, Manager</option>
                <option>All Staff</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">Who can modify application settings</p>
          </div>
          
          <button className="px-4 py-2 bg-fitpulse-purple text-white rounded-md hover:bg-fitpulse-dark-purple">
            Save Access Controls
          </button>
        </div>
      </Card>
    </div>
  </div>
);

const OwnerDashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout userType="owner" />}>
        <Route index element={<OwnerHome />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="settings" element={<Navigate to="/owner-dashboard/settings/profile" replace />} />
        <Route path="settings/profile" element={<SettingsProfilePage />} />
        <Route path="settings/gym-info" element={<SettingsGymInfoPage />} />
        <Route path="settings/user-management" element={<SettingsUserManagementPage />} />
        <Route path="settings/billing" element={<SettingsBillingPage />} />
        <Route path="settings/notification" element={<SettingsNotificationPage />} />
        <Route path="settings/password" element={<SettingsPasswordPage />} />
        <Route path="settings/reports" element={<SettingsReportsPage />} />
        <Route path="settings/security" element={<SettingsSecurityPage />} />
        <Route path="*" element={<Navigate to="/owner-dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default OwnerDashboard;
