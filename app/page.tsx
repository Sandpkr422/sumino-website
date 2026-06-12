"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Activity, 
  UserCheck, 
  ArrowRight, 
  AlertTriangle, 
  Database,
  Heart,
  Users,
  Building,
  Smartphone,
  Eye,
  Bell,
  LineChart,
  UserPlus
} from "lucide-react";
import Accordion from "@/components/ui/Accordion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"families" | "doctors" | "providers" | "communities">("families");

  // Animations configuration
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const steps = [
    {
      num: "01",
      title: "Understand Family Health",
      desc: "Create secure profiles for grandparents, parents, and kids. Establish baseline patterns for sleep, heart rate, nutrition, and daily energy.",
      icon: Users
    },
    {
      num: "02",
      title: "Identify Risk Factors",
      desc: "Our analytics engine maps daily indicators, cross-referencing against standard guidelines to notice slow, progressive risk patterns.",
      icon: Eye
    },
    {
      num: "03",
      title: "Receive Guidance",
      desc: "Get personalized, clinically backed wellness tips and warning alerts tailored to your family's health indicators.",
      icon: Bell
    },
    {
      num: "04",
      title: "Take Action Early",
      desc: "Use warnings to coordinate minor preventive GP checkups or basic diagnostics before issues progress to critical levels.",
      icon: UserCheck
    },
    {
      num: "05",
      title: "Improve Outcomes",
      desc: "Maintain a clear longitudinal chart of your home health parameters, giving your family doctor the data needed to treat you better.",
      icon: LineChart
    }
  ];

  const benefits = {
    families: {
      title: "For Families",
      points: [
        "Complete peace of mind knowing your aging parents are protected, even from a distance.",
        "Track developmental milestones and daily habits for your children.",
        "Spot minor vital deviations before they escalate into hospital admissions.",
        "Simple checklists and healthy routines designed for the whole household."
      ],
      cta: "Protect Your Family",
      link: "/families"
    },
    doctors: {
      title: "For Doctors",
      points: [
        "Gain hours of longitudinal context with pre-summarized home vitals charts.",
        "Receive risk alerts to prompt patient follow-ups for preventive checks.",
        "Improve patient lifestyle compliance with shared digital tracking checklists.",
        "Enable data-backed clinical consultations instead of reactive diagnoses."
      ],
      cta: "Join Doctors Panel",
      link: "/doctors"
    },
    providers: {
      title: "For Healthcare Providers",
      points: [
        "Coordinate structured preventive checkups rather than crowded emergency queues.",
        "Deliver interactive, clear diagnostic summaries straight to patient dashboards.",
        "Improve client trust with data transparency and ethical AI principles.",
        "Integrate clinic scheduling systems with localized home care coordination."
      ],
      cta: "Partner With Us",
      link: "/partners"
    },
    communities: {
      title: "For Communities",
      points: [
        "Bring accessible, digital-first vital screening to Tier 2 and Tier 3 cities.",
        "Partner with local NGOs to monitor high-risk chronic clusters.",
        "Empower caregivers with simple, translated tools for local clinics.",
        "Reduce out-of-pocket medical debt by prioritizing home-based monitoring."
      ],
      cta: "Review Our Vision",
      link: "/about"
    }
  };

  const faqs = [
    {
      question: "What is SUMINO?",
      answer: "SUMINO is a category-defining family health prevention platform. We help households identify health risks early, track vital indicators, and receive preventive guidance. Our focus is keeping families safe and healthy at home, preventing minor issues from escalating into major medical emergencies."
    },
    {
      question: "Is SUMINO a hospital, clinic, or telemedicine provider?",
      answer: "No. SUMINO is not a hospital, clinic, or telemedicine service. We do not provide clinical diagnoses, treatments, or prescriptions. We are a software-driven preventive intelligence platform that partners with families, doctors, and diagnostics to provide continuous monitoring and warning signs."
    },
    {
      question: "What does the tagline \"Prevention Starts at Home\" mean?",
      answer: "It represents our core philosophy: healthcare shouldn't begin when someone enters an emergency room. It should start in the household. By monitoring indicators and building preventative habits at home, families can catch risks long before they require acute clinical treatment."
    },
    {
      question: "How does SUMINO help Tier 2, Tier 3, and rural households in India?",
      answer: "Families in smaller cities and rural areas often face delayed diagnoses due to limited specialist access. SUMINO provides easy-to-use, localized health tracking templates and AI-powered guidelines that help caregivers flag problems early and connect with local general physicians in a timely manner."
    },
    {
      question: "How is SUMINO different from regular fitness trackers?",
      answer: "Fitness trackers focus on calorie burn, workouts, and individual step counts. SUMINO is a clinical-grade family dashboard. We look at combined family trends, focus on warning signs for elderly care and children, and map metrics to validated preventive healthcare guidelines rather than just fitness goals."
    },
    {
      question: "How does SUMINO identify health risks before they become emergencies?",
      answer: "We utilize a multi-parameter risk detection framework. By analyzing the combination of daily energy, resting heart rate trends, sleep disruption, minor complaints, and laboratory diagnostic reports, our platform flags deviations from a user's normal baseline."
    },
    {
      question: "What role does Artificial Intelligence (AI) play on SUMINO?",
      answer: "SUMINO uses AI to analyze complex, multi-variable health trends. Instead of simple thresholds (e.g. alert if heart rate is high), our models identify slow, progressive declines in overall health indicators over weeks. All AI suggestions are strictly advisory and based on peer-reviewed medical guidelines."
    },
    {
      question: "Is my family's health data secure on SUMINO?",
      answer: "Yes. We employ bank-grade security standards. All sensitive personal health data is encrypted both in transit (using TLS 1.3) and at rest (using AES-256). We strictly adhere to India's Digital Personal Data Protection (DPDP) Act and design our backend using standard secure medical data architectures."
    },
    {
      question: "Will SUMINO sell my data to insurance companies or advertisers?",
      answer: "Absolutely not. SUMINO holds a strict ethical commitment: we will never sell or share your family's personal health data with third-party advertisers, insurance providers, or data brokers. Your information is strictly used to provide preventive insights to you and your selected doctors."
    },
    {
      question: "How does the family health dashboard work?",
      answer: "The dashboard allows a primary family caregiver to manage profiles for multiple members (e.g., parents, children, spouse). It displays easy-to-read charts, daily check-in logs, risk status badges (e.g., Stable, Needs Attention), and actionable wellness recommendations."
    },
    {
      question: "Does SUMINO replace my visits to a regular doctor?",
      answer: "No. SUMINO works with your doctor. By tracking daily health indicators over time, SUMINO provides a comprehensive longitudinal chart. When you visit your doctor, they can review this chart to gain a much deeper understanding of your health history than a single clinic visit allows."
    },
    {
      question: "How do doctors onboard onto the SUMINO platform?",
      answer: "Doctors can join the SUMINO Panel through our dedicated onboarding funnel (/doctors). Once verified with their medical registration details, they gain access to a secure clinical dashboard where they can view the authorized home health timelines of their patients who opt-in."
    },
    {
      question: "How does SUMINO support clinical decision-making?",
      answer: "SUMINO does not diagnose. Instead, it provides clean, formatted, continuous patient health timelines. By summarizing weeks of vitals, sleep, and lifestyle patterns into clinical summaries, doctors save time during visits and can easily identify chronic trends."
    },
    {
      question: "What clinical guidelines does SUMINO reference?",
      answer: "Our warning models are mapped to internationally accepted clinical standards from the World Health Organization (WHO) and Indian Council of Medical Research (ICMR) preventive guidelines for diabetes, cardiovascular risks, elderly frailty, and childhood wellness."
    },
    {
      question: "Can my doctor receive direct alerts from my SUMINO profile?",
      answer: "Patient-authorized general practitioners can configure the platform to highlight patients whose data shows persistent risk markers. However, SUMINO is not a continuous ICU-grade monitoring system; it does not send immediate clinical alarms for acute emergencies."
    },
    {
      question: "Who can partner with SUMINO?",
      answer: "We actively partner with hospital chains, local general physician clinics, diagnostic laboratories, healthcare NGOs, insurance providers looking to incentivize preventive wellness, and corporate employee wellness programs."
    },
    {
      question: "What is the benefit of joining the SUMINO Waitlist now?",
      answer: "By joining the waitlist, you secure early access to the SUMINO platform during our limited beta release. Early members receive complimentary onboarding support, priority access to family health consultations, and lifetime discount pricing."
    },
    {
      question: "How does the waitlist onboarding process work?",
      answer: "Once you register with your email, mobile number, and city, you will receive a confirmation code. We release access in batches based on geographic regions. You will receive an SMS and email invite once the beta goes live in your city."
    },
    {
      question: "How does SUMINO partner with diagnostic centers?",
      answer: "Diagnostic labs can integrate with SUMINO to securely deliver test results directly into the patient's dashboard. Our system translates complex lab values into simple, visual explanations, highlighting how they fit into the patient's overall preventive wellness plan."
    },
    {
      question: "What is SUMINO's long-term vision for the prevention economy?",
      answer: "We believe that by shifting 10% of healthcare spending from emergency hospital treatment to early home-based detection, we can save millions of lives and reduce out-of-pocket healthcare debt for Indian households. We aim to become the default digital layers for preventive health."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:py-32 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/50 text-blue-500 text-xs font-semibold tracking-wide uppercase">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <span>Security First & DPDP Compliant</span>
              </div>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-blue-900 leading-tight">
                Healthcare Should Start Before Emergencies.
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                SUMINO helps families identify health risks early, stay informed, and take preventive action before problems become serious.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href="/waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/partners"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-blue-950 bg-white border border-slate-200 hover:bg-slate-50 rounded-full shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5"
                >
                  Partner With Us
                </Link>
              </div>
              <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  <span>Prevention Starts at Home</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Continuous Vitals Mapping</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>AI Risk Scoring Dashboard</span>
                </div>
              </div>
            </motion.div>

            {/* Right Graphic Mockup */}
            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md aspect-square rounded-3xl glass-card p-6 flex flex-col justify-between shadow-xl border border-slate-200/80 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-600/10 rounded-full blur-2xl" />
                
                {/* Visual Dashboard Mock */}
                <div className="relative z-10 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-200/50">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold block uppercase">Active Profile</span>
                      <span className="font-heading font-bold text-slate-800 text-lg">Grandfather (Age 74)</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-900 border border-green-200 text-xs font-semibold">
                      Status: Stable
                    </span>
                  </div>

                  {/* Vitals Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/80 rounded-2xl border border-slate-100 flex items-center gap-3">
                      <div className="p-2.5 bg-red-50 text-red-500 rounded-xl">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Resting HR</span>
                        <span className="font-heading font-bold text-slate-800 text-base">71 bpm</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/80 rounded-2xl border border-slate-100 flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-medium">Blood Pressure</span>
                        <span className="font-heading font-bold text-slate-800 text-base">128/82 mmHg</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Warning System Panel */}
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/60 text-xs flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-blue-900 font-bold">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                      <span>Preventive Assistant Insight</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed">
                      "Grandfather's sleep efficiency decreased slightly (7%) over the last 10 days alongside a mild vital deviation. Recommend scheduling a routine GP consultation."
                    </p>
                  </div>

                  {/* Trust Footer */}
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>🛡️ End-to-End Encrypted</span>
                    <span>No diagnostic assertions made</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. ALERT BANNER */}
      <section className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-coral-500 flex-shrink-0 animate-bounce" />
            <p className="font-heading font-semibold text-base md:text-lg">
              70% of acute medical health emergencies show early warning signs that go completely unnoticed.
            </p>
          </div>
          <Link
            href="/solution"
            className="flex-shrink-0 text-sm font-bold bg-white text-blue-900 px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Learn How to Identify
          </Link>
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-blue-900">
              Most Health Emergencies Show Warning Signs.
            </h2>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed">
              Why do families often miss these warnings? Because modern health systems focus on treatment *after* symptoms become severe. We lack the tools to see slow, subtle changes.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 hover:shadow-md transition-all duration-300" variants={fadeIn}>
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800">Silent Progressive decline</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Conditions like cardiac fatigue or diabetes progress quietly over weeks. Vitals drop slowly and sleep patterns decay invisibly, making them hard to catch without digital tracking.
              </p>
            </motion.div>

            <motion.div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 hover:shadow-md transition-all duration-300" variants={fadeIn}>
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800">Caregivers lack clean history</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                When parents or grandparents get sick, family members lack logs of resting vitals, sleeping indicators, or daily complaints. The doctor is left guessing with zero timeline context.
              </p>
            </motion.div>

            <motion.div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 hover:shadow-md transition-all duration-300" variants={fadeIn}>
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800">Highly Reactive systems</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Hospitals are engineered for emergency intervention. SUMINO exists because clinical care should start in the household, resolving issues before they necessitate an ER visit.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. SOLUTION SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Placeholder */}
            <div className="lg:col-span-5 order-last lg:order-first">
              <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-lg space-y-6">
                <h3 className="font-heading font-bold text-blue-900 text-xl">The SUMINO Framework</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors">
                    <div className="p-2 bg-blue-500 text-white rounded-lg flex-shrink-0 mt-0.5">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800">Home Health Log</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Non-invasive tracking of sleep, energy, and key vitals.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors">
                    <div className="p-2 bg-blue-500 text-white rounded-lg flex-shrink-0 mt-0.5">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800">Clinical Guidelines Mapping</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Algorithms cross-reference data against standard WHO/ICMR criteria.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors">
                    <div className="p-2 bg-blue-500 text-white rounded-lg flex-shrink-0 mt-0.5">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800">GP Collaboration Sync</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Direct export of clean PDF timelines to your primary care doctor.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">Introducing SUMINO</span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-blue-900">
                Prevention-First Healthcare, Designed for the Household.
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                SUMINO brings medical-backed wellness intelligence into the home. We build structural dashboards that let families spot early warning signals, prevent sudden ER runs, and make wellness proactive.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-slate-800">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  <span>Proactive Health Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  <span>Elderly Risk Identification</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  <span>Explainable Advisory Prompts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  <span>Secure Localized Database</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/solution"
                  className="inline-flex items-center justify-center font-bold text-blue-500 hover:text-blue-600 group"
                >
                  Explore our core prevention technology
                  <ArrowRight className="ml-1.5 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="how-it-works">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.08),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-blue-400 tracking-wider uppercase block">Our Process</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              Five Steps to Active Family Protection
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              How SUMINO wraps your household in a proactive healthcare safety net.
            </p>
          </div>

          {/* Desktop step flow (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="relative p-6 bg-slate-800/50 border border-slate-700/60 rounded-2xl flex flex-col justify-between space-y-6 hover:bg-slate-800 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-heading font-black text-2xl text-blue-400/30">{step.num}</span>
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-base text-slate-100">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BENEFITS SECTION (WITH INTERACTIVE TABS) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">Custom Benefits</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-blue-900">
              Designed For the Entire Ecosystem
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Whether you are managing elderly parents, caring for children, directing clinical operations, or investing in the future of healthcare.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center border-b border-slate-200 mb-12 flex-wrap">
            {(Object.keys(benefits) as Array<keyof typeof benefits>).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-heading text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-500 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {benefits[tab].title}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-6">
                <h3 className="font-heading font-bold text-2xl text-blue-900">
                  {benefits[activeTab].title} Solutions
                </h3>
                <ul className="space-y-3">
                  {benefits[activeTab].points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-600 text-sm md:text-base leading-relaxed">
                      <span className="h-2 w-2 rounded-full bg-green-600 flex-shrink-0 mt-2" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link
                    href={benefits[activeTab].link}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
                  >
                    {benefits[activeTab].cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-center">
                <div className="h-28 w-28 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  {activeTab === "families" && <Users className="h-16 w-16" />}
                  {activeTab === "doctors" && <UserCheck className="h-16 w-16" />}
                  {activeTab === "providers" && <Building className="h-16 w-16" />}
                  {activeTab === "communities" && <Activity className="h-16 w-16" />}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. TRUST & TRANSPARENCY PRINCIPLES */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="p-3 h-fit rounded-xl bg-white border border-slate-100 text-blue-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-slate-800 text-base">Your Data is Private</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We adhere to India's DPDP Act 2023. We will never sell your health metrics or share them with insurers.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 h-fit rounded-xl bg-white border border-slate-100 text-blue-500">
                <Database className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-slate-800 text-base">Ethical AI Framework</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  No automated black-box diagnostic models. AI outputs are advisory parameters mapped to clinical literature.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 h-fit rounded-xl bg-white border border-slate-100 text-blue-500">
                <UserPlus className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-slate-800 text-base">Clinical Verification</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Warning algorithms reference ICMR guidelines, built to empower regular consultations with your family GP.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">Common Inquiries</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-blue-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Find detailed explanations regarding our prevention model, security parameters, clinical boundaries, and waitlist access.
            </p>
          </div>

          <Accordion items={faqs} />
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-20 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-white leading-tight">
            Join India's Preventive Healthcare Movement.
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Secure early beta access in your city today. Take control of your family's health parameters, reduce emergencies, and build structural wellness indicators.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition-colors cursor-pointer"
            >
              Join the Beta Waitlist
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-full transition-colors"
            >
              Contact Partnerships
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
