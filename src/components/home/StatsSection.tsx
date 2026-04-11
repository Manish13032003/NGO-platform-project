import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Stethoscope, HandCoins, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useCountUp } from "@/hooks/use-count-up";

const stats = [
  { label: "Students Supported", rawValue: 12400, suffix: "+", icon: GraduationCap },
  { label: "Healthcare Camps", rawValue: 350, suffix: "+", icon: Stethoscope },
  { label: "Donations Raised", prefix: "₹", rawValue: 2.5, suffix: "Cr+", decimal: true, icon: HandCoins },
  { label: "Active Volunteers", rawValue: 1800, suffix: "+", icon: Users },
];

const StatCard = ({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) => {
  const Icon = stat.icon;
  const count = useCountUp(stat.decimal ? 25 : stat.rawValue, 1500, isVisible);
  const display = stat.decimal ? `${stat.prefix || ""}${(count / 10).toFixed(1)}${stat.suffix || ""}` : `${stat.prefix || ""}${count.toLocaleString()}${stat.suffix || ""}`;

  return (
    <Card
      className="glass hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${index * 150}ms`,
      }}
    >
      <CardContent className="p-6 text-center space-y-2">
        <Icon className="h-8 w-8 mx-auto text-primary animate-float" style={{ animationDelay: `${index * 200}ms` }} />
        <div className="text-2xl md:text-3xl font-display font-bold">{display}</div>
        <div className="text-sm text-muted-foreground">{stat.label}</div>
      </CardContent>
    </Card>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="relative -mt-16 z-10" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
