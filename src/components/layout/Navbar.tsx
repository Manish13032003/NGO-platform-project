import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Education", path: "/education" },
  { label: "Healthcare", path: "/healthcare" },
  { label: "Donations", path: "/donations" },
  { label: "Volunteers", path: "/volunteers" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "glass"}`}>
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl group">
          <Heart className="h-6 w-6 text-primary fill-primary group-hover:scale-110 transition-transform duration-300" />
          <span className="text-gradient">NGOConnect</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/login">
            <Button size="sm" className="bg-hero-gradient text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-300 animate-pulse-glow">Log In</Button>
          </Link>
          <Link to="/donations">
            <Button size="sm" className="bg-hero-gradient text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-300 animate-pulse-glow">Donate Now</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className="relative w-5 h-5">
            <Menu className={`h-5 w-5 absolute transition-all duration-300 ${open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
            <X className={`h-5 w-5 absolute transition-all duration-300 ${open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-border bg-card overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              }`}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-3">
          <Link to="/login" className="flex-1">
            <Button className="w-full bg-hero-gradient text-primary-foreground animate-pulse-glow" size="sm">Log In</Button>
          </Link>
          <Link to="/donations" className="flex-1">
            <Button className="w-full bg-hero-gradient text-primary-foreground animate-pulse-glow" size="sm">Donate</Button>
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
