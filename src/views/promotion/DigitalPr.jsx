import PromotionServiceTemplate from "@/components/PromotionServiceTemplate";
import { Newspaper, Target, BarChart3, Settings, Users, Shield } from "lucide-react";
const DigitalPr = () => (<PromotionServiceTemplate title="Digital PR Services" subtitle="Earn media coverage and build brand credibility through digital PR." breadcrumb="Digital PR Services" features={[
        { icon: Newspaper, title: "Strategy Development", desc: "Custom strategies tailored to your business goals and target audience." },
        { icon: Target, title: "Performance Tracking", desc: "Real-time analytics and reporting to measure campaign effectiveness." },
        { icon: BarChart3, title: "Data-Driven Insights", desc: "Leverage data analytics to make informed marketing decisions." },
        { icon: Settings, title: "Continuous Optimization", desc: "Data-driven improvements to maximize your ROI over time." },
        { icon: Users, title: "Expert Team", desc: "Dedicated specialists with years of industry experience." },
        { icon: Shield, title: "Transparent Reporting", desc: "Clear, detailed reports on all activities and results." },
    ]} benefits={[
        "Proven track record of delivering results",
        "Customized strategies for your industry",
        "Transparent pricing with no hidden fees",
        "Dedicated account manager",
        "Regular performance reports",
        "24/7 support and communication",
        "Latest tools and technologies",
        "Scalable solutions that grow with you",
    ]} process={[
        { step: "1", title: "Discovery", desc: "Understand your goals and audit current performance" },
        { step: "2", title: "Strategy", desc: "Develop a data-driven action plan" },
        { step: "3", title: "Execution", desc: "Implement campaigns with precision" },
        { step: "4", title: "Optimize", desc: "Continuously refine for maximum results" },
    ]}/>);
export default DigitalPr;
