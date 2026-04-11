import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Stethoscope, HandCoins, Users, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const overviewCards = [
  { title: "Total Students", value: "12,437", change: "+12%", icon: GraduationCap, color: "text-primary" },
  { title: "Health Camps", value: "358", change: "+8%", icon: Stethoscope, color: "text-info" },
  { title: "Total Donations", value: "₹2.54Cr", change: "+23%", icon: HandCoins, color: "text-warm" },
  { title: "Volunteers", value: "1,847", change: "+15%", icon: Users, color: "text-success" },
];

const monthlyData = [
  { month: "Jan", donations: 320000, students: 1200, camps: 28 },
  { month: "Feb", donations: 450000, students: 1350, camps: 32 },
  { month: "Mar", donations: 380000, students: 1400, camps: 25 },
  { month: "Apr", donations: 520000, students: 1500, camps: 38 },
  { month: "May", donations: 610000, students: 1600, camps: 42 },
  { month: "Jun", donations: 480000, students: 1550, camps: 35 },
];

const programData = [
  { name: "Education", value: 45 },
  { name: "Healthcare", value: 30 },
  { name: "Nutrition", value: 15 },
  { name: "Skill Dev", value: 10 },
];

const COLORS = ["hsl(152,60%,36%)", "hsl(210,80%,52%)", "hsl(38,92%,50%)", "hsl(280,60%,50%)"];

const recentActivity = [
  { action: "New donation received", detail: "₹50,000 from Anjali Sharma", time: "2 hours ago" },
  { action: "Volunteer registered", detail: "Raj Kumar joined Education Wing", time: "4 hours ago" },
  { action: "Health camp scheduled", detail: "Camp #359 in Varanasi", time: "6 hours ago" },
  { action: "Scholarship awarded", detail: "5 students - Merit Scholarship", time: "1 day ago" },
];

const DashboardOverview = () => (
  <div className="p-6 lg:p-8 space-y-8">
    <div>
      <h1 className="text-2xl font-display font-bold">Dashboard Overview</h1>
      <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's what's happening across your programs.</p>
    </div>

    {/* Stat Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-5 w-5 ${card.color}`} />
                <span className="text-xs font-medium text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> {card.change}
                </span>
              </div>
              <div className="text-2xl font-display font-bold">{card.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{card.title}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>

    {/* Charts */}
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base font-display">Monthly Donations (₹)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={(v) => `₹${v / 1000}K`} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="donations" fill="hsl(152,60%,36%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Fund Allocation</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={programData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                {programData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    {/* Trend + Activity */}
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Student Enrollment Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="hsl(210,80%,52%)" strokeWidth={2} dot={{ fill: "hsl(210,80%,52%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {a.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default DashboardOverview;
