
import React from "react";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import RequestForm from "@/components/home/RequestForm";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import ComplianceSection from "@/components/home/ComplianceSection";
import FloatingButton from "@/components/ui/FloatingButton";
import TrustSignals from "@/components/home/TrustSignals";
import Testimonials from "@/components/home/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TrustSignals />
      <Services />
      <Process />
      <Testimonials />
      <RequestForm />
      <AboutSection />
      <ContactSection />
      <ComplianceSection />
      <FloatingButton href="#demande" />
    </div>
  );
};

export default Index;
