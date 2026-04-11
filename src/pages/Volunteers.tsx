import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, Search, Clock, Award, CheckCircle, Plus, UserCheck, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const initialVolunteers = [
  { id: 1, name: "Raj Kumar", role: "Field Coordinator", hours: 240, tasks: 18, status: "Active", program: "Education" },
  { id: 2, name: "Meera Joshi", role: "Health Worker", hours: 180, tasks: 14, status: "Active", program: "Healthcare" },
  { id: 3, name: "Amit Singh", role: "Teaching Assistant", hours: 320, tasks: 25, status: "Active", program: "Education" },
  { id: 4, name: "Sunita Devi", role: "Camp Organizer", hours: 150, tasks: 12, status: "On Leave", program: "Healthcare" },
  { id: 5, name: "Ravi Teja", role: "Data Entry", hours: 90, tasks: 8, status: "Active", program: "Operations" },
  { id: 6, name: "Kavita Rao", role: "Counselor", hours: 200, tasks: 16, status: "Active", program: "Education" },
];

const hoursData = [
  { month: "Jan", hours: 1200 }, { month: "Feb", hours: 1450 },
  { month: "Mar", hours: 1380 }, { month: "Apr", hours: 1600 },
  { month: "May", hours: 1750 }, { month: "Jun", hours: 1520 },
];

const Volunteers = () => {
  const [search, setSearch] = useState("");
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [showModal, setShowModal] = useState(false);
  const [newVol, setNewVol] = useState({ name: "", role: "", program: "" });
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal(0.05);

  const filtered = volunteers.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const vol = { id: volunteers.length + 1, name: newVol.name, role: newVol.role, hours: 0, tasks: 0, status: "Active" as const, program: newVol.program };
    setVolunteers([vol, ...volunteers]);
    setShowModal(false);
    setNewVol({ name: "", role: "", program: "" });
    toast({ title: "Volunteer Added! 🙌", description: `${vol.name} has joined the ${vol.program} team.` });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12" ref={ref}>
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <Users className="h-8 w-8 text-success" /> Volunteer Management
            </h1>
            <p className="text-muted-foreground mt-1">Coordinate volunteers, track hours, and manage assignments</p>
          </div>
          <Button className="bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Volunteer
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Volunteers", value: volunteers.length.toLocaleString(), icon: Users },
            { label: "Active Now", value: volunteers.filter(v => v.status === "Active").length.toLocaleString(), icon: UserCheck },
            { label: "Total Hours", value: volunteers.reduce((a, b) => a + b.hours, 0).toLocaleString(), icon: Clock },
            { label: "Tasks Completed", value: volunteers.reduce((a, b) => a + b.tasks, 0).toLocaleString(), icon: CheckCircle },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <Card
                key={i}
                className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease-out ${i * 100}ms`,
                }}
              >
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <div className="text-xl font-display font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-display">Volunteer Directory</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search volunteers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-3 font-medium">Name</th>
                      <th className="text-left py-3 font-medium">Role</th>
                      <th className="text-left py-3 font-medium">Hours</th>
                      <th className="text-left py-3 font-medium">Tasks</th>
                      <th className="text-left py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v) => (
                      <tr key={v.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors duration-200">
                        <td className="py-3">
                          <div className="font-medium">{v.name}</div>
                          <div className="text-xs text-muted-foreground">{v.program}</div>
                        </td>
                        <td className="py-3 text-muted-foreground">{v.role}</td>
                        <td className="py-3">{v.hours}h</td>
                        <td className="py-3">{v.tasks}</td>
                        <td className="py-3">
                          <Badge className={v.status === "Active" ? "bg-success/15 text-success border-0" : "bg-warm/15 text-warm border-0"}>
                            {v.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Monthly Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={hoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="hsl(152,60%,36%)" radius={[6, 6, 0, 0]} animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-warm" /> Top Contributors
                </h4>
                {[...volunteers].sort((a, b) => b.hours - a.hours).slice(0, 3).map((v, i) => (
                  <div key={v.id} className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{i + 1}</span>
                      {v.name}
                    </div>
                    <span className="text-muted-foreground">{v.hours}h</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowModal(false)}>
          <Card className="w-full max-w-md mx-4 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-display">Add New Volunteer</CardTitle>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Volunteer name" value={newVol.name} onChange={(e) => setNewVol({ ...newVol, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input placeholder="e.g. Field Coordinator" value={newVol.role} onChange={(e) => setNewVol({ ...newVol, role: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Program</Label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={newVol.program} onChange={(e) => setNewVol({ ...newVol, program: e.target.value })} required>
                    <option value="">Select program</option>
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Operations</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow">
                  <Plus className="h-4 w-4 mr-2" /> Add Volunteer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Volunteers;
