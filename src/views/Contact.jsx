import PageBanner from "@/components/PageBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedNavbar from "@/components/AnimatedNavbar";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <AnimatedNavbar />
      <PageBanner
        title="Contact Us"
        subtitle="Have a project in mind? Let's discuss how we can help your business grow"
        breadcrumb="Contact"
      />
      <ContactSection />
      <Footer />
    </div>
  );
};
export default Contact;
