
import React from "react";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import RequestForm from "@/components/home/RequestForm";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import ComplianceSection from "@/components/home/ComplianceSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Process />
      <RequestForm />
      <AboutSection />
      <ContactSection />
      <ComplianceSection />
    </div>
  );
};

export default Index;
