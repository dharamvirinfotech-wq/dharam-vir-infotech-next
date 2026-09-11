import { useState, useEffect } from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import { Link } from "@/lib/router-compat";
import { Star, Briefcase, Award, MapPin, Search, ArrowRight, Loader2, Code2 } from "lucide-react";
import { developersApi } from "@/lib/api";

const DevelopersList = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    developersApi
      .list()
      .then((res) => {
        setDevelopers(res.developers || []);
      })
      .catch((err) => {
        console.error("Failed to load developers:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const roles = ["all", ...new Set(developers.map((d) => d.role).filter(Boolean))];

  const filtered = developers.filter((d) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      d.name.toLowerCase().includes(q) ||
      d.role.toLowerCase().includes(q) ||
      (Array.isArray(d.skills) ? d.skills.join(" ") : "").toLowerCase().includes(q);

    const matchesRole = selectedRole === "all" || d.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-background">
      <AnimatedNavbar />
      <PageBanner
        title="Our Expert Developers"
        subtitle="Meet our world-class engineering team delivering high-impact digital solutions."
        breadcrumb="Home / Developers"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search by name, skill, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`text-xs capitalize font-medium px-3.5 py-2 rounded-lg transition-all border ${
                    selectedRole === r
                      ? "bg-accent text-accent-foreground border-accent shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-accent/40"
                  }`}
                >
                  {r === "all" ? "All Roles" : r}
                </button>
              ))}
            </div>
          </div>

          {/* Developers Grid */}
          {loading ? (
            <div className="py-24 flex items-center justify-center">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-border rounded-2xl p-8 bg-card/50">
              <Code2 className="mx-auto text-muted-foreground mb-3" size={40} />
              <h3 className="text-lg font-bold text-primary mb-1">No Developers Found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search query or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dev) => (
                <div
                  key={dev.id || dev.slug}
                  className="group bg-card border border-border hover:border-accent/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={dev.image || dev.avatar || "/images/team-placeholder.jpg"}
                        alt={dev.name}
                        className="w-16 h-16 rounded-xl object-cover border border-border group-hover:border-accent transition-colors"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-lg font-bold text-primary truncate group-hover:text-accent transition-colors">
                            {dev.name}
                          </h3>
                          {dev.rating && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-accent/10 text-accent px-2 py-0.5 rounded-full shrink-0">
                              <Star size={12} className="fill-accent" /> {dev.rating}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">{dev.role}</p>
                        {dev.location && (
                          <p className="text-xs text-muted-foreground/80 flex items-center gap-1 mt-1">
                            <MapPin size={12} /> {dev.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                      {dev.bio || "Full stack developer committed to delivering high-performance scalable software."}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(Array.isArray(dev.skills) ? dev.skills : []).slice(0, 4).map((s, i) => (
                        <span
                          key={i}
                          className="bg-primary/5 text-primary border border-border/80 text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                        >
                          {s}
                        </span>
                      ))}
                      {(dev.skills || []).length > 4 && (
                        <span className="text-[10px] text-muted-foreground px-1 py-0.5">
                          +{dev.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Briefcase size={13} /> {dev.experience || "3+ yrs"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award size={13} /> {dev.projectsCompleted || 0} Projects
                      </span>
                    </div>

                    <Link
                      to={`/developer/${dev.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:translate-x-0.5 transition-transform"
                    >
                      View Profile <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DevelopersList;
