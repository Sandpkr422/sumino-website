"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building, 
  TestTube, 
  Users, 
  Landmark, 
  ArrowRight, 
  ShieldCheck, 
  ArrowLeft,
  Sliders,
  DollarSign,
  Terminal,
  Activity,
  Award,
  Database,
  Play,
  RefreshCw,
  TrendingUp,
  Briefcase
} from "lucide-react";
import Link from "next/link";

export default function Partners() {
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(500);
  const [diabeticRatio, setDiabeticRatio] = useState(15); // %
  const [checkupCoverage, setCheckupCoverage] = useState(30); // %

  // Sandbox LIMS payload states
  const [limsSending, setLimsSending] = useState(false);
  const [limsLog, setLimsLog] = useState<string[]>([]);
  const [activeSandboxTab, setActiveSandboxTab] = useState<"calculator" | "api" | "insurance">("calculator");

  // Calculations
  const calculatedSavings = (() => {
    // Standard actuarial approximations for Indian corporates
    const reactiveCostsPerEmployee = 18000; // Average annual out-of-pocket + insurance cost per employee
    const criticalIncidentsPerYear = Math.round(employeeCount * 0.04 * (1.5 - checkupCoverage / 100)); // 4% baseline incident rate adjusted by checkups
    const costPerCriticalIncident = 150000; // INR cost for acute diabetes/cardiovascular hospitalization
    
    // SUMINO implementation savings
    const projectedCoverageAfterSumino = 85; // % compliance
    const incidentsPrevented = Math.round(criticalIncidentsPerYear * 0.45); // 45% reduction via early warnings
    const hospitalSavings = incidentsPrevented * costPerCriticalIncident;
    
    // Cost of SUMINO (Corporate rate: INR 99 per user per month)
    const annualSuminoCost = employeeCount * 99 * 12;
    const netSavings = hospitalSavings - annualSuminoCost;

    return {
      currentIncidents: criticalIncidentsPerYear,
      incidentsPrevented,
      annualSuminoCost,
      hospitalSavings,
      netSavings
    };
  })();

  const triggerLimsSync = () => {
    setLimsSending(true);
    setLimsLog([]);
    
    const logs = [
      "Connecting to https://api.sumino.in/v1/lims/webhook...",
      "HTTP/1.1 TLS 1.3 Handshake completed successfully.",
      "Authenticating LIMS Partner Token (Thyrocare Node 942)... OK.",
      "Validating ABDM consent token for Patient ABHA (91-8022-9018-4421)... VERIFIED.",
      "Parsing report JSON payload: { FastingSugar: 138mg/dL, HbA1c: 6.8% }",
      "Document AI OCR structures verified. Mapping data fields...",
      "Dispatched patient push alert: 'Thyrocare Report successfully parsed. View details.'",
      "Data commit finished. Webhook transaction closed. HTTP 202 Accepted."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setLimsLog(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setLimsSending(false);
        }
      }, (index + 1) * 400);
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const partnerTypes = [
    {
      title: "Hospitals & Clinics",
      desc: "Streamline OPD queues and improve patient post-discharge compliance. Coordinate scheduled preventive checkups when home vitals indicate warning signals.",
      icon: Building,
      color: "bg-blue-500/10 text-blue-400 border-blue-900/50"
    },
    {
      title: "Diagnostic Labs",
      desc: "Deliver structured, OCR-decoded summaries directly into the patient's vault. Translate complex biological indices into clear family warning timelines.",
      icon: TestTube,
      color: "bg-green-500/10 text-green-400 border-green-900/50"
    },
    {
      title: "Insurance Providers",
      desc: "Incentivize policyholders for maintaining baseline vitals. Reduce hospital claims expenses by shifting focus to early metabolic detection.",
      icon: ShieldCheck,
      color: "bg-red-500/10 text-red-400 border-red-900/50"
    },
    {
      title: "NGOs & Government",
      desc: "Deploy simplified vital screening apps in Tier 3 cities. Empower community helpers (ASHA workers) with basic digital risk flags.",
      icon: Landmark,
      color: "bg-orange-500/10 text-orange-400 border-orange-900/50"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      <AnimatePresence mode="wait">
        {!isSandboxMode ? (
          /* B2B MARKETING PORTAL */
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
                <span className="text-xs font-bold text-blue-400 tracking-wider uppercase block">B2B Partnerships</span>
                <h1 className="font-heading font-black text-4xl md:text-5xl text-slate-100 leading-tight">
                  Integrate with India&apos;s Preventive Health Layer
                </h1>
                <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  We collaborate with hospital systems, LIMS diagnostic networks, corporate employers, and B2B insurers to deliver proactive preventive care at scale.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setIsSandboxMode(true)}
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg hover:shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    Launch Partner Sandbox & Calculators
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <Link
                    href="/contact?category=Partnerships"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 bg-slate-800 border border-slate-700 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Inquire About API Access
                  </Link>
                </div>
              </div>
            </section>

            {/* Grid of partnership models */}
            <section className="py-20 bg-slate-900 border-t border-slate-800/40">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {partnerTypes.map((type, idx) => {
                    const IconComponent = type.icon;
                    return (
                      <div key={idx} className="p-8 bg-slate-850/50 border border-slate-700/60 rounded-3xl flex flex-col justify-between hover:shadow-lg hover:bg-slate-850 transition-all">
                        <div className="space-y-6">
                          <div className={`p-4 rounded-2xl h-fit w-fit border ${type.color}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <h3 className="font-heading font-bold text-xl text-slate-100">{type.title}</h3>
                          <p className="text-sm text-slate-400 leading-relaxed">{type.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Integration values detail */}
            <section className="py-20 bg-slate-950 border-t border-slate-800/60">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  <div className="lg:col-span-6 space-y-6">
                    <h2 className="font-heading font-bold text-3xl text-slate-100 leading-tight">
                      FHIR-Compliant Secure API Node
                    </h2>
                    <div className="text-slate-400 text-sm md:text-base leading-relaxed space-y-4">
                      <p>
                        SUMINO operates standard webhook receptors and secure APIs designed to integrate with existing hospital information portals and LIMS (Laboratory Information Management Systems).
                      </p>
                      <p>
                        Our backend leverages Aadhaar OTP credentials via ABDM gateway guidelines to verify patient records. We guarantee 100% compliance with India&apos;s DPDP Act 2023.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-slate-900/60 p-8 rounded-3xl border border-slate-800/60 shadow-inner space-y-4">
                    <h3 className="font-heading font-bold text-slate-100 text-lg">API Node Integration Benefits:</h3>
                    <ul className="space-y-3.5 text-xs text-slate-400">
                      <li className="flex gap-2">
                        <span className="text-blue-400 font-bold">✓</span>
                        <span><strong>LIMS Compatible</strong>: Streamlined webhooks for lab chains like Thyrocare, Lal PathLabs, and Max.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-400 font-bold">✓</span>
                        <span><strong>Aggregate Cohort Indexing</strong>: Aggregate health scores for corporate employees without compromising individual privacy.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-400 font-bold">✓</span>
                        <span><strong>Audit Logging</strong>: Secure audit trails tracking every transaction, query, and data sync event.</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* B2B PARTNER SANDBOX & CALCULATORS */
          <motion.div 
            key="sandbox"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12"
          >
            {/* Header Panel */}
            <div className="bg-slate-800 border border-slate-700/80 rounded-3xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSandboxMode(false)}
                  className="p-2.5 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="h-12 w-12 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl flex items-center justify-center">
                  <Sliders className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-heading font-black text-xl text-slate-100">B2B Integration & ROI Sandbox</h1>
                  <span className="text-xs text-slate-400">Evaluate corporate ROI, test diagnostic webhooks, and check insurer premiums.</span>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-slate-900/60 text-slate-400 border border-slate-700 text-xs font-bold">
                B2B Modules Activated
              </span>
            </div>

            {/* Sandbox Tabs */}
            <div className="flex border-b border-slate-800 mb-8 overflow-x-auto gap-2 pb-2">
              {[
                { id: "calculator", label: "Corporate ROI Estimator", icon: TrendingUp },
                { id: "api", label: "LIMS Webhook API Test", icon: Terminal },
                { id: "insurance", label: "Insurance Premium Console", icon: ShieldCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSandboxTab(tab.id as "calculator" | "api" | "insurance")}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer whitespace-nowrap ${
                      activeSandboxTab === tab.id
                        ? "bg-blue-500 border-blue-500 text-white shadow-lg"
                        : "bg-slate-800 border-slate-700/60 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-8 space-y-8">
                <AnimatePresence mode="wait">
                  
                  {/* TAB: CORPORATE ROI CALCULATOR */}
                  {activeSandboxTab === "calculator" && (
                    <motion.div
                      key="calculator"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 space-y-6">
                        <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-blue-400" />
                          Corporate Healthcare Savings Modeller
                        </h3>
                        
                        <div className="space-y-6">
                          {/* Employee Count Slider */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-450">Active Employee Count</span>
                              <span className="text-blue-400 font-bold">{employeeCount} Employees</span>
                            </div>
                            <input
                              type="range"
                              min={100}
                              max={5000}
                              step={50}
                              value={employeeCount}
                              onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                          </div>

                          {/* Diabetic Risk Ratio Slider */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-455">Estimated Metabolic Risk (Diabetes/Pre-diabetes %)</span>
                              <span className="text-blue-400 font-bold">{diabeticRatio}% of Workforce</span>
                            </div>
                            <input
                              type="range"
                              min={5}
                              max={40}
                              step={1}
                              value={diabeticRatio}
                              onChange={(e) => setDiabeticRatio(parseInt(e.target.value))}
                              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                          </div>

                          {/* Annual Health Checkup Coverage Slider */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-460">Standard Health Checkup Compliance (%)</span>
                              <span className="text-blue-400 font-bold">{checkupCoverage}% Compliance</span>
                            </div>
                            <input
                              type="range"
                              min={10}
                              max={80}
                              step={5}
                              value={checkupCoverage}
                              onChange={(e) => setCheckupCoverage(parseInt(e.target.value))}
                              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                          </div>
                        </div>

                      </div>

                      {/* Calculations Results Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Cost of program */}
                        <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700/80 flex flex-col justify-between h-40">
                          <div>
                            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">SUMINO Platform Subscription</span>
                            <span className="text-xs text-slate-400 block mt-1">INR 99 per user per month</span>
                          </div>
                          <span className="font-heading font-black text-2xl text-slate-100">
                            ₹{(calculatedSavings.annualSuminoCost).toLocaleString("en-IN")}
                            <span className="text-xs font-normal text-slate-500 ml-1">/ Year</span>
                          </span>
                        </div>

                        {/* Net Savings */}
                        <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700/80 flex flex-col justify-between h-40 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl" />
                          <div>
                            <span className="text-[10px] text-green-400 font-bold block uppercase tracking-wider">Estimated Corporate Savings</span>
                            <span className="text-xs text-slate-400 block mt-1">Hospitalizations prevented via early logs</span>
                          </div>
                          <div>
                            <span className="font-heading font-black text-2xl text-green-400">
                              ₹{(calculatedSavings.netSavings).toLocaleString("en-IN")}
                              <span className="text-xs font-normal text-slate-500 ml-1">/ Net Year</span>
                            </span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">Projected ER events prevented: {calculatedSavings.incidentsPrevented}</span>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* TAB: LIMS WEBHOOK API TESTER */}
                  {activeSandboxTab === "api" && (
                    <motion.div
                      key="api"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 space-y-6">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                          <div className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-blue-400" />
                            <h3 className="font-heading font-bold text-base text-slate-100">LIMS Lab Webhook Simulator</h3>
                          </div>
                          <span className="text-xs text-slate-400">HTTP POST Node</span>
                        </div>

                        {/* Code snippet layout */}
                        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-700 font-mono text-[11px] text-slate-300 overflow-x-auto">
                          <p className="text-slate-500">{"// Header: Authorization Bearer token_thyro_942"}</p>
                          <p className="text-blue-400">POST <span className="text-slate-200">https://api.sumino.in/v1/lims/webhook</span></p>
                          <pre className="text-slate-300 mt-2">
{`{
  "abhaAddress": "rajeshsharma65@sbx",
  "provider": "Thyrocare Technologies",
  "scannedAt": "2026-06-12T17:45:00Z",
  "biomarkers": [
    { "key": "HbA1c", "value": 6.8, "unit": "%" },
    { "key": "FastingGlucose", "value": 138, "unit": "mg/dL" }
  ]
}`}
                          </pre>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={triggerLimsSync}
                            disabled={limsSending}
                            className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {limsSending ? (
                              <>
                                <RefreshCw className="animate-spin h-4 w-4" />
                                Processing Webhook Payload...
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 fill-current" />
                                Trigger Diagnostic Webhook Transmit
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Webhook logs terminal */}
                      {limsLog.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="bg-slate-950 border border-slate-800 rounded-3xl p-6 font-mono text-[10px] space-y-2 text-slate-400"
                        >
                          {limsLog.map((log, i) => (
                            <div key={i} className="flex gap-2">
                              <span className="text-slate-600">[{i+1}]</span>
                              <span className={log.includes("Accepted") || log.includes("VERIFIED") ? "text-green-400" : log.includes("Error") ? "text-red-400" : "text-slate-300"}>{log}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB: INSURANCE PREMIUM CONSOLE */}
                  {activeSandboxTab === "insurance" && (
                    <motion.div
                      key="insurance"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-slate-800 border border-slate-700 rounded-3xl p-6 space-y-6"
                    >
                      <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-blue-400" />
                          <h3 className="font-heading font-bold text-base text-slate-100">B2B Insurance Cohort Console</h3>
                        </div>
                        <span className="text-xs text-slate-400">Aggregate Premium Sync</span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        Insurers query the **aggregate health scores** of registered corporate groups to estimate claims loss ratios and apply structured dynamic premium discounts, with individual parameters remaining fully private:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Group index metrics */}
                        <div className="p-4 bg-slate-900/40 border border-slate-750 rounded-2xl space-y-3">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Corporate Wellness Index</span>
                          <div className="flex items-end gap-2">
                            <span className="font-heading font-black text-2xl text-slate-100">78.4</span>
                            <span className="text-xs text-green-400 font-bold pb-1">↑ 4.2% MoM</span>
                          </div>
                          <p className="text-[10px] text-slate-500">Workforce baseline score optimized via habit checklists.</p>
                        </div>

                        {/* Premium discount */}
                        <div className="p-4 bg-slate-900/40 border border-slate-750 rounded-2xl space-y-3">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Dynamic Premium discount</span>
                          <div className="flex items-end gap-2">
                            <span className="font-heading font-black text-2xl text-blue-400">12.5%</span>
                            <span className="text-xs text-slate-400 pb-1">Applied Discount</span>
                          </div>
                          <p className="text-[10px] text-slate-500">Group discount tier achieved for premium renewals.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Right Column: Platform Standards & FAQs */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Platform Trust Box */}
                <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-700/60">
                    <Database className="h-5 w-5 text-blue-400 animate-pulse" />
                    <h3 className="font-heading font-bold text-sm text-slate-100">Data Standards Node</h3>
                  </div>

                  <div className="space-y-4 text-xs text-slate-400">
                    <div className="p-3 bg-slate-900/40 rounded-2xl space-y-1">
                      <strong className="text-slate-300 font-semibold block">FHIR Standards</strong>
                      <p className="text-[10px] text-slate-500 leading-relaxed">HL7 Interoperable specifications mapped dynamically to local tables.</p>
                    </div>
                    <div className="p-3 bg-slate-900/40 rounded-2xl space-y-1">
                      <strong className="text-slate-300 font-semibold block">DPDP Act 2023 Rules</strong>
                      <p className="leading-relaxed text-[11px]">Individual patient authorizations control B2B data syncing. Aggregated queries keep personal parameters fully anonymized.</p>
                    </div>
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
