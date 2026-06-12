"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Database, 
  Smartphone, 
  Activity, 
  Brain, 
  Heart, 
  RotateCcw,
  ArrowRight,
  GitBranch
} from "lucide-react";
import Link from "next/link";

export default function Solution() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const steps = [
    {
      title: "1. Vitals Sync & Home Logs",
      desc: "Caregivers log simple parameters like resting heart rate, hydration, blood pressure, sleep cycles, and daily complaints."
    },
    {
      title: "2. Longitudinal Trend Mapping",
      desc: "Our database maps these values over weeks, establishing a personalized health baseline rather than an arbitrary threshold."
    },
    {
      title: "3. Multi-Variable Risk Analysis",
      desc: "Algorithms evaluate combined shifts (e.g., lower sleep efficiency + elevated pulse) referencing clinical screening guidelines."
    },
    {
      title: "4. Preventive Nudge Alerts",
      desc: "If indicators show persistent deviations, the system issues advisory warnings and guides families to seek early checkups."
    },
    {
      title: "5. Clinical GP Integration",
      desc: "When visiting the doctor, caregivers export a clean vital timeline, giving the doctor instant clinical context."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">How We Do It</span>
          <motion.h1 
            className="font-heading font-bold text-4xl md:text-5xl text-blue-900 leading-tight"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            A Clinical-Grade Prevention Framework at Your Fingertips
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            Discover the core intelligence layer that continuously monitors family health parameters to flag warning signs before emergencies develop.
          </motion.p>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-heading font-bold text-3xl text-blue-900">The Prevention Pipeline</h2>
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
              How data is securely collected, analyzed, and transformed into clinical action inside the SUMINO platform.
            </p>
          </div>

          <div className="relative border-l border-blue-100 ml-4 md:ml-32 space-y-12">
            {steps.map((st, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                <div className="absolute -left-3.5 top-0.5 bg-blue-500 h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold ring-4 ring-white">
                  {idx + 1}
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-lg text-slate-800">{st.title}</h3>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Foundations Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">System Architecture</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-blue-900">
              Built on Science, Protected by Bank-Grade Security
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              SUMINO combines non-invasive interfaces with complex risk processing engines, maintaining strict ethical data bounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl h-fit w-fit">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-800">Home Indicators Sync</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Connect and log daily vitals—such as pulse variance, sleeping efficiency, fluid balance, and physical complaints. By tracking changes relative to a user's normal levels, the system identifies anomalies early.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-6">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-xl h-fit w-fit">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-800">AI Risk Scoring</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Instead of checking numbers in isolation, our AI engine checks how they interact. Vitals are cross-referenced with peer-reviewed medical criteria to flag risk trends without diagnostic claims.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-6">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl h-fit w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-800">Data Vault Standards</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Patient records are locked behind AES-256 encryption at rest and TLS 1.3 in transit. We strictly observe DPDP guidelines and enforce data sandboxing, ensuring you retain full ownership of your records.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Ethical Commitment Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-50 text-blue-500">
            <GitBranch className="h-10 w-10" />
          </div>
          <h2 className="font-heading font-bold text-3xl text-blue-900">Our Ethical AI Commitment</h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            "We believe that AI in healthcare should serve as a supportive context builder, not a diagnostic black-box. Every advisory warning generated by SUMINO is transparent, explainable, and linked directly to peer-reviewed clinical guidelines, keeping your general physician in complete clinical control."
          </p>
          <div className="pt-4">
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
            >
              Secure Early Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
