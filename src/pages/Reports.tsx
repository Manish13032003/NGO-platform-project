import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BarChart3, Download, FileText, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useToast } from "@/hooks/use-toast";

const impactData = [
  { quarter: "Q1 2025", education: 3200, healthcare: 2100, donations: 6500000 },
  { quarter: "Q2 2025", education: 3800, healthcare: 2500, donations: 7200000 },
  { quarter: "Q3 2025", education: 4100, healthcare: 2800, donations: 8100000 },
  { quarter: "Q4 2025", education: 4500, healthcare: 3100, donations: 9400000 },
  { quarter: "Q1 2026", education: 4900, healthcare: 3500, donations: 10200000 },
];

const programPerformance = [
  { name: "Scholarship Program", beneficiaries: 3200, budget: "₹45L", utilization: 92 },
  { name: "Health Camps", beneficiaries: 28500, budget: "₹78L", utilization: 88 },
  { name: "Skill Development", beneficiaries: 1200, budget: "₹22L", utilization: 75 },
  { name: "Nutrition Program", beneficiaries: 5600, budget: "₹35L", utilization: 95 },
  { name: "Digital Literacy", beneficiaries: 2100, budget: "₹18L", utilization: 82 },
];

const Reports = () => {
  const { toast } = useToast();

  const handleExport = (type: string) => {
    toast({ title: `${type} Report Generated`, description: "Your report has been downloaded successfully." });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" /> Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-1">Comprehensive reports on programs, impact, and financial transparency</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport("PDF")}>
              <FileText className="h-4 w-4 mr-2" /> Export PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport("CSV")}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Impact Score", value: "94.2%", change: "+5.3%" },
            { label: "Programs Active", value: "24", change: "+3" },
            { label: "Fund Utilization", value: "88%", change: "+2%" },
            { label: "Beneficiary Growth", value: "23%", change: "YoY" },
          ].map((k, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="text-2xl font-display font-bold">{k.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
                <span className="text-xs font-medium text-success flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3" /> {k.change}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Beneficiary Growth by Quarter</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
                  <XAxis dataKey="quarter" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="education" name="Education" fill="hsl(152,60%,36%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="healthcare" name="Healthcare" fill="hsl(210,80%,52%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Donation Trend (₹)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
                  <XAxis dataKey="quarter" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                  <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                  <Area type="monotone" dataKey="donations" stroke="hsl(38,92%,50%)" fill="hsl(38,92%,50%)" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Program Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Program Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-3 font-medium">Program</th>
                    <th className="text-left py-3 font-medium">Beneficiaries</th>
                    <th className="text-left py-3 font-medium">Budget</th>
                    <th className="text-left py-3 font-medium">Utilization</th>
                  </tr>
                </thead>
                <tbody>
                  {programPerformance.map((p, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 font-medium">{p.name}</td>
                      <td className="py-3">{p.beneficiaries.toLocaleString()}</td>
                      <td className="py-3">{p.budget}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${p.utilization}%` }} />
                          </div>
                          <span className="text-xs font-medium w-10">{p.utilization}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Reports;
