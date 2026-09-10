import { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Link } from "@/lib/router-compat";
import { Download, ShoppingCart, Check, Star, Monitor, CreditCard, ChevronDown, ArrowRight, } from "lucide-react";
const SoftwareProductTemplate = ({ data }) => {
    const [openFaq, setOpenFaq] = useState(0);
    const { brand, productName, tagline, description, version, rating, reviewCount, highlights, ProductIcon, features, steps, requirements, supportedFormats, faqs, reviews, downloadHref = "#", buyHref = "#", seoTitle, seoDescription, path, ogImage, } = data;
    const SITE = "https://dharmvir-spark.lovable.app";
    const productUrl = `${SITE}${path}`;
    const productImage = ogImage ? `${SITE}${ogImage}` : undefined;
    const reviewCountNumber = parseInt(String(reviewCount).replace(/[^0-9]/g, ""), 10) || reviews.length || 1;
    const productLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: productName,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows",
        description,
        softwareVersion: version,
        url: productUrl,
        ...(productImage && { image: productImage }),
        brand: { "@type": "Brand", name: brand },
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: productUrl,
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            reviewCount: reviewCountNumber,
            bestRating: 5,
            worstRating: 1,
        },
        review: reviews.map((r) => ({
            "@type": "Review",
            name: r.title || `${r.name}'s Review`,
            author: { "@type": "Person", name: r.name },
            datePublished: r.date,
            reviewBody: r.quote,
            reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating ?? rating,
                bestRating: 5,
                worstRating: 1,
            },
        })),
    };
    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };
    return (
      <div className="min-h-screen bg-background">
        <Seo title={seoTitle} description={seoDescription} path={path} image={ogImage}/>
        <Head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        </Head>
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[#0a1530] text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)/0.15),transparent_50%)]"/>
        <div className="container mx-auto px-4 py-16 md:py-24 relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider mb-6">
              <Download size={12}/> {brand}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {productName}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-5">
              {tagline}
            </p>
            <p className="text-primary-foreground/70 mb-8 max-w-xl leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a href={downloadHref} className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3.5 rounded-lg transition-colors">
                <Download size={18}/> Free Download
              </a>
              <a href={buyHref} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors">
                Buy Now <ArrowRight size={18}/>
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
              <span className="inline-flex items-center gap-1.5"><Check size={16} className="text-green-400"/> Free trial available</span>
              <span className="inline-flex items-center gap-1.5"><CreditCard size={16} className="text-green-400"/> No credit card required</span>
              <span className="inline-flex items-center gap-1.5"><Monitor size={16} className="text-primary-foreground/60"/> Windows only</span>
            </div>
          </div>

          {/* Product card */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
            <div className="bg-white/95 text-foreground rounded-xl p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <ProductIcon className="text-accent" size={28}/>
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg leading-tight">{productName}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{version} — Latest</p>
                </div>
              </div>
              <ul className="space-y-2.5 mb-5">
                {highlights.map((h) => (<li key={h} className="flex items-center gap-2 text-sm text-foreground">
                    <Check size={16} className="text-accent flex-shrink-0"/> {h}
                  </li>))}
              </ul>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={16} className={i < Math.round(rating) ? "fill-accent text-accent" : "text-muted"}/>))}
                </div>
                <span className="text-sm font-semibold text-foreground">{rating}/5</span>
                <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Features</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Why Choose {productName}?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (<div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/40 transition-all">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <f.icon className="text-accent" size={20}/>
                </div>
                <h3 className="font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">How It Works</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              {steps.length} Simple Steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((s, i) => (<div key={s.title} className="relative">
                <div className="text-6xl font-display font-bold text-accent/20 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-bold text-primary text-xl mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* COMPATIBILITY */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 max-w-5xl">
          <div>
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Compatibility</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-5">
              System Requirements
            </h2>
            <ul className="space-y-2.5">
              {requirements.map((r) => (<li key={r} className="flex items-start gap-2 text-foreground">
                  <Check size={18} className="text-accent flex-shrink-0 mt-0.5"/>
                  <span className="text-sm">{r}</span>
                </li>))}
            </ul>
          </div>
          <div>
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Supported Formats</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-5">
              Works With
            </h2>
            <div className="flex flex-wrap gap-2">
              {supportedFormats.map((fmt) => (<span key={fmt} className="px-4 py-2 bg-card border border-border rounded-lg font-semibold text-primary text-sm">
                  {fmt}
                </span>))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">FAQ</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (<div key={f.q} className="border border-border rounded-xl bg-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-primary hover:bg-muted/50 transition-colors">
                  <span>{f.q}</span>
                  <ChevronDown size={20} className={`text-accent flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}/>
                </button>
                {openFaq === i && (<div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {f.a}
                  </div>)}
              </div>))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Reviews</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
              Loved by Professionals Worldwide
            </h2>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={16} className="fill-accent text-accent"/>))}
              </div>
              <span className="font-semibold text-foreground">{rating}/5</span>
              <span>· {reviewCount} verified reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r) => (<div key={r.name} className="bg-card border border-border rounded-xl p-6 flex flex-col">
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={14} className="fill-accent text-accent"/>))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5 flex-1">"{r.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </div>))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-[#0a1530] text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Download {productName} free trial today. No credit card required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={downloadHref} className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-7 py-3.5 rounded-lg transition-colors">
              <Download size={18}/> Free Download
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors">
              <ShoppingCart size={18}/> Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>);
};
export default SoftwareProductTemplate;
