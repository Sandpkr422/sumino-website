"use client";

import { motion } from "framer-motion";
import { TrendingUp, Landmark, LandmarkIcon, Lightbulb, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

export default function Investors() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const indicators = [
    {
      title: "$45B+ Annual Market size",
      desc: "Over 65% of healthcare spending in India is out-of-pocket, with sudden acute emergencies pushing millions of middle-class households into debt annually.",
      icon: Landmark
    },
    {
      title: "15% Prevention CAGR",
      desc: "Rising digital health awareness, mobile accessibility in Tier 2/3 cities, and proactive wellness trends are driving exponential demand for prevention platforms.",
      icon: TrendingUp
    },
    {
      title: "Software Scalability",
      desc: "SUMINO scales rapidly without the capital expenditure of building physical hospitals or diagnostic centers, functioning as the digital prevention infrastructure layer.",
      icon: Lightbulb
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">Investment & Growth</span>
          <motion.h1 
            className="font-heading font-bold text-4xl md:text-5xl text-blue-900 leading-tight"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Seizing the Prevention Economy Opportunity
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            India's healthcare model is shifting from reactive emergency treatment to home-based proactive monitoring. Partner with us to scale category-defining infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Market sizing grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {indicators.map((ind, idx) => {
              const IconComponent = ind.icon;
              return (
                <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl h-fit w-fit">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-slate-800">{ind.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Prevention Paradigm Shift */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading font-bold text-3xl text-blue-900 leading-tight">
                Capital Light, Highly Scalable Prevention Infrastructure
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  By creating a unified home health database, SUMINO maps continuous vital indicators that are currently lost. This continuous profiling generates highly valuable preventive insights, reducing hospital readmissions and optimizing clinic loads.
                </p>
                <p>
                  Our software platform integrates families with their chosen general practitioners and diagnostics labs, establishing a highly sticky B2B2C framework. This creates multiple engagement channels through subscription models, partnership integrations, and B2B corporate plans.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-lg">Investment Core Metrics:</h3>
              <ul className="space-y-3.5 text-sm text-slate-500">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span><strong>$45B+ India Market size</strong>: Massive headroom for digital prevention layers.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span><strong>Zero CapEx Asset Model</strong>: Pure SaaS and dashboard licensing structure.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span><strong>Experienced Leadership</strong>: Architected by seasoned tech executives and healthcare advisors.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Request Deck CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-heading font-bold text-3xl text-blue-900">Request Our Investor Presentation</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Review our seed-funding documents, cohort metrics, and market scaling maps. Inquire below to connect with our Investor Relations team.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?category=Investors"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
            >
              Request Investor Deck
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
