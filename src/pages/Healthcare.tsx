import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Stethoscope, Search, Activity, Pill, CalendarDays, Plus, MapPin, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const initialCamps = [
  { id: 1, name: "Eye Check Camp", location: "Varanasi", date: "2026-04-12", patients: 245, status: "Upcoming" },
  { id: 2, name: "General Health Camp", location: "Patna", date: "2026-03-20", patients: 380, status: "Completed" },
  { id: 3, name: "Dental Camp", location: "Delhi", date: "2026-03-15", patients: 190, status: "Completed" },
  { id: 4, name: "Pediatric Camp", location: "Mumbai", date: "2026-04-25", patients: 0, status: "Upcoming" },
  { id: 5, name: "Women's Health", location: "Jaipur", date: "2026-03-08", patients: 310, status: "Completed" },
];

const patientTrend = [
  { month: "Jan", patients: 420 }, { month: "Feb", patients: 380 },
  { month: "Mar", patients: 510 }, { month: "Apr", patients: 470 },
  { month: "May", patients: 590 }, { month: "Jun", patients: 540 },
];

const Healthcare = () => {
  const [search, setSearch] = useState("");
  const [camps, setCamps] = useState(initialCamps);
  const [showModal, setShowModal] = useState(false);
  const [newCamp, setNewCamp] = useState({ name: "", location: "", date: "" });
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal(0.05);

  const filtered = camps.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCamp = (e: React.FormEvent) => {
    e.preventDefault();
    const camp = {
      id: camps.length + 1,
      name: newCamp.name,
      location: newCamp.location,
      date: newCamp.date,
      patients: 0,
      status: "Upcoming" as const,
    };
    setCamps([camp, ...camps]);
    setShowModal(false);
    setNewCamp({ name: "", location: "", date: "" });
    toast({ title: "Camp Scheduled! 🏥", description: `${camp.name} at ${camp.location} has been scheduled.` });
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
              <Stethoscope className="h-8 w-8 text-info" /> Healthcare Module
            </h1>
            <p className="text-muted-foreground mt-1">Manage health camps, patient records, and medical supplies</p>
          </div>
          <Button className="bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-2" /> Schedule Camp
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Health Camps", value: camps.length.toString(), icon: CalendarDays },
            { label: "Patients Treated", value: "28,500+", icon: Activity },
            { label: "Medical Supplies", value: "12,000", icon: Pill },
            { label: "Locations", value: "45", icon: MapPin },
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
                  <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-info" />
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
              <CardTitle className="text-base font-display">Health Camps</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search camps..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-3 font-medium">Camp Name</th>
                      <th className="text-left py-3 font-medium">Location</th>
                      <th className="text-left py-3 font-medium">Date</th>
                      <th className="text-left py-3 font-medium">Patients</th>
                      <th className="text-left py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors duration-200">
                        <td className="py-3 font-medium">{c.name}</td>
                        <td className="py-3 text-muted-foreground">{c.location}</td>
                        <td className="py-3">{c.date}</td>
                        <td className="py-3">{c.patients || "—"}</td>
                        <td className="py-3">
                          <Badge className={c.status === "Completed" ? "bg-success/15 text-success border-0" : "bg-info/15 text-info border-0"}>
                            {c.status}
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
              <CardTitle className="text-base font-display">Patient Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={patientTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="patients" stroke="hsl(210,80%,52%)" strokeWidth={2} dot={{ fill: "hsl(210,80%,52%)" }} animationDuration={1200} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowModal(false)}>
          <Card className="w-full max-w-md mx-4 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-display">Schedule New Camp</CardTitle>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCamp} className="space-y-4">
                <div className="space-y-2">
                  <Label>Camp Name</Label>
                  <Input placeholder="e.g. Eye Check Camp" value={newCamp.name} onChange={(e) => setNewCamp({ ...newCamp, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="City name" value={newCamp.location} onChange={(e) => setNewCamp({ ...newCamp, location: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={newCamp.date} onChange={(e) => setNewCamp({ ...newCamp, date: e.target.value })} required />
                </div>
                <Button type="submit" className="w-full bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow">
                  <Plus className="h-4 w-4 mr-2" /> Schedule Camp
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

export default Healthcare;
