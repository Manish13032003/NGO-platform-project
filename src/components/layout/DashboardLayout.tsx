import { Link, useLocation, Outlet } from "react-router-dom";
import { Heart, LayoutDashboard, GraduationCap, Stethoscope, HandCoins, Users, BarChart3, LogOut } from "lucide-react";

const sidebarLinks = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Education", path: "/dashboard/education", icon: GraduationCap },
  { label: "Healthcare", path: "/dashboard/healthcare", icon: Stethoscope },
  { label: "Donations", path: "/dashboard/donations", icon: HandCoins },
  { label: "Volunteers", path: "/dashboard/volunteers", icon: Users },
  { label: "Reports", path: "/dashboard/reports", icon: BarChart3 },
];

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="p-5 flex items-center gap-2 font-display font-bold text-lg">
          <Heart className="h-5 w-5 text-primary fill-primary" />
          NGOConnect
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      <main className="flex-1 bg-background overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
