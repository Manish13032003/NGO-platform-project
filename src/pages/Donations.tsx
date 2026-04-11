import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HandCoins, Heart, TrendingUp, CreditCard, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const initialDonations = [
  { name: "Anjali Sharma", amount: "₹50,000", date: "Mar 23, 2026", program: "Education" },
  { name: "Vikram Enterprises", amount: "₹2,00,000", date: "Mar 22, 2026", program: "Healthcare" },
  { name: "Priya Gupta", amount: "₹10,000", date: "Mar 21, 2026", program: "Nutrition" },
  { name: "Tech4Good Foundation", amount: "₹5,00,000", date: "Mar 20, 2026", program: "Education" },
  { name: "Anonymous Donor", amount: "₹25,000", date: "Mar 19, 2026", program: "Healthcare" },
];

const allocation = [
  { name: "Education", value: 45 },
  { name: "Healthcare", value: 30 },
  { name: "Operations", value: 15 },
  { name: "Emergency", value: 10 },
];
const COLORS = ["hsl(152,60%,36%)", "hsl(210,80%,52%)", "hsl(38,92%,50%)", "hsl(280,60%,50%)"];

const Donations = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [program, setProgram] = useState("Education");
  const [donations, setDonations] = useState(initialDonations);
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal(0.05);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const newDonation = {
      name: name || "Anonymous Donor",
      amount: `₹${parseInt(amount).toLocaleString()}`,
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
      program,
    };
    setDonations([newDonation, ...donations]);
    toast({ title: "Thank you! 🎉", description: `Your donation of ₹${parseInt(amount).toLocaleString()} has been recorded successfully.` });
    setAmount("");
    setName("");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12" ref={ref}>
        <div
          className="mb-10 transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
        >
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <HandCoins className="h-8 w-8 text-warm" /> Donation Management
          </h1>
          <p className="text-muted-foreground mt-1">Track, manage, and make donations with full transparency</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Raised", value: "₹2.54Cr", icon: IndianRupee },
            { label: "This Month", value: "₹18.5L", icon: TrendingUp },
            { label: "Total Donors", value: donations.length.toLocaleString(), icon: Heart },
            { label: "Avg Donation", value: "₹5,975", icon: CreditCard },
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
                  <div className="w-12 h-12 rounded-xl bg-warm/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-warm" />
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
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-base font-display">Make a Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDonate} className="space-y-4">
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} required min="1" />
                </div>
                <div className="space-y-2">
                  <Label>Program</Label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={program} onChange={(e) => setProgram(e.target.value)}>
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Nutrition</option>
                    <option>General Fund</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["500", "1000", "5000", "10000"].map((v) => (
                    <Button key={v} type="button" variant="outline" size="sm" onClick={() => setAmount(v)} className={`hover:scale-105 transition-transform duration-200 ${amount === v ? "border-primary bg-primary/10" : ""}`}>
                      ₹{v}
                    </Button>
                  ))}
                </div>
                <Button type="submit" className="w-full bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow">
                  <Heart className="h-4 w-4 mr-2" /> Donate Now
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {donations.map((d, i) => (
                  <div key={i} className="flex items-center justify-between pb-3 border-b border-border/50 last:border-0 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <div>
                      <p className="text-sm font-medium">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.date} · {d.program}</p>
                    </div>
                    <Badge className="bg-success/15 text-success border-0 font-semibold">{d.amount}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Fund Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={allocation} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" animationDuration={1200}>
                    {allocation.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {allocation.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    {a.name} ({a.value}%)
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Donations;
