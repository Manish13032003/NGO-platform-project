import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Stethoscope, HandCoins, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    title: "Education Programs",
    desc: "Manage student records, scholarships, attendance, and academic progress tracking across multiple centers.",
    icon: GraduationCap,
    link: "/education",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Healthcare Services",
    desc: "Track patient records, health camp schedules, medical supplies, and treatment outcomes efficiently.",
    icon: Stethoscope,
    link: "/healthcare",
    color: "bg-info/10 text-info",
  },
  {
    title: "Donation Management",
    desc: "Transparent donation tracking with real-time impact reports. Every rupee accounted for.",
    icon: HandCoins,
    link: "/donations",
    color: "bg-warm/10 text-warm",
  },
  {
    title: "Volunteer Network",
    desc: "Coordinate volunteers, assign tasks, track hours, and recognize contributions across programs.",
    icon: Users,
    link: "/volunteers",
    color: "bg-success/10 text-success",
  },
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className="text-center max-w-2xl mx-auto mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Everything Your NGO Needs
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive modules designed to streamline operations across education,
            healthcare, donations, and volunteer management.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link to={f.link} key={i}>
                <Card
                  className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group border-border/50"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(40px)",
                    transition: `all 0.6s ease-out ${200 + i * 150}ms`,
                  }}
                >
                  <CardContent className="p-8 flex gap-5">
                    <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${f.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
