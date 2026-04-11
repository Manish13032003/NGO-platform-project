import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GraduationCap, Search, BookOpen, Award, Users, Plus, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const initialStudents = [
  { id: 1, name: "Deepak Kumar", age: 14, grade: "8th", center: "Delhi Center", status: "Active", scholarship: true },
  { id: 2, name: "Priya Sharma", age: 12, grade: "6th", center: "Mumbai Center", status: "Active", scholarship: false },
  { id: 3, name: "Arjun Patel", age: 16, grade: "10th", center: "Ahmedabad Center", status: "Active", scholarship: true },
  { id: 4, name: "Neha Singh", age: 13, grade: "7th", center: "Delhi Center", status: "Inactive", scholarship: false },
  { id: 5, name: "Vikram Reddy", age: 15, grade: "9th", center: "Hyderabad Center", status: "Active", scholarship: true },
  { id: 6, name: "Anita Devi", age: 11, grade: "5th", center: "Patna Center", status: "Active", scholarship: false },
];

const attendanceData = [
  { month: "Jan", attendance: 92 }, { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 95 }, { month: "Apr", attendance: 90 },
  { month: "May", attendance: 87 }, { month: "Jun", attendance: 93 },
];

const Education = () => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState(initialStudents);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", age: "", grade: "", center: "" });
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal(0.05);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.center.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student = {
      id: students.length + 1,
      name: newStudent.name,
      age: parseInt(newStudent.age),
      grade: newStudent.grade,
      center: newStudent.center,
      status: "Active" as const,
      scholarship: false,
    };
    setStudents([student, ...students]);
    setShowModal(false);
    setNewStudent({ name: "", age: "", grade: "", center: "" });
    toast({ title: "Student Added! 🎓", description: `${student.name} has been enrolled successfully.` });
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
              <GraduationCap className="h-8 w-8 text-primary" /> Education Module
            </h1>
            <p className="text-muted-foreground mt-1">Manage student records, attendance, and scholarships</p>
          </div>
          <Button className="bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Student
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Students", value: students.length.toLocaleString(), icon: Users },
            { label: "Active Programs", value: "24", icon: BookOpen },
            { label: "Scholarships", value: students.filter(s => s.scholarship).length.toLocaleString(), icon: Award },
            { label: "Avg Attendance", value: "91%", icon: GraduationCap },
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
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
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
              <CardTitle className="text-base font-display">Student Records</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-3 font-medium">Name</th>
                      <th className="text-left py-3 font-medium">Grade</th>
                      <th className="text-left py-3 font-medium">Center</th>
                      <th className="text-left py-3 font-medium">Status</th>
                      <th className="text-left py-3 font-medium">Scholarship</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s) => (
                      <tr key={s.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors duration-200">
                        <td className="py-3 font-medium">{s.name}</td>
                        <td className="py-3">{s.grade}</td>
                        <td className="py-3 text-muted-foreground">{s.center}</td>
                        <td className="py-3">
                          <Badge variant={s.status === "Active" ? "default" : "secondary"} className={s.status === "Active" ? "bg-success/15 text-success border-0" : ""}>
                            {s.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          {s.scholarship ? <Badge className="bg-warm/15 text-warm border-0">Yes</Badge> : <span className="text-muted-foreground">No</span>}
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
              <CardTitle className="text-base font-display">Monthly Attendance %</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} domain={[80, 100]} />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="hsl(152,60%,36%)" radius={[6, 6, 0, 0]} animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowModal(false)}>
          <Card className="w-full max-w-md mx-4 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-display">Add New Student</CardTitle>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Student name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input type="number" placeholder="Age" value={newStudent.age} onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })} required min="5" max="20" />
                  </div>
                  <div className="space-y-2">
                    <Label>Grade</Label>
                    <Input placeholder="e.g. 8th" value={newStudent.grade} onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Center</Label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={newStudent.center} onChange={(e) => setNewStudent({ ...newStudent, center: e.target.value })} required>
                    <option value="">Select center</option>
                    <option>Delhi Center</option>
                    <option>Mumbai Center</option>
                    <option>Ahmedabad Center</option>
                    <option>Hyderabad Center</option>
                    <option>Patna Center</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow">
                  <Plus className="h-4 w-4 mr-2" /> Enroll Student
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

export default Education;
