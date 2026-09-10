import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
const PrivacyPolicy = () => {
    return (<div className="min-h-screen bg-background">
      <Navbar />
      <PageBanner title="Privacy Policy" subtitle="Your privacy is important to us. Learn how Dharam Vir Infotech collects, protects, and handles your data." breadcrumb="Privacy Policy"/>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl prose prose-slate dark:prose-invert">
          <h2 className="font-display text-2xl font-bold text-primary mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We collect personal information that you voluntarily provide to us when expressing interest in obtaining information about us or our products and services, when participating in activities on the Website or contacting us.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We use personal information collected via our website for business purposes described below: to facilitate account creation, deliver services, send administrative information, protect our services, and respond to user inquiries.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary mb-4">3. Data Protection & Security</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process.
          </p>
        </div>
      </section>

      <Footer />
    </div>);
};
export default PrivacyPolicy;
