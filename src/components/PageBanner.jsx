import { Link } from "@/lib/router-compat";
import heroBg from "@/assets/hero-bg.jpg";
const PageBanner = ({ title, subtitle, breadcrumb }) => {
    return (<section className="relative py-20 md:py-28 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }}/>
      <div className="absolute inset-0 bg-primary/85"/>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up">
          {title}
        </h1>
        {subtitle && (<p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-4 animate-fade-in-up-delay-1">
            {subtitle}
          </p>)}
        {breadcrumb && (<p className="text-primary-foreground/60 text-sm animate-fade-in-up-delay-2">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-accent">{breadcrumb}</span>
          </p>)}
      </div>
    </section>);
};
export default PageBanner;
