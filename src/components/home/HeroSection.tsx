import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="NGO community work"
          className={`w-full h-full object-cover transition-transform duration-[2000ms] ${loaded ? "scale-100" : "scale-110"}`}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>
      <div className="relative container mx-auto px-4 py-28 md:py-40">
        <div className="max-w-2xl space-y-6">
          <span
            className={`inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold backdrop-blur-sm transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Empowering NGOs Digitally
          </span>
          <h1
            className={`text-4xl md:text-6xl font-display font-extrabold leading-tight text-background transition-all duration-700 delay-150 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Transform Social
            <br />
            <span className="text-gradient">Welfare Operations</span>
          </h1>
          <p
            className={`text-lg text-background/80 leading-relaxed max-w-lg transition-all duration-700 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            A unified platform for NGOs in education and healthcare — manage records,
            track donations, coordinate volunteers, and measure impact.
          </p>
          <div
            className={`flex flex-wrap gap-3 transition-all duration-700 delay-[450ms] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
              >
                Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/donations">
              <Button
                size="lg"
                className="bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
              >
                Make a Donation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
