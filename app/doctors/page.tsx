"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, ClipboardList, Stethoscope, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Doctors() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const benefits = [
    {
      title: "Longitudinal Patient Baselines",
      desc: "Access months of clean, structured home vitals (resting pulse, sleeping indicators, daily complaints) in under 30 seconds before your patient sits down.",
      icon: Activity
    },
    {
      title: "Proactive Risk Flags",
      desc: "Receive summarized indicators flagging persistent vital changes. Catch cardiorespiratory fatigue or glycemic changes early, prompting structured checkups.",
      icon: ClipboardList
    },
    {
      title: "Ethical Integration Boundary",
      desc: "SUMINO does not make clinical diagnoses or interfere with prescriptions. We amplify information to support your clinical decisions.",
      icon: Stethoscope
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">For Physicians</span>
          <motion.h1 
            className="font-heading font-bold text-4xl md:text-5xl text-blue-900 leading-tight"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Move From Reactive Treatment to Proactive Care
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            Empower your practice with clean, patient-authorized home health timelines. Turn clinical consultations into data-backed preventive interventions.
          </motion.p>
        </div>
      </section>

      {/* Main Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((ben, idx) => {
              const IconComponent = ben.icon;
              return (
                <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl h-fit w-fit">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-slate-800">{ben.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{ben.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Standards Detail */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading font-bold text-3xl text-blue-900 leading-tight">
                Designed to Match Your Clinical Workflow
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  We understand that doctors are overloaded with busy OPD clinics. That is why SUMINO does not send clinical alerts for acute issues, nor do we clutter your inbox with raw sensor data.
                </p>
                <p>
                  Instead, our system translates weeks of home tracking into formatted, longitudinal summaries. When patients authorize access, their home records render cleanly in your dashboard, giving you critical context to optimize treatment plans.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm space-y-6">
              <h3 className="font-heading font-bold text-slate-800 text-lg">Our Clinical Trust Guarantee:</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-500">
                    <strong>100% Patient Consent</strong>: Patients control who sees their records. You only view data shared explicitly with your clinic.
                  </p>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-500">
                    <strong>DPDP & HIPAA Aligned</strong>: Built using standard security encryption protocols, protecting sensitive medical variables.
                  </p>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-500">
                    <strong>Clinical Guidelines Only</strong>: Analytics algorithms trace directly to guidelines from WHO and ICMR.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Onboard Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-heading font-bold text-3xl text-blue-900">Join the SUMINO Doctors Panel</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Partner with us to provide data-backed preventive care to your patients. Register below to receive our physician integration guide and clinical dashboard details.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?category=Doctors"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
            >
              Inquire About Joining Doctor Panel
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
