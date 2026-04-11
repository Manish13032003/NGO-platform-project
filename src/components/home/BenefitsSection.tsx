import { BarChart3, Globe, ShieldCheck, TrendingUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const benefits = [
  { title: "Real-Time Analytics", desc: "Data-driven insights at your fingertips", icon: BarChart3 },
  { title: "Global Reach", desc: "Connect with donors and volunteers worldwide", icon: Globe },
  { title: "Secure & Private", desc: "Enterprise-grade data protection", icon: ShieldCheck },
  { title: "Measurable Impact", desc: "Track every outcome transparently", icon: TrendingUp },
];

const BenefitsSection = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section className="py-24 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-display font-bold text-center mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          Why Choose NGOConnect?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="text-center space-y-3 group cursor-default"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.6s ease-out ${i * 150}ms`,
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-hero-gradient flex items-center justify-center mx-auto group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
