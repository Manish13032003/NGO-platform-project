import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-sidebar text-sidebar-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            NGOConnect
          </div>
          <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
            A digital platform empowering NGOs in education and healthcare to operate
            transparently and efficiently.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/70">
            {["Education", "Healthcare", "Donations", "Volunteers"].map((l) => (
              <li key={l}>
                <Link to={`/${l.toLowerCase()}`} className="hover:text-primary transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/70">
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link to="/reports" className="hover:text-primary transition-colors">Reports</Link></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-sidebar-foreground/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@ngoconnect.org</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> New Delhi, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sidebar-border mt-12 pt-6 text-center text-sm text-sidebar-foreground/50">
        © {new Date().getFullYear()} NGOConnect. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
