"use client";

import { motion } from "framer-motion";
import { Users, Heart, ShieldAlert, Sparkles, HeartHandshake } from "lucide-react";

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const values = [
    {
      title: "Family First",
      desc: "Every tool we build must be simple enough for a grandparent to use and valuable enough for a parent to rely on. We build for the household.",
      icon: Users
    },
    {
      title: "Scientific Integrity",
      desc: "We map all warnings and indicators to peer-reviewed clinical evidence. We avoid health fads, focusing strictly on validated wellness parameters.",
      icon: Heart
    },
    {
      title: "Transparency & Privacy",
      desc: "We protect health metrics as a sacred trust. You own your data; SUMINO acts strictly as its secure custodian, compliant with the DPDP Act.",
      icon: ShieldAlert
    },
    {
      title: "Empowerment",
      desc: "We replace medical anxiety with positive understanding. Our platform guides you through clear, actionable steps to improve wellness indicators.",
      icon: Sparkles
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.h1 
            className="font-heading font-bold text-4xl md:text-5xl text-blue-900 leading-tight"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Re-imagining Healthcare From the Home Up
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            SUMINO is on a mission to build India's most trusted family health prevention platform, helping households identify risks before they become emergencies.
          </motion.p>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Callout */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
                <HeartHandshake className="h-16 w-16 text-blue-500 animate-pulse" />
                <span className="font-heading font-bold text-blue-900 text-lg">Prevention Starts at Home</span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  "By catching warning signs 3 weeks early, we can protect our families and avoid reactive hospital stress."
                </p>
              </div>
            </div>

            {/* Founder Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">Why We Exist</span>
              <h2 className="font-heading font-bold text-3xl text-blue-900">
                The SUMINO Story
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  In 2019, our founder experienced a devastating loss when their father passed away due to a brain hemorrhage brought on by undetected high blood pressure. In the years that followed, they witnessed close family members and friends leave this world suddenly due to heart attacks and brain strokes, while others suffered life-altering paralysis from cardiovascular complications.
                </p>
                <p>
                  These losses weren't sudden, unpreventable accidents—they were the consequence of silent progression. Warning signs were missed because families lacked simple, accessible tools to monitor daily vital trends and connect them with timely clinical support.
                </p>
                <p>
                  SUMINO was founded so that no family has to suffer the preventable loss of a loved one. We believe that by bringing actionable health indicators directly into the household, we can protect families and stop emergencies before they start.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision cards */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="glass-card p-10 rounded-3xl space-y-4">
              <h3 className="font-heading font-bold text-2xl text-blue-900">Our Mission</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                To reduce preventable health emergencies and improve family health outcomes through proactive healthcare monitoring, early warning systems, AI-powered risk assessment, family engagement, and preventive healthcare intelligence.
              </p>
            </div>

            <div className="glass-card p-10 rounded-3xl space-y-4">
              <h3 className="font-heading font-bold text-2xl text-blue-900">Our Vision</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                To become India's most trusted family health prevention platform, helping millions of families identify health risks before they become medical emergencies, creating a healthier, proactive society.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">Our Culture</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-blue-900">
              Values That Drive Us
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              The fundamental principles that guide our product design, engineering choices, and clinical partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {values.map((val, i) => {
              const IconComponent = val.icon;
              return (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-xl h-fit w-fit">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-800">{val.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
