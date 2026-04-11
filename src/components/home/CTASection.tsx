import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className="bg-hero-gradient rounded-3xl p-12 md:p-16 text-center text-primary-foreground transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.95)",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Digitize Your NGO?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of organizations using NGOConnect to increase transparency,
            efficiency, and impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-hero-gradient text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
