"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  ClipboardList, 
  Stethoscope, 
  ArrowRight, 
  User, 
  Heart, 
  FileText, 
  Send, 
  ChevronRight, 
  Search, 
  PlusCircle, 
  FileDown, 
  Clock, 
  Award,
  ArrowLeft,
  Calendar,
  Layers,
  Sliders,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  conditions: string[];
  lastChecked: string;
  healthScore: number;
  vitals: {
    bloodPressure: string;
    bloodSugar: string;
    heartRate: string;
    bpHistory: { date: string; sys: number; dia: number }[];
    sugarHistory: { date: string; value: number }[];
  };
  reports: { id: string; name: string; date: string; status: string }[];
  prepQuestions: string[];
}

const MOCK_PATIENTS: Patient[] = [
  {
    id: "pat_father",
    name: "Rajesh Sharma",
    age: 65,
    gender: "Male",
    conditions: ["Hypertension", "Type 2 Diabetes", "Mild Fatty Liver"],
    lastChecked: "12-Jun-2026 08:30 AM",
    healthScore: 56,
    vitals: {
      bloodPressure: "142/92 mmHg",
      bloodSugar: "158 mg/dL (Fasting)",
      heartRate: "74 bpm",
      bpHistory: [
        { date: "Mon", sys: 135, dia: 86 },
        { date: "Tue", sys: 138, dia: 88 },
        { date: "Wed", sys: 140, dia: 90 },
        { date: "Thu", sys: 144, dia: 94 },
        { date: "Fri", sys: 142, dia: 92 },
      ],
      sugarHistory: [
        { date: "Mon", value: 142 },
        { date: "Tue", value: 148 },
        { date: "Wed", value: 155 },
        { date: "Thu", value: 160 },
        { date: "Fri", value: 158 },
      ]
    },
    reports: [
      { id: "rep_01", name: "HbA1c / Glycemic Profile (Thyrocare)", date: "12-Jun-2026", status: "Abnormal" },
      { id: "rep_02", name: "Lipid Profile Panel (Lal PathLabs)", date: "08-May-2026", status: "Abnormal" }
    ],
    prepQuestions: [
      "Why is my blood pressure systolic showing a 10mmHg rise over the last 5 days?",
      "Can we adjust the Metformin XR dosing given the fasting sugar averages of 150 mg/dL?",
      "Should we do a liver function panel to track NAFLD fatty liver progression?"
    ]
  },
  {
    id: "pat_self",
    name: "Priya Sharma",
    age: 34,
    gender: "Female",
    conditions: ["Impaired Glycemia (Pre-diabetes)"],
    lastChecked: "12-Jun-2026 09:00 AM",
    healthScore: 84,
    vitals: {
      bloodPressure: "118/76 mmHg",
      bloodSugar: "104 mg/dL (Fasting)",
      heartRate: "68 bpm",
      bpHistory: [
        { date: "Mon", sys: 116, dia: 74 },
        { date: "Tue", sys: 118, dia: 75 },
        { date: "Wed", sys: 115, dia: 73 },
        { date: "Thu", sys: 120, dia: 78 },
        { date: "Fri", sys: 118, dia: 76 },
      ],
      sugarHistory: [
        { date: "Mon", value: 98 },
        { date: "Tue", value: 101 },
        { date: "Wed", value: 96 },
        { date: "Thu", value: 105 },
        { date: "Fri", value: 104 },
      ]
    },
    reports: [
      { id: "rep_03", name: "Complete Blood Count (Max Lab)", date: "15-Apr-2026", status: "Normal" }
    ],
    prepQuestions: [
      "Is my fasting sugar of 104 indicating a need for medication, or can it be managed through zone-2 cardio?",
      "Are my sleep decay hours directly impacting my morning cortisol and insulin curves?"
    ]
  }
];

