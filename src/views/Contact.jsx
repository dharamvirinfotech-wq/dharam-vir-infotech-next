import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
const Contact = () => {
    return (<div className="min-h-screen">
      <Navbar />
      <PageBanner title="Contact Us" subtitle="Have a project in mind? Let's discuss how we can help your business grow" breadcrumb="Contact"/>
      <ContactSection />
      <Footer />
    </div>);
};
export default Contact;
