"use client";

import { motion } from "framer-motion";
import { Building, TestTube, Users, Landmark, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Partners() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const partnerTypes = [
    {
      title: "Hospitals & Clinics",
      desc: "Streamline OPD loads and improve post-discharge compliance. Coordinate scheduled preventive health checkups when home vitals highlight potential concerns, transitioning reactive systems into structured care.",
      icon: Building,
      color: "bg-blue-50 text-blue-500"
    },
    {
      title: "Diagnostic Labs",
      desc: "Deliver interactive diagnostic summaries directly into the patient's dashboard. Help families translate complex laboratory parameters (HbA1c, Lipids, Thyroid) into simple, actionable trends.",
      icon: TestTube,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Insurance Providers",
      desc: "Reward policyholders for maintaining baseline vitals and positive habits. Lower claims loss ratios by shifting focus from critical intervention to early detection.",
      icon: ShieldCheck,
      color: "bg-red-50 text-red-500"
    },
    {
      title: "NGOs & Government",
      desc: "Deploy simplified, low-bandwidth vital screening platforms in Tier 3 cities and rural districts. Empower community health workers with basic digital indicators.",
      icon: Landmark,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">B2B Partnerships</span>
          <motion.h1 
            className="font-heading font-bold text-4xl md:text-5xl text-blue-900 leading-tight"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Partner With India's Preventive Healthcare Ecosystem
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            We collaborate with leading hospital chains, diagnostic groups, insurers, and NGOs to create a unified, prevention-first healthcare framework.
          </motion.p>
        </div>
      </section>

      {/* Grid of partnership models */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerTypes.map((type, idx) => {
              const IconComponent = type.icon;
              return (
                <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-6">
                    <div className={`p-4 rounded-2xl h-fit w-fit ${type.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-slate-800">{type.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{type.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Middle Row detailing integration values */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading font-bold text-3xl text-blue-900 leading-tight">
                Secure, Modular API Integrations
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  SUMINO integrates with existing clinical portals and LIMS (Laboratory Information Management Systems). We offer standard webhook endpoints and secure FHIR-compliant API structures to allow seamless data syncing.
                </p>
                <p>
                  All integration patterns place patient consent at the core. Patient records are only shared when authorized, maintaining absolute transparency and DPDP compliance.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-lg">Platform Integration Benefits:</h3>
              <ul className="space-y-3 text-sm text-slate-500">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span><strong>Zero System Overhead</strong>: Light, responsive endpoints that require no core system replacements.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span><strong>Clean Patient Mapping</strong>: Automated report decoding that translates variables into visual history.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span><strong>Verified Security Framework</strong>: Continuous encryption, sandboxed data environments, and API authentication tokens.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Partnership CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-heading font-bold text-3xl text-blue-900">Explore Partnership Opportunities</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Get in touch with our B2B partnership team. Let us know your organization type and integration goals, and we will schedule a clinical briefing.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?category=Partnerships"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
            >
              Inquire About Partnering
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