export default function Doctors() {
  const [isDashboardMode, setIsDashboardMode] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("pat_father");
  const [recommendationsInput, setRecommendationsInput] = useState("");
  const [notesSent, setNotesSent] = useState(false);
  const [activeHistoryTab, setActiveHistoryTab] = useState<"BP" | "Sugar">("BP");

  const activePatient = MOCK_PATIENTS.find(p => p.id === selectedPatientId) || MOCK_PATIENTS[0];

  const handleSendRecommendation = () => {
    if (!recommendationsInput.trim()) return;
    setNotesSent(true);
    setTimeout(() => {
      setNotesSent(false);
      setRecommendationsInput("");
      alert(`Clinical guidance successfully synchronized with ${activePatient.name}'s SUMINO application.`);
    }, 1500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const benefits = [
    {
      title: "Longitudinal Patient Baselines",
      desc: "Access months of clean, structured home vitals (resting pulse, sleep cycles, blood pressure trends) in under 30 seconds before consultation.",
      icon: Activity
    },
    {
      title: "Proactive Risk Flags",
      desc: "Receive structured warning signals highlighting persistent vital decay, enabling early general practitioner checks.",
      icon: ClipboardList
    },
    {
      title: "Clinical Decision Enabler",
      desc: "SUMINO does not make automated diagnostic decisions or override prescriptions. We organize information to assist your diagnostic accuracy.",
      icon: Stethoscope
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      <AnimatePresence mode="wait">
        {!isDashboardMode ? (
          /* MARKETING & ONBOARDING PAGE */
          <motion.div 
            key="marketing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col bg-slate-950"
          >
            {/* Hero Header */}
            <section className="bg-gradient-to-b from-blue-950 to-slate-950 pt-20 pb-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
                <span className="text-xs font-bold text-blue-400 tracking-wider uppercase block">For Indian Physicians</span>
                <h1 className="font-heading font-black text-4xl md:text-5xl text-slate-100 leading-tight">
                  Move From Reactive Diagnostics to Proactive Care
                </h1>
                <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Partner with families through structured, patient-authorized home health timelines. Spend less time reconstructing history, and more time optimizing outcomes.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setIsDashboardMode(true)}
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg hover:shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    Launch Clinician Dashboard Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <Link
                    href="/contact?category=Doctors"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Request Integration Guide
                  </Link>
                </div>
              </div>
            </section>

            {/* Main Pillars */}
            <section className="py-20 bg-slate-900 border-t border-slate-800/40">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {benefits.map((ben, idx) => {
                    const IconComponent = ben.icon;
                    return (
                      <div key={idx} className="p-8 bg-slate-800/50 border border-slate-700/50 rounded-3xl flex flex-col justify-between hover:shadow-lg hover:bg-slate-800 transition-all">
                        <div className="space-y-6">
                          <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl h-fit w-fit">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <h3 className="font-heading font-bold text-xl text-slate-100">{ben.title}</h3>
                          <p className="text-sm text-slate-400 leading-relaxed">{ben.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Trust Guarantee Block */}
            <section className="py-20 bg-slate-950 border-t border-slate-800/60">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  <div className="lg:col-span-6 space-y-6">
                    <h2 className="font-heading font-bold text-3xl text-slate-100 leading-tight">
                      Designed to Fit the OPD Schedule
                    </h2>
                    <div className="text-slate-400 text-sm md:text-base leading-relaxed space-y-4">
                      <p>
                        We understand that physicians have limited consultation slots in busy outpatient networks. SUMINO doesn&apos;t push clinical alerts for acute issues, nor do we clutter your day with raw health logs.
                      </p>
                      <p>
                        Instead, we organize home vitals, medication adherence records, and OCR lab parameters into a pre-digested consultation preparation dashboard.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-slate-900/60 p-8 rounded-3xl border border-slate-800/60 shadow-inner space-y-6">
                    <h3 className="font-heading font-bold text-slate-100 text-lg">Our Clinician Guarantee:</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <ShieldCheck className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-400 leading-relaxed">
                          <strong>100% Patient Consented</strong>: Access limits are fully managed by the user profile. Sharing can be revoked instantly.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <ShieldCheck className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-400 leading-relaxed">
                          <strong>ABDM Sandbox Compatible</strong>: Ready to pull external summaries and push home logs to the National Health Network.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <ShieldCheck className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-400 leading-relaxed">
                          <strong>Clinical Literature Backing</strong>: Scoring models strictly align with standards from WHO and ICMR.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* INTERACTIVE CLINICIAN PORTAL */
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12"
          >
            {/* Header Panel */}
            <div className="bg-slate-800 border border-slate-700/80 rounded-3xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsDashboardMode(false)}
                  className="p-2.5 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="h-12 w-12 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl flex items-center justify-center">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-heading font-black text-xl text-slate-100">Dr. Arvind Mehta, MD</h1>
                  <span className="text-xs text-slate-400">Apollo Specialty Hospital, Bangalore • Cardiology Panel</span>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-blue-900/40 text-blue-300 border border-blue-800 text-xs font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                ABDM HIU Sandbox Node Active
              </span>
            </div>

            {/* Main Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Patient List Selector */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-700/60">
                    <h3 className="font-heading font-bold text-sm text-slate-100">Authorized Patient Vault</h3>
                    <span className="text-[10px] text-slate-400 font-bold">{MOCK_PATIENTS.length} Active Records</span>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search patient registry..."
                      className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs focus:outline-none text-slate-200 focus:border-blue-500"
                    />
                  </div>

                  {/* Patient List */}
                  <div className="space-y-3">
                    {MOCK_PATIENTS.map((pat) => (
                      <div
                        key={pat.id}
                        onClick={() => setSelectedPatientId(pat.id)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                          selectedPatientId === pat.id
                            ? "bg-slate-900 border-blue-500 text-slate-100"
                            : "bg-slate-900/40 border-slate-700 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-xl font-bold text-xs flex items-center justify-center ${
                            pat.healthScore > 80 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-500"
                          }`}>
                            {pat.healthScore}
                          </div>
                          <div>
                            <span className="text-xs font-bold block">{pat.name}</span>
                            <span className="text-[10px] text-slate-500 block">Age: {pat.age} • {pat.gender}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-600" />
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Right Column: Active Patient Timelines */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Profile Overview Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-700/60">
                    <div>
                      <h2 className="font-heading font-black text-xl text-slate-100">{activePatient.name}</h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Age: {activePatient.age} • Gender: {activePatient.gender} • Last tracked vital: {activePatient.lastChecked}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activePatient.conditions.map((c, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-slate-900/60 text-slate-300 border border-slate-700 text-[10px] font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Vitals overview */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900/40 border border-slate-700 rounded-2xl">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Blood Pressure</span>
                      <span className="font-heading font-black text-base text-slate-100 block mt-1">{activePatient.vitals.bloodPressure}</span>
                    </div>
                    <div className="p-4 bg-slate-900/40 border border-slate-700 rounded-2xl">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Blood Sugar</span>
                      <span className="font-heading font-black text-base text-slate-100 block mt-1">{activePatient.vitals.bloodSugar}</span>
                    </div>
                    <div className="p-4 bg-slate-900/40 border border-slate-700 rounded-2xl">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Resting Pulse</span>
                      <span className="font-heading font-black text-base text-slate-100 block mt-1">{activePatient.vitals.heartRate}</span>
                    </div>
                  </div>

                  {/* Vitals History Charts (Toggle Tabs) */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300">Home Logging Vitals Timeline</span>
                      <div className="bg-slate-900 p-0.5 rounded-xl border border-slate-700 flex items-center gap-1">
                        {["BP", "Sugar"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveHistoryTab(tab as "BP" | "Sugar")}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              activeHistoryTab === tab ? "bg-blue-500 text-white" : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-40 bg-slate-900/50 rounded-3xl border border-slate-700 p-4 flex flex-col justify-between relative overflow-hidden">
                      <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                        <span>Max logged: {activeHistoryTab === "BP" ? "145 systolic" : "160 mg/dL"}</span>
                        <span>Baseline Normal Range</span>
                      </div>
                      
                      {/* SVG line graphs representation */}
                      <div className="h-24 w-full flex items-end">
                        <svg className="h-full w-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                          {activeHistoryTab === "BP" ? (
                            <>
                              {/* BP Sys Line */}
                              <polyline
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="2"
                                points={activePatient.vitals.bpHistory.map((h, i) => `${(i / (activePatient.vitals.bpHistory.length - 1)) * 100},${30 - (h.sys - 100) / 2}`).join(" ")}
                              />
                              {/* BP Dia Line */}
                              <polyline
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="1.5"
                                strokeDasharray="2"
                                points={activePatient.vitals.bpHistory.map((h, i) => `${(i / (activePatient.vitals.bpHistory.length - 1)) * 100},${30 - (h.dia - 50) / 1.5}`).join(" ")}
                              />
                            </>
                          ) : (
                            <polyline
                              fill="none"
                              stroke="#eab308"
                              strokeWidth="2.5"
                              points={activePatient.vitals.sugarHistory.map((h, i) => `${(i / (activePatient.vitals.sugarHistory.length - 1)) * 100},${30 - (h.value - 70) / 3.5}`).join(" ")}
                            />
                          )}
                        </svg>
                      </div>

                      <div className="flex justify-between text-[9px] text-slate-500 px-1 font-bold">
                        {activePatient.vitals.bpHistory.map((h, idx) => (
                          <span key={idx}>{h.date}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Consultation Preparation Sheet (Patient-to-Doctor Bridge) */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-700/60">
                    <ClipboardList className="h-5 w-5 text-blue-400" />
                    <h3 className="font-heading font-bold text-sm text-slate-100">Patient Prepared Consultation Sheet</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    These questions were pre-compiled on the patient&apos;s mobile app based on active home vital deviations and parsed OCR reports:
                  </p>
                  <div className="space-y-2.5">
                    {activePatient.prepQuestions.map((q, i) => (
                      <div key={i} className="p-3 bg-slate-900/60 border border-slate-700 rounded-2xl text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                        <span className="h-5 w-5 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center font-bold flex-shrink-0 text-[10px]">{i + 1}</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patient Parsed Reports */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 space-y-4">
                  <h3 className="font-heading font-bold text-sm text-slate-100">Scanned OCR Laboratory Files</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activePatient.reports.map((rep) => (
                      <div key={rep.id} className="p-4 bg-slate-900/50 border border-slate-700 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <div>
                            <span className="text-xs font-bold block truncate max-w-[150px]">{rep.name}</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">Scanned: {rep.date}</span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                          rep.status === "Abnormal" ? "bg-red-950/50 text-red-400 border-red-900" : "bg-green-950/50 text-green-400 border-green-900"
                        }`}>
                          {rep.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinician Advice Logger Form (Doctor Ecosystem Link) */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-700/60">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    <h3 className="font-heading font-bold text-sm text-slate-100">Log Clinical Recommendation & Advisory</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">Physician Guidance & Prescription Notes</label>
                      <textarea
                        value={recommendationsInput}
                        onChange={(e) => setRecommendationsInput(e.target.value)}
                        placeholder="e.g. Increase daily walks to 45 mins. Check fasting sugar daily before breakfast. Next checkup scheduled in 14 days..."
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs focus:outline-none text-slate-100 focus:border-blue-500"
                      />
                    </div>

                    <button
                      onClick={handleSendRecommendation}
                      disabled={!recommendationsInput.trim() || notesSent}
                      className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 text-white rounded-2xl text-xs font-bold transition-all shadow-lg hover:shadow-blue-500/15 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {notesSent ? (
                        <>
                          <Clock className="animate-spin h-4 w-4" />
                          Synchronizing with Patient Mobile Vault...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Publish Advice to Patient App
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
