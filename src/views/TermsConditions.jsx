import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
const TermsConditions = () => {
    return (<div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner title="Terms & Conditions" subtitle="Please read these terms and conditions carefully before using Dharam Vir Infotech services." breadcrumb="Terms & Conditions"/>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl prose prose-slate dark:prose-invert">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">1. Agreement to Terms</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            These Terms and Conditions constitute a legally binding agreement made between you and Dharam Vir Infotech concerning your access to and use of our website and services.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary mb-4">2. Intellectual Property Rights</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Unless otherwise indicated, the Site and Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics are owned or controlled by us.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary mb-4">3. Client Work Ownership</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Upon full payment of agreed fees, all custom software, code, deliverables, and intellectual property developed for client projects become the sole property of the client.
          </p>
        </div>
      </section>

      <Footer />
    </div>);
};
export default TermsConditions;
