import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import AnimatedNavbar from "@/components/AnimatedNavbar";
const blogPosts = [
  {
    id: 1,
    title: "10 Reasons Why React.js is the Top Choice for Enterprise Web Apps in 2026",
    excerpt: "Discover why tech giants and modern startups prefer React.js for building scalable, high-performance web applications.",
    date: "Sep 05, 2026",
    author: "Tech Team",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Building Next-Gen AI Applications with OpenAI and Custom Vector Databases",
    excerpt: "A comprehensive guide on integrating AI chatbots and predictive models into enterprise software architectures.",
    date: "Aug 28, 2026",
    author: "AI Research Group",
    category: "AI & ML",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Modern Mobile App Development with Flutter",
    excerpt: "Learn how cross-platform development with Flutter can cut app development costs by 40% without compromising performance.",
    date: "Aug 15, 2026",
    author: "Mobile Lead",
    category: "Mobile Apps",
  },
];
const Blog = () => {
  return (
    <div className="min-h-screen bg-backgrounds bg-gradient-to-br from-[#f6f9fc] via-[#edf2f8] to-[#f8fafc] ">
      <AnimatedNavbar />
      <AnimatedNavbar />

      <PageBanner title="Latest Insights & Tech Blogs" subtitle="Stay updated with industry trends, expert insights, tech news, and software development guides." breadcrumb="Blog" />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (<article key={post.id} className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="bg-accent/10 text-accent font-semibold px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary hover:text-accent transition-colors mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-border/50 flex items-center justify-between mt-auto">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <User size={12} /> {post.author}
                </span>
                <Link to="/contact" className="text-xs font-semibold text-accent hover:underline flex items-center gap-1">
                  Read More <ArrowRight size={12} />
                </Link>
              </div>
            </article>))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>);
};
export default Blog;
