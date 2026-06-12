"use client";

import { motion } from "framer-motion";
import { Users, Heart, Shield, ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";

export default function Families() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const sections = [
    {
      title: "Elderly Care & Support",
      desc: "Proactively monitor aging parents or grandparents. Spot signs of dehydration, cardiac fatigue, or sleep disruptions from a distance. Get clear indicators when they need attention, even if you live in another city.",
      icon: Heart,
      color: "bg-red-50 text-red-500"
    },
    {
      title: "Child Growth & Wellness",
      desc: "Track critical development milestones, height/weight ratios, vaccine calendars, and daily indicators. Flag minor anomalies before they progress to acute pediatric checkups.",
      icon: Users,
      color: "bg-blue-50 text-blue-500"
    },
    {
      title: "Chronic Condition Tracking",
      desc: "Provide active daily support for family members managing pre-diabetes, hypertension, thyroid issues, or cardiac recovery. Maintain vital parameters alongside diet log tracking.",
      icon: UserCheck,
      color: "bg-green-50 text-green-600"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">For Households</span>
          <motion.h1 
            className="font-heading font-bold text-4xl md:text-5xl text-blue-900 leading-tight"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Complete Peace of Mind for Your Loved Ones
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            Bring clinical-grade health indicators into the home. Easily protect parents, children, and spouses in one unified family wellness vault.
          </motion.p>
        </div>
      </section>

      {/* Main Focus Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((sec, idx) => {
              const IconComponent = sec.icon;
              return (
                <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-6">
                    <div className={`p-4 rounded-2xl h-fit w-fit ${sec.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-slate-800">{sec.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{sec.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Middle Info Row */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading font-bold text-3xl text-blue-900 leading-tight">
                Designed for Daily Living, Built to Create Trust
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  We know that keeping tabs on your family's health can feel overwhelming. That is why SUMINO focuses on simplicity. No complex technical jargon, no clinical coldness. Just straightforward indicators that help you take action.
                </p>
                <p>
                  Whether it's checking if your grandfather took his resting vitals, tracking your child's sleep baseline, or building simple hydration habits, SUMINO is here to protect your household.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-lg">Why Families Choose SUMINO:</h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5 text-sm text-slate-500 leading-relaxed">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong>100% Secure</strong>: Health metrics are encrypted under strict sandboxes. We never share data with advertisers.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-slate-500 leading-relaxed">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong>GP-Ready Outputs</strong>: Export clean, chronological PDF charts to share directly during your next regular checkup.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-slate-500 leading-relaxed">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Continuous Peace of Mind</strong>: Catch minor indicators before they turn into late-night hospital runs.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-heading font-bold text-3xl text-blue-900">Protect Your Family's Health Future</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Join the waitlist to secure early beta access in your region. Complimentary family onboarding consultations included.
          </p>
          <div className="pt-2">
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
            >
              Join the Families Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
