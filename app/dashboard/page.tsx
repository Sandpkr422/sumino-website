"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Activity, 
  User, 
  Plus, 
  Search, 
  Send, 
  Upload, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  ChevronRight, 
  Mic, 
  Languages, 
  Bell, 
  Settings, 
  Share2, 
  FileDown, 
  Dumbbell, 
  Droplet, 
  Flame, 
  RefreshCw, 
  Sliders, 
  X, 
  Award, 
  Info,
  Sparkles,
  PhoneCall,
  UserCheck,
  CreditCard,
  Lock,
  ChevronLeft
} from "lucide-react";

// Mock profiles and data
interface VitalHistory {
  date: string;
  value: number;
}

interface Profile {
  id: string;
  name: string;
  role: string;
  age: number;
  gender: string;
  abhaAddress: string;
  healthScore: number;
  chronicConditions: string[];
  vitals: {
    bloodPressure: { systolic: number; diastolic: number; unit: string; history: { date: string; sys: number; dia: number }[] };
    bloodSugar: { value: number; type: "Fasting" | "Post-Prandial"; unit: string; history: VitalHistory[] };
    weight: { value: number; unit: string; history: VitalHistory[] };
    heartRate: { value: number; unit: string; history: VitalHistory[] };
  };
  habits: {
    steps: { current: number; target: number };
    water: { current: number; target: number }; // ml
    sleep: { current: number; target: number }; // hrs
  };
  medications: {
    name: string;
    dosage: string;
    timing: "Morning" | "Afternoon" | "Night";
    taken: boolean;
  }[];
  alerts: string[];
  milestones: string[];
}

interface ReportParameter {
  name: string;
  value: string;
  unit: string;
  normalRange: string;
  status: string;
}

interface ParsedReport {
  id: string;
  title: string;
  date: string;
  parameters: ReportParameter[];
  summary: string;
  doctorPrep: string[];
}

const INITIAL_PROFILES: Record<string, Profile> = {
  self: {
    id: "self",
    name: "Priya Sharma",
    role: "Self",
    age: 34,
    gender: "Female",
    abhaAddress: "priyasharma@sbx",
    healthScore: 84,
    chronicConditions: ["Pre-diabetes"],
    vitals: {
      bloodPressure: {
        systolic: 118,
        diastolic: 76,
        unit: "mmHg",
        history: [
          { date: "Mon", sys: 116, dia: 74 },
          { date: "Tue", sys: 118, dia: 75 },
          { date: "Wed", sys: 115, dia: 73 },
          { date: "Thu", sys: 120, dia: 78 },
          { date: "Fri", sys: 118, dia: 76 },
        ]
      },
      bloodSugar: {
        value: 104,
        type: "Fasting",
        unit: "mg/dL",
        history: [
          { date: "Mon", value: 98 },
          { date: "Tue", value: 101 },
          { date: "Wed", value: 96 },
          { date: "Thu", value: 105 },
          { date: "Fri", value: 104 },
        ]
      },
      weight: {
        value: 64,
        unit: "kg",
        history: [
          { date: "Jan", value: 66 },
          { date: "Feb", value: 65.5 },
          { date: "Mar", value: 65 },
          { date: "Apr", value: 64.5 },
          { date: "May", value: 64 },
        ]
      },
      heartRate: {
        value: 68,
        unit: "bpm",
        history: [
          { date: "Mon", value: 66 },
          { date: "Tue", value: 70 },
          { date: "Wed", value: 68 },
          { date: "Thu", value: 67 },
          { date: "Fri", value: 68 },
        ]
      }
    },
    habits: {
      steps: { current: 7200, target: 10000 },
      water: { current: 1500, target: 3000 },
      sleep: { current: 7.2, target: 8 }
    },
    medications: [
      { name: "Metformin", dosage: "500mg", timing: "Morning", taken: true },
      { name: "Multivitamin", dosage: "1 Tab", timing: "Night", taken: false }
    ],
    alerts: ["Fasting sugar is in pre-diabetic range. Monitor lunch post-prandial."],
    milestones: ["Completed 5,000 steps baseline 4 days in a row!", "Hydration goals achieved yesterday."]
  },
  father: {
    id: "father",
    name: "Rajesh Sharma",
    role: "Father",
    age: 65,
    gender: "Male",
    abhaAddress: "rajeshsharma65@sbx",
    healthScore: 56,
    chronicConditions: ["Hypertension", "Type 2 Diabetes", "Mild Fatty Liver"],
    vitals: {
      bloodPressure: {
        systolic: 142,
        diastolic: 92,
        unit: "mmHg",
        history: [
          { date: "Mon", sys: 135, dia: 86 },
          { date: "Tue", sys: 138, dia: 88 },
          { date: "Wed", sys: 140, dia: 90 },
          { date: "Thu", sys: 144, dia: 94 },
          { date: "Fri", sys: 142, dia: 92 },
        ]
      },
      bloodSugar: {
        value: 158,
        type: "Fasting",
        unit: "mg/dL",
        history: [
          { date: "Mon", value: 142 },
          { date: "Tue", value: 148 },
          { date: "Wed", value: 155 },
          { date: "Thu", value: 160 },
          { date: "Fri", value: 158 },
        ]
      },
      weight: {
        value: 78,
        unit: "kg",
        history: [
          { date: "Jan", value: 79.2 },
          { date: "Feb", value: 78.8 },
          { date: "Mar", value: 78.5 },
          { date: "Apr", value: 78.2 },
          { date: "May", value: 78 },
        ]
      },
      heartRate: {
        value: 74,
        unit: "bpm",
        history: [
          { date: "Mon", value: 72 },
          { date: "Tue", value: 75 },
          { date: "Wed", value: 76 },
          { date: "Thu", value: 73 },
          { date: "Fri", value: 74 },
        ]
      }
    },
    habits: {
      steps: { current: 3100, target: 6000 },
      water: { current: 1000, target: 2500 },
      sleep: { current: 5.8, target: 7 }
    },
    medications: [
      { name: "Amlodipine", dosage: "5mg", timing: "Morning", taken: true },
      { name: "Metformin XR", dosage: "1000mg", timing: "Morning", taken: true },
      { name: "Atorvastatin", dosage: "10mg", timing: "Night", taken: false }
    ],
    alerts: [
      "Blood Pressure (142/92) is elevated. 3-day rising systolic trend.",
      "Fasting Sugar is elevated. Metformin compliance is active."
    ],
    milestones: ["Walked 30 mins yesterday morning.", "BP checked consecutively for 5 days."]
  },
  mother: {
    id: "mother",
    name: "Kiran Sharma",
    role: "Mother",
    age: 61,
    gender: "Female",
    abhaAddress: "kiransharma61@sbx",
    healthScore: 74,
    chronicConditions: ["Hypothyroidism", "Osteopenia"],
    vitals: {
      bloodPressure: {
        systolic: 126,
        diastolic: 81,
        unit: "mmHg",
        history: [
          { date: "Mon", sys: 124, dia: 80 },
          { date: "Tue", sys: 125, dia: 82 },
          { date: "Wed", sys: 122, dia: 79 },
          { date: "Thu", sys: 128, dia: 83 },
          { date: "Fri", sys: 126, dia: 81 },
        ]
      },
      bloodSugar: {
        value: 112,
        type: "Fasting",
        unit: "mg/dL",
        history: [
          { date: "Mon", value: 108 },
          { date: "Tue", value: 110 },
          { date: "Wed", value: 107 },
          { date: "Thu", value: 114 },
          { date: "Fri", value: 112 },
        ]
      },
      weight: {
        value: 67,
        unit: "kg",
        history: [
          { date: "Jan", value: 68 },
          { date: "Feb", value: 67.8 },
          { date: "Mar", value: 67.4 },
          { date: "Apr", value: 67.1 },
          { date: "May", value: 67 },
        ]
      },
      heartRate: {
        value: 71,
        unit: "bpm",
        history: [
          { date: "Mon", value: 70 },
          { date: "Tue", value: 73 },
          { date: "Wed", value: 72 },
          { date: "Thu", value: 69 },
          { date: "Fri", value: 71 },
        ]
      }
    },
    habits: {
      steps: { current: 4800, target: 7000 },
      water: { current: 1800, target: 2500 },
      sleep: { current: 6.8, target: 8 }
    },
    medications: [
      { name: "Thyronorm", dosage: "50mcg", timing: "Morning", taken: true },
      { name: "Calcium + Vit D3", dosage: "1 Tab", timing: "Afternoon", taken: true }
    ],
    alerts: ["Thyroid checks overdue by 2 weeks. Schedule thyroid profile scan."],
    milestones: ["Thyroxine taken on empty stomach at 6:30 AM.", "Steps target 80% achieved."]
  },
  child: {
    id: "child",
    name: "Aarav Sharma",
    role: "Child",
    age: 6,
    gender: "Male",
    abhaAddress: "aaravsharma2020@sbx",
    healthScore: 92,
    chronicConditions: ["Seasonal Allergies"],
    vitals: {
      bloodPressure: {
        systolic: 98,
        diastolic: 62,
        unit: "mmHg",
        history: [
          { date: "Mon", sys: 96, dia: 60 },
          { date: "Tue", sys: 98, dia: 62 },
          { date: "Wed", sys: 95, dia: 61 },
          { date: "Thu", sys: 99, dia: 63 },
          { date: "Fri", sys: 98, dia: 62 },
        ]
      },
      bloodSugar: {
        value: 88,
        type: "Fasting",
        unit: "mg/dL",
        history: [
          { date: "Mon", value: 85 },
          { date: "Tue", value: 87 },
          { date: "Wed", value: 84 },
          { date: "Thu", value: 90 },
          { date: "Fri", value: 88 },
        ]
      },
      weight: {
        value: 22,
        unit: "kg",
        history: [
          { date: "Jan", value: 20.8 },
          { date: "Feb", value: 21.1 },
          { date: "Mar", value: 21.5 },
          { date: "Apr", value: 21.8 },
          { date: "May", value: 22 },
        ]
      },
      heartRate: {
        value: 84,
        unit: "bpm",
        history: [
          { date: "Mon", value: 82 },
          { date: "Tue", value: 85 },
          { date: "Wed", value: 86 },
          { date: "Thu", value: 83 },
          { date: "Fri", value: 84 },
        ]
      }
    },
    habits: {
      steps: { current: 9100, target: 12000 },
      water: { current: 1200, target: 2000 },
      sleep: { current: 9.8, target: 10 }
    },
    medications: [
      { name: "Montelukast Kid", dosage: "4mg", timing: "Night", taken: false }
    ],
    alerts: ["Pollen counts are high. Keep dust exposure minimized in evenings."],
    milestones: ["Growth monitoring: Height 116cm (75th percentile).", "Completed primary vaccine doses!"]
  }
};

const MOCK_REPORTS_TEMPLATES = [
  {
    id: "rep_hba1c",
    title: "HbA1c / Glycemic Profile (Thyrocare)",
    date: "12-Jun-2026",
    parameters: [
      { name: "Fasting Blood Sugar", value: "138", unit: "mg/dL", normalRange: "70-100", status: "Abnormal" },
      { name: "HbA1c (Glycated Hb)", value: "6.8", unit: "%", normalRange: "< 5.7", status: "Abnormal" },
      { name: "Estimated Average Glucose", value: "148", unit: "mg/dL", normalRange: "90-120", status: "Borderline" }
    ],
    summary: "Glycemic markers are in the diabetic range. Strong indicator of Insulin Resistance. Corresponds with rising blood pressure values. Immediate lifestyle adaptation in carbohydrates and clinical follow-up is recommended.",
    doctorPrep: [
      "Ask doctor: Should we begin Metformin therapy or adjust current dosing?",
      "Ask doctor: Do we need a continuous glucose monitor (CGM) for 14 days?",
      "Discuss: Home fasting levels average 140 mg/dL over past 7 days."
    ]
  },
  {
    id: "rep_lipid",
    title: "Lipid Profile Panel (Lal PathLabs)",
    date: "08-May-2026",
    parameters: [
      { name: "Total Cholesterol", value: "245", unit: "mg/dL", normalRange: "< 200", status: "Abnormal" },
      { name: "Triglycerides", value: "188", unit: "mg/dL", normalRange: "< 150", status: "Abnormal" },
      { name: "LDL Cholesterol (Bad)", value: "162", unit: "mg/dL", normalRange: "< 100", status: "Abnormal" },
      { name: "HDL Cholesterol (Good)", value: "42", unit: "mg/dL", normalRange: "> 40", status: "Normal" }
    ],
    summary: "Lipid levels are high risk. Raised LDL levels indicate plaque accumulation risk. Cardiovascular index should be optimized via exercise, omega-3 fat intake, and potential low-dose statin therapy.",
    doctorPrep: [
      "Ask doctor: Is statin treatment necessary given active blood pressure trends?",
      "Ask doctor: Can we achieve correction purely through cardio and strict dietary changes?",
      "Discuss: Family history of heart disease (paternal grandfather)."
    ]
  },
  {
    id: "rep_cbc",
    title: "Complete Blood Count (Max Lab)",
    date: "15-Apr-2026",
    parameters: [
      { name: "Hemoglobin", value: "14.2", unit: "g/dL", normalRange: "12.0-16.0", status: "Normal" },
      { name: "White Blood Cells (WBC)", value: "7,800", unit: "/cumm", normalRange: "4000-11000", status: "Normal" },
      { name: "Platelets Count", value: "2.4", unit: "Lakhs/cumm", normalRange: "1.5-4.5", status: "Normal" }
    ],
    summary: "All hematological indicators are within normal reference ranges. Oxygen carrying capacity is optimal. No active infectious signs detected.",
    doctorPrep: [
      "Discuss: Regular blood count parameters are optimal.",
      "Check: Standard yearly cell structure trends are stable."
    ]
  }
];

export default function Dashboard() {
  const [profiles, setProfiles] = useState<Record<string, Profile>>(INITIAL_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string>("self");
  const [activeTab, setActiveTab] = useState<"home" | "copilot" | "reports" | "risk" | "habits" | "abdm">("home");
  
  // Active states
  const activeProfile = useMemo(() => profiles[activeProfileId], [profiles, activeProfileId]);

  // Vitals form state
  const [vitalsModalOpen, setVitalsModalOpen] = useState(false);
  const [vitalTypeToLog, setVitalTypeToLog] = useState<"BP" | "Sugar" | "Weight" | "HR">("BP");
  const [bpSysInput, setBpSysInput] = useState("120");
  const [bpDiaInput, setBpDiaInput] = useState("80");
  const [sugarInput, setSugarInput] = useState("100");
  const [sugarType, setSugarType] = useState<"Fasting" | "Post-Prandial">("Fasting");
  const [weightInput, setWeightInput] = useState("65");
  const [hrInput, setHrInput] = useState("72");

  // Notifications state
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [globalAlerts, setGlobalAlerts] = useState<string[]>([
    "Father's BP checked this morning: 142/92 (High). Action recommended.",
    "Mother's thyroid panel review is due this month.",
    "Hydration streak unlocked: Priya completed 3,000ml target."
  ]);

  // Settings & Trust state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dpdpConsent, setDpdpConsent] = useState(true);
  const [dataEncryption, setDataEncryption] = useState(true);
  const [abhaSync, setAbhaSync] = useState(true);

  // Copilot Chat state
  const [chatMessages, setChatMessages] = useState<Record<string, { role: "user" | "assistant"; text: string; time: string; source?: string }[]>>({
    self: [
      { role: "assistant", text: "Hello Priya! I'm your SUMINO Health Copilot. I've analyzed your recent reports showing pre-diabetic sugar indicators (Fasting: 104). How can I assist you with your diet, exercise, or family care logs today?", time: "09:00 AM" }
    ],
    father: [
      { role: "assistant", text: "Hello Rajesh ji. I noticed your blood pressure systolic levels are averaging 142 mmHg this week, which is in Stage 1 Hypertension. We logged your Amlodipine today. How are you feeling? Do you have any headache or fatigue?", time: "10:15 AM" }
    ],
    mother: [
      { role: "assistant", text: "Namaste Kiran ji. I see you took Thyronorm empty stomach this morning. Let's make sure we schedule a Thyroid Stimulating Hormone (TSH) lab test as it is overdue.", time: "10:30 AM" }
    ],
    child: [
      { role: "assistant", text: "Hi Priya! I'm tracking Aarav's seasonal allergy checklist. Today's pollen forecast is high. Let's monitor his chest triggers.", time: "08:15 AM" }
    ]
  });
  const [chatInput, setChatInput] = useState("");
  const [chatLanguage, setChatLanguage] = useState<"English" | "Hindi">("English");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Reports state
  const [selectedReportTemplate, setSelectedReportTemplate] = useState<string>("");
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [parsedReport, setParsedReport] = useState<ParsedReport | null>(null);
  const [reportSuccess, setReportSuccess] = useState(false);

  // ABHA / ABDM Creator State
  const [abhaStep, setAbhaStep] = useState(1);
  const [abhaAadhaar, setAbhaAadhaar] = useState("");
  const [abhaOtp, setAbhaOtp] = useState("");
  const [abhaIsVerified, setAbhaIsVerified] = useState(true); // Pre-verified for mock profiles
  const [consentRequests, setConsentRequests] = useState([
    { id: "con_001", requester: "Fortis Hospitals, Delhi NCR", purpose: "Longitudinal Cardiology History", expiry: "25-Jun-2026", status: "Pending" },
    { id: "con_002", requester: "Max Healthcare Pharmacy", purpose: "Active Medication Validation", expiry: "12-Jul-2026", status: "Approved" }
  ]);

  // Habit loop streak count
  const [habitStreak, setHabitStreak] = useState(7);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");

  // Retain loop briefs
  const [showMorningBrief, setShowMorningBrief] = useState(true);
  const [showEveningReflection, setShowEveningReflection] = useState(false);

  // Trend view
  const [trendViewRange, setTrendViewRange] = useState<"D" | "W" | "M" | "Y">("W");

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, activeProfileId]);

  // Handle vitals form log
  const handleAddVital = async () => {
    const updated = { ...profiles };
    const prof = updated[activeProfileId];
    const dateStr = new Date().toLocaleDateString("en-US", { weekday: "short" });

    let metricValue: Record<string, unknown> = {};
    if (vitalTypeToLog === "BP") {
      const sys = parseInt(bpSysInput) || 120;
      const dia = parseInt(bpDiaInput) || 80;
      prof.vitals.bloodPressure.systolic = sys;
      prof.vitals.bloodPressure.diastolic = dia;
      prof.vitals.bloodPressure.history = [...prof.vitals.bloodPressure.history.slice(1), { date: dateStr, sys, dia }];
      metricValue = { systolic: sys, diastolic: dia };
      
      // Dynamic alerts and score updates
      if (sys > 140 || dia > 90) {
        if (!prof.alerts.some(a => a.includes("elevated"))) {
          prof.alerts.push(`High BP Alert: logged ${sys}/${dia} mmHg today.`);
        }
        prof.healthScore = Math.max(30, prof.healthScore - 8);
      } else {
        prof.healthScore = Math.min(100, prof.healthScore + 3);
      }
    } else if (vitalTypeToLog === "Sugar") {
      const val = parseInt(sugarInput) || 100;
      prof.vitals.bloodSugar.value = val;
      prof.vitals.bloodSugar.type = sugarType;
      prof.vitals.bloodSugar.history = [...prof.vitals.bloodSugar.history.slice(1), { date: dateStr, value: val }];
      metricValue = { value: val, type: sugarType };
      
      if (val > 140 && sugarType === "Fasting") {
        if (!prof.alerts.some(a => a.includes("diabetic"))) {
          prof.alerts.push(`High Sugar Alert: fasting sugar is ${val} mg/dL.`);
        }
        prof.healthScore = Math.max(30, prof.healthScore - 10);
      } else {
        prof.healthScore = Math.min(100, prof.healthScore + 2);
      }
    } else if (vitalTypeToLog === "Weight") {
      const val = parseFloat(weightInput) || 60;
      prof.vitals.weight.value = val;
      prof.vitals.weight.history = [...prof.vitals.weight.history.slice(1), { date: dateStr, value: val }];
      metricValue = { value: val };
    } else if (vitalTypeToLog === "HR") {
      const val = parseInt(hrInput) || 72;
      prof.vitals.heartRate.value = val;
      prof.vitals.heartRate.history = [...prof.vitals.heartRate.history.slice(1), { date: dateStr, value: val }];
      metricValue = { value: val };
    }

    setProfiles(updated);
    setVitalsModalOpen(false);
    
    // Trigger retention celebration
    triggerCelebration("Vital Log Complete! Health score updated.");

    // POST to database vitals log API
    try {
      await fetch("/api/vitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: activeProfileId,
          type: vitalTypeToLog,
          metrics: metricValue,
          timestamp: new Date().toISOString()
        })
      });
    } catch (e) {
      console.error("Vitals API post failed:", e);
    }
  };

  const triggerCelebration = (msg: string) => {
    setCelebrationMessage(msg);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  // Toggle Medication taken
  const toggleMedication = (index: number) => {
    const updated = { ...profiles };
    const meds = updated[activeProfileId].medications;
    meds[index].taken = !meds[index].taken;
    
    // Recalculate health score and streak
    const totalMeds = meds.length;
    const takenMeds = meds.filter(m => m.taken).length;
    const completionRatio = takenMeds / totalMeds;
    
    if (completionRatio === 1) {
      updated[activeProfileId].healthScore = Math.min(100, updated[activeProfileId].healthScore + 5);
      triggerCelebration("All medications taken! Streaks maintained.");
      setHabitStreak(prev => prev + 1);
    } else {
      updated[activeProfileId].healthScore = Math.max(30, updated[activeProfileId].healthScore - 2);
    }

    setProfiles(updated);
  };

  // Log Habit completions
  const addWater = (amount: number) => {
    const updated = { ...profiles };
    const waterObj = updated[activeProfileId].habits.water;
    waterObj.current = Math.min(waterObj.target, waterObj.current + amount);
    
    if (waterObj.current === waterObj.target) {
      updated[activeProfileId].healthScore = Math.min(100, updated[activeProfileId].healthScore + 3);
      triggerCelebration("Daily Hydration Target Achieved! 💧");
    }
    setProfiles(updated);
  };

  const addSteps = (amount: number) => {
    const updated = { ...profiles };
    const stepsObj = updated[activeProfileId].habits.steps;
    stepsObj.current = Math.min(stepsObj.target, stepsObj.current + amount);
    
    if (stepsObj.current >= stepsObj.target) {
      updated[activeProfileId].healthScore = Math.min(100, updated[activeProfileId].healthScore + 4);
      triggerCelebration("Daily Steps Goal Crushed! 🏃‍♂️");
    }
    setProfiles(updated);
  };

  // Dynamic Chatbot response simulator
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    const msgTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    // Add user message
    const updatedChat = { ...chatMessages };
    const activeChat = updatedChat[activeProfileId] || [];
    updatedChat[activeProfileId] = [...activeChat, { role: "user", text: userMsg, time: msgTime }];
    setChatMessages(updatedChat);
    setChatInput("");
    setIsBotTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          profileId: activeProfileId,
          language: chatLanguage
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "Success" && data.response) {
          const updatedChatReply = { ...chatMessages };
          updatedChatReply[activeProfileId] = [
            ...(updatedChatReply[activeProfileId] || []),
            { 
              role: "assistant", 
              text: data.response.text, 
              time: data.response.time, 
              source: data.response.source 
            }
          ];
          setChatMessages(updatedChatReply);
          setIsBotTyping(false);
          return;
        }
      }
    } catch (e) {
      console.error("Chat API post failed:", e);
    }

    // Fallback logic if API fails
    setTimeout(() => {
      const botResponse = "I've logged that. Looking at the longitudinal health parameters of your family members, everything is stable. How can I help you?";
      const sourceRef = "SUMINO Knowledge Repository";
      const updatedChatReply = { ...chatMessages };
      updatedChatReply[activeProfileId] = [
        ...(updatedChatReply[activeProfileId] || []),
        { role: "assistant", text: botResponse, time: msgTime, source: sourceRef }
      ];
      setChatMessages(updatedChatReply);
      setIsBotTyping(false);
    }, 1000);
  };

  // OCR Lab Report Scanner simulator
  const handleOcrProcess = async () => {
    if (!selectedReportTemplate) return;

    setIsOcrProcessing(true);
    setParsedReport(null);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: selectedReportTemplate,
          profileId: activeProfileId
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "Success" && data.report) {
          const report = data.report;
          setParsedReport(report);
          setIsOcrProcessing(false);
          setReportSuccess(true);
          
          // Update profile attributes based on parsed records
          const updated = { ...profiles };
          const prof = updated[activeProfileId];
          if (selectedReportTemplate === "rep_hba1c") {
            prof.vitals.bloodSugar.value = 138;
            if (!prof.chronicConditions.includes("Type 2 Diabetes")) {
              prof.chronicConditions.push("Impaired Glucose Tolerance");
            }
            prof.healthScore = Math.max(45, prof.healthScore - 12);
            prof.alerts.push("Thyrocare Scan parsed: HbA1c is 6.8% (Elevated Diabetic Range).");
          } else if (selectedReportTemplate === "rep_lipid") {
            prof.healthScore = Math.max(50, prof.healthScore - 8);
            prof.alerts.push("Lal PathLabs Scan parsed: Total Cholesterol 245 mg/dL (Abnormal).");
          }
          setProfiles(updated);
          triggerCelebration("Lab report scanned! Parameters synced with timeline.");
          return;
        }
      }
    } catch (e) {
      console.error("Reports API post failed:", e);
    }

    // Fallback if API fails
    setTimeout(() => {
      const template = MOCK_REPORTS_TEMPLATES.find(t => t.id === selectedReportTemplate);
      setParsedReport(template || null);
      setIsOcrProcessing(false);
      setReportSuccess(true);
      triggerCelebration("Lab report scanned! Parameters synced with timeline.");
    }, 1000);
  };

  // ABHA Aadhaar creation flow
  const handleCreateAbha = () => {
    if (abhaStep === 1) {
      if (abhaAadhaar.length === 12) {
        setAbhaStep(2);
      }
    } else {
      if (abhaOtp === "1234") {
        setAbhaIsVerified(true);
        triggerCelebration("Digital ABHA Card Generated Successfully! 💳");
      }
    }
  };

  // Toggle consent approval
  const toggleConsent = (id: string) => {
    setConsentRequests(prev => 
      prev.map(c => c.id === id ? { ...c, status: c.status === "Approved" ? "Pending" : "Approved" } : c)
    );
    triggerCelebration("ABDM Data Sharing Permissions Updated.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      
      {/* 1. RETENTION NOTIFICATION / CELEBRATION FLOATER */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full shadow-2xl border border-white/20 flex items-center gap-2"
          >
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
            <span className="text-sm font-bold text-white tracking-wide">{celebrationMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MORNING HEALTH BRIEF MODAL */}
      <AnimatePresence>
        {showMorningBrief && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-800 rounded-3xl border border-slate-700 p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              <div className="flex justify-between items-start pb-4 border-b border-slate-700 mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">SUMINO Morning Brief</span>
                    <h3 className="font-heading font-bold text-lg text-slate-100">Welcome Back, Priya</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMorningBrief(false)}
                  className="p-1 rounded-full bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p className="leading-relaxed">
                  &ldquo;Today is <span className="text-blue-400 font-semibold">June 12, 2026</span>. Here is your family&apos;s morning preventive overview:&rdquo;
                </p>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-red-950/30 border border-red-900/40 flex items-start gap-2.5">
                    <AlertTriangle className="h-5 w-5 text-coral-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-coral-400">Father&apos;s BP Alert:</span>
                      <p className="text-xs text-slate-400 mt-0.5">Rajesh&apos;s systolic rising trend reached 142 mmHg today. Ensure morning Amlodipine is checked.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-blue-950/30 border border-blue-900/40 flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-blue-400">Mother&apos;s Care Milestones:</span>
                      <p className="text-xs text-slate-400 mt-0.5">Kiran took Thyroxine at 6:30 AM. Standard fasting parameters are stable.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-green-950/30 border border-green-900/40 flex items-start gap-2.5">
                    <Activity className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-green-400">Your Metabolic Path:</span>
                      <p className="text-xs text-slate-400 mt-0.5">Water tracker baseline resets today. Aim for 3.0L to help manage pre-diabetic spikes.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => { setShowMorningBrief(false); setActiveTab("habits"); }}
                  className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 rounded-2xl font-bold text-sm text-white transition-all shadow-lg hover:shadow-blue-500/20"
                >
                  Start Daily Habits
                </button>
                <button
                  onClick={() => setShowMorningBrief(false)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-2xl font-semibold text-sm text-slate-300 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. CORE APP VIEW WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header Panel */}
        <div className="glass-card bg-slate-800/80 border-slate-700/80 rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          
          <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-2xl shadow-inner">
              {activeProfile.role[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-2xl text-slate-100">{activeProfile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-900/50 text-blue-300 border border-blue-800 text-[10px] font-bold">
                  {activeProfile.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Age: {activeProfile.age} • Gender: {activeProfile.gender} • ABHA: <strong className="text-slate-300 font-medium">{activeProfile.abhaAddress}</strong>
              </p>
            </div>
          </div>

          {/* Profile Switcher & Actions */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end relative z-10">
            {/* Active profile switch tabs */}
            <div className="bg-slate-900/80 p-1 rounded-2xl border border-slate-700/60 flex items-center gap-1">
              {(Object.keys(profiles) as Array<keyof typeof profiles>).map((pId) => (
                <button
                  key={pId}
                  onClick={() => {
                    setActiveProfileId(pId);
                    setParsedReport(null);
                    setSelectedReportTemplate("");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeProfileId === pId
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {profiles[pId].role}
                </button>
              ))}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotifPanelOpen(!notifPanelOpen)}
                className="p-3 bg-slate-900 hover:bg-slate-700 border border-slate-700/80 rounded-2xl text-slate-300 hover:text-slate-100 transition-colors relative cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                {globalAlerts.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-coral-500 animate-ping" />
                )}
              </button>

              {/* Notification dropdown panel */}
              <AnimatePresence>
                {notifPanelOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-80 bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl p-4 z-40 space-y-3"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                      <span className="text-xs font-bold text-slate-400">Active Health Warnings</span>
                      <button 
                        onClick={() => setGlobalAlerts([])}
                        className="text-[10px] text-slate-500 hover:text-slate-300 font-semibold"
                      >
                        Clear All
                      </button>
                    </div>
                    {globalAlerts.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">No active family warnings.</p>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {globalAlerts.map((alert, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-700/40 text-[11px] text-slate-300 leading-relaxed flex items-start gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-coral-500 flex-shrink-0 mt-1.5" />
                            <span>{alert}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings Button */}
            <button 
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-3 bg-slate-900 hover:bg-slate-700 border border-slate-700/80 rounded-2xl text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

        </div>

        {/* 4. SETTINGS / TRUST DRAWER */}
        <AnimatePresence>
          {settingsOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-800 border border-slate-700 rounded-3xl p-6 mb-8 overflow-hidden space-y-6"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-400" />
                  <h3 className="font-heading font-bold text-base text-slate-100">Trust Layer & Privacy Center</h3>
                </div>
                <button 
                  onClick={() => setSettingsOpen(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* DPDP Consent */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">DPDP Act 2023 Consent</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                      Control your active consent parameters. You can revoke personal vitals tracking or database logs at any point.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Active Consent</span>
                    <button
                      onClick={() => setDpdpConsent(!dpdpConsent)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        dpdpConsent ? "bg-blue-500" : "bg-slate-700"
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        dpdpConsent ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Local AES Encryption */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">Hardware-Keystore Encryption</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                      All health logs and diagnostic files are encrypted locally on this device using AES-256 before synchronization.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">AES Encryption</span>
                    <button
                      onClick={() => setDataEncryption(!dataEncryption)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        dataEncryption ? "bg-blue-500" : "bg-slate-700"
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        dataEncryption ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>

                {/* ABDM Data Sync */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">ABDM Health Locker Sync</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                      Interoperable synchronization of family metrics to the National Health Authority gateway using secure tokens.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">ABDM Sync</span>
                    <button
                      onClick={() => setAbhaSync(!abhaSync)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        abhaSync ? "bg-blue-500" : "bg-slate-700"
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        abhaSync ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Deletion (DPDP Compliance) */}
              <div className="p-4 bg-red-950/20 border border-red-900/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Lock className="h-5 w-5 text-coral-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">Right to be Forgotten (Data Purging)</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Delete all your records, reports, family associations, and health histories instantly from our systems.</p>
                  </div>
                </div>
                <button 
                  onClick={() => triggerCelebration("Purge command initiated. All cloud backups scheduled for deletion.")}
                  className="px-4 py-2 bg-red-900/80 hover:bg-red-900 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Purge My Account Vitals
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. TABS / MODULE SELECTOR MENU */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto gap-2 pb-2">
          {[
            { id: "home", label: "Dashboard", icon: Activity },
            { id: "copilot", label: "AI Copilot", icon: Sparkles },
            { id: "reports", label: "Report Vault", icon: Upload },
            { id: "risk", label: "Risk Engine", icon: AlertTriangle },
            { id: "habits", label: "Habits & Meds", icon: Dumbbell },
            { id: "abdm", label: "ABDM Sandbox", icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "home" | "copilot" | "reports" | "risk" | "habits" | "abdm")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                    : "bg-slate-800 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 6. TAB CONTENT RENDERER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              
              {/* TAB: HOME / VITALS DASHBOARD */}
              {activeTab === "home" && (
                <motion.div 
                  key="home"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  {/* Alert banner if active profile has critical alerts */}
                  {activeProfile.alerts.length > 0 && (
                    <div className="p-4 bg-coral-500/10 border border-coral-500/20 rounded-3xl flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-coral-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-coral-400 uppercase tracking-wide">Needs Care Attention</span>
                        <ul className="list-disc pl-4 space-y-1">
                          {activeProfile.alerts.map((al, idx) => (
                            <li key={idx} className="text-xs text-slate-300 leading-relaxed">{al}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Vitals Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* BP Vital Card */}
                    <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 bg-red-500/10 text-red-500 rounded-xl">
                            <Heart className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">Blood Pressure</span>
                            <span className="font-heading font-black text-2xl text-slate-100">
                              {activeProfile.vitals.bloodPressure.systolic}/{activeProfile.vitals.bloodPressure.diastolic}
                              <span className="text-xs font-normal text-slate-500 ml-1">mmHg</span>
                            </span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          activeProfile.vitals.bloodPressure.systolic > 140
                            ? "bg-red-950/50 text-red-400 border-red-900"
                            : activeProfile.vitals.bloodPressure.systolic > 125
                            ? "bg-yellow-950/50 text-yellow-400 border-yellow-900"
                            : "bg-green-950/50 text-green-400 border-green-900"
                        }`}>
                          {activeProfile.vitals.bloodPressure.systolic > 140 ? "Hypertensive" : activeProfile.vitals.bloodPressure.systolic > 125 ? "Borderline" : "Normal"}
                        </span>
                      </div>

                      {/* SVG Mini Trend line */}
                      <div className="h-14 w-full flex items-end mb-4">
                        <svg className="h-full w-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <polyline
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2.5"
                            points={activeProfile.vitals.bloodPressure.history.map((h, i) => `${(i / (activeProfile.vitals.bloodPressure.history.length - 1)) * 100},${30 - (h.sys - 100) / 2}`).join(" ")}
                          />
                        </svg>
                      </div>

                      <button
                        onClick={() => { setVitalTypeToLog("BP"); setVitalsModalOpen(true); }}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 border border-slate-700/80 rounded-2xl text-xs font-bold text-slate-300 hover:text-slate-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Log BP Reading
                      </button>
                    </div>

                    {/* Sugar Vital Card */}
                    <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 bg-yellow-500/10 text-yellow-500 rounded-xl">
                            <Activity className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">Blood Sugar ({activeProfile.vitals.bloodSugar.type})</span>
                            <span className="font-heading font-black text-2xl text-slate-100">
                              {activeProfile.vitals.bloodSugar.value}
                              <span className="text-xs font-normal text-slate-500 ml-1">mg/dL</span>
                            </span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          activeProfile.vitals.bloodSugar.value > 140
                            ? "bg-red-950/50 text-red-400 border-red-900"
                            : activeProfile.vitals.bloodSugar.value > 100
                            ? "bg-yellow-950/50 text-yellow-400 border-yellow-900"
                            : "bg-green-950/50 text-green-400 border-green-900"
                        }`}>
                          {activeProfile.vitals.bloodSugar.value > 140 ? "Elevated" : activeProfile.vitals.bloodSugar.value > 100 ? "Borderline" : "Normal"}
                        </span>
                      </div>

                      {/* SVG Mini Trend line */}
                      <div className="h-14 w-full flex items-end mb-4">
                        <svg className="h-full w-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <polyline
                            fill="none"
                            stroke="#eab308"
                            strokeWidth="2.5"
                            points={activeProfile.vitals.bloodSugar.history.map((h, i) => `${(i / (activeProfile.vitals.bloodSugar.history.length - 1)) * 100},${30 - (h.value - 70) / 3}`).join(" ")}
                          />
                        </svg>
                      </div>

                      <button
                        onClick={() => { setVitalTypeToLog("Sugar"); setVitalsModalOpen(true); }}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 border border-slate-700/80 rounded-2xl text-xs font-bold text-slate-300 hover:text-slate-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Log Sugar Reading
                      </button>
                    </div>

                    {/* Weight Vital Card */}
                    <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 bg-green-500/10 text-green-500 rounded-xl">
                            <Sliders className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">Body Weight</span>
                            <span className="font-heading font-black text-2xl text-slate-100">
                              {activeProfile.vitals.weight.value}
                              <span className="text-xs font-normal text-slate-500 ml-1">{activeProfile.vitals.weight.unit}</span>
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900/50 text-slate-400 border border-slate-700 text-[10px] font-bold">
                          Stable BMI
                        </span>
                      </div>

                      {/* SVG Mini Trend line */}
                      <div className="h-14 w-full flex items-end mb-4">
                        <svg className="h-full w-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <polyline
                            fill="none"
                            stroke="#22c55e"
                            strokeWidth="2.5"
                            points={activeProfile.vitals.weight.history.map((h, i) => `${(i / (activeProfile.vitals.weight.history.length - 1)) * 100},${30 - (h.value - 15) / 2}`).join(" ")}
                          />
                        </svg>
                      </div>

                      <button
                        onClick={() => { setVitalTypeToLog("Weight"); setVitalsModalOpen(true); }}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 border border-slate-700/80 rounded-2xl text-xs font-bold text-slate-300 hover:text-slate-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Log Weight Log
                      </button>
                    </div>

                    {/* Heart Rate Card */}
                    <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                            <Heart className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase">Resting Pulse</span>
                            <span className="font-heading font-black text-2xl text-slate-100">
                              {activeProfile.vitals.heartRate.value}
                              <span className="text-xs font-normal text-slate-500 ml-1">{activeProfile.vitals.heartRate.unit}</span>
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-green-950/50 text-green-400 border border-green-900 text-[10px] font-bold animate-pulse">
                          Normal HR
                        </span>
                      </div>

                      {/* SVG Mini Trend line */}
                      <div className="h-14 w-full flex items-end mb-4">
                        <svg className="h-full w-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <polyline
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2.5"
                            points={activeProfile.vitals.heartRate.history.map((h, i) => `${(i / (activeProfile.vitals.heartRate.history.length - 1)) * 100},${30 - (h.value - 50) / 1.5}`).join(" ")}
                          />
                        </svg>
                      </div>

                      <button
                        onClick={() => { setVitalTypeToLog("HR"); setVitalsModalOpen(true); }}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 border border-slate-700/80 rounded-2xl text-xs font-bold text-slate-300 hover:text-slate-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Log Pulse Reading
                      </button>
                    </div>

                  </div>

                  {/* Vitals History & Explainers (Trust Layer) */}
                  <div className="p-6 bg-slate-800 rounded-3xl border border-slate-700/80 space-y-4">
                    <h3 className="font-heading font-bold text-sm text-slate-100 flex items-center gap-2">
                      <Info className="h-4.5 w-4.5 text-blue-400" />
                      Preventive Metric Threshold Explanations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
                      <div className="p-3 bg-slate-900/40 rounded-2xl space-y-1">
                        <strong className="text-slate-300 font-semibold">Blood Pressure (WHO standards)</strong>
                        <p className="leading-relaxed">Normal is below 120/80 mmHg. Stage 1 Hypertension occurs above 130/80. Immediate physician guidance should be sought if values exceed 160/100 repeatedly.</p>
                      </div>
                      <div className="p-3 bg-slate-900/40 rounded-2xl space-y-1">
                        <strong className="text-slate-300 font-semibold">Glycemic Index (ADA Standards)</strong>
                        <p className="leading-relaxed">Fasting Sugar should remain below 99 mg/dL. Pre-diabetic ranges lie between 100-125 mg/dL. High values above 126 mg/dL map to active diabetic progression.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB: AI COPILOT */}
              {activeTab === "copilot" && (
                <motion.div 
                  key="copilot"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="glass-card bg-slate-800/80 border-slate-700/80 rounded-3xl p-6 flex flex-col h-[560px]"
                >
                  {/* Assistant Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                        <Sparkles className="h-5 w-5 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm text-slate-100">AI Health Copilot</h3>
                        <span className="text-[10px] text-slate-500">Continuous Clinical Guideline Retrieval Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Languages className="h-4.5 w-4.5 text-slate-400" />
                      <select
                        value={chatLanguage}
                        onChange={(e) => setChatLanguage(e.target.value as "English" | "Hindi")}
                        className="bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold px-2.5 py-1 text-slate-300 focus:outline-none cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">हिन्दी (Hindi)</option>
                      </select>
                    </div>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
                    {(chatMessages[activeProfileId] || []).map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                      >
                        <div className={`p-4 rounded-3xl text-xs leading-relaxed ${
                          msg.role === "user" 
                            ? "bg-blue-500 text-white rounded-br-none" 
                            : "bg-slate-900 border border-slate-700 text-slate-200 rounded-bl-none"
                        }`}>
                          <p className="whitespace-pre-line">{msg.text}</p>
                        </div>
                        {msg.source && (
                          <span className="text-[9px] text-slate-500 font-bold mt-1 flex items-center gap-1">
                            🛡️ Reference: {msg.source}
                          </span>
                        )}
                        <span className="text-[9px] text-slate-500 mt-0.5">{msg.time}</span>
                      </div>
                    ))}
                    {isBotTyping && (
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 p-4 rounded-3xl rounded-bl-none max-w-[120px] mr-auto">
                        <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" />
                        <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                        <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Suggestion Prompts */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      activeProfileId === "father" ? "Why is my BP high?" : "What does HbA1c mean?",
                      "What should I improve first?",
                      "What should I discuss with my doctor?"
                    ].map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setChatInput(prompt);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700/60 text-[10px] font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  {/* Input form */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask about vitals, lab values, or medications..."
                      className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs focus:outline-none focus:border-blue-500 transition-colors text-slate-100"
                    />
                    <button 
                      onClick={() => triggerCelebration("Voice assistant listening... Speak in English or Hindi.")}
                      className="p-3 bg-slate-900 hover:bg-slate-700 border border-slate-700/80 rounded-2xl text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      <Mic className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="p-3 bg-blue-500 hover:bg-blue-600 rounded-2xl text-white transition-colors cursor-pointer"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB: REPORT VAULT / OCR PARSER */}
              {activeTab === "reports" && (
                <motion.div 
                  key="reports"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="glass-card bg-slate-800/80 border-slate-700/80 rounded-3xl p-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-slate-100">AI Report Intelligence & OCR Parser</h3>
                        <p className="text-xs text-slate-400">Select a mock laboratory report file to trigger the structured OCR extraction pipeline.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {MOCK_REPORTS_TEMPLATES.map((tpl) => (
                        <button
                          key={tpl.id}
                          onClick={() => {
                            setSelectedReportTemplate(tpl.id);
                            setReportSuccess(false);
                            setParsedReport(null);
                          }}
                          className={`p-4 border rounded-2xl text-left flex flex-col justify-between h-28 transition-all cursor-pointer ${
                            selectedReportTemplate === tpl.id
                              ? "bg-blue-500/10 border-blue-500 text-blue-400"
                              : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                          }`}
                        >
                          <FileText className="h-6 w-6" />
                          <div>
                            <span className="text-xs font-bold block truncate">{tpl.title}</span>
                            <span className="text-[10px] text-slate-500 block mt-1">Template Date: {tpl.date}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={handleOcrProcess}
                        disabled={!selectedReportTemplate || isOcrProcessing}
                        className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 text-white rounded-2xl text-xs font-bold transition-all shadow-lg hover:shadow-blue-500/15 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isOcrProcessing ? (
                          <>
                            <RefreshCw className="animate-spin h-4 w-4" />
                            Analyzing with Document AI OCR...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Initiate OCR Pipeline Extraction
                          </>
                        )}
                      </button>
                      
                      <button 
                        onClick={() => triggerCelebration("Report sharing configuration enabled. Doctor security link copied.")}
                        className="p-3 bg-slate-900 hover:bg-slate-700 border border-slate-700/80 rounded-2xl text-slate-300 hover:text-slate-100 transition-colors flex items-center gap-2 text-xs font-bold cursor-pointer"
                      >
                        <Share2 className="h-4.5 w-4.5" />
                        Share Settings
                      </button>
                    </div>
                  </div>

                  {/* OCR Results Panel */}
                  {parsedReport && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card bg-slate-800/80 border-slate-700/80 rounded-3xl p-6 space-y-6"
                    >
                      <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                        <div>
                          <span className="text-[10px] text-green-400 font-bold block uppercase tracking-wide">✓ Structured Extraction Completed</span>
                          <h4 className="font-heading font-bold text-base text-slate-100">{parsedReport.title}</h4>
                        </div>
                        <span className="text-xs text-slate-400">{parsedReport.date}</span>
                      </div>

                      {/* Parameters Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300">
                          <thead>
                            <tr className="border-b border-slate-700/50 text-slate-400 font-semibold">
                              <th className="py-2">Biomarker / Test</th>
                              <th className="py-2">Parsed Value</th>
                              <th className="py-2">Reference Range</th>
                              <th className="py-2 text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700/40">
                            {parsedReport.parameters.map((param: ReportParameter, idx: number) => (
                              <tr key={idx} className="hover:bg-slate-900/20">
                                <td className="py-3 font-medium text-slate-200">{param.name}</td>
                                <td className="py-3 font-bold text-slate-100">{param.value} <span className="text-[10px] font-normal text-slate-500">{param.unit}</span></td>
                                <td className="py-3 text-slate-400">{param.normalRange}</td>
                                <td className="py-3 text-right">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                    param.status === "Abnormal"
                                      ? "bg-red-950/50 text-red-400 border-red-900"
                                      : param.status === "Borderline"
                                      ? "bg-yellow-950/50 text-yellow-400 border-yellow-900"
                                      : "bg-green-950/50 text-green-400 border-green-900"
                                  }`}>
                                    {param.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* AI Summary */}
                      <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700 space-y-2">
                        <span className="text-[10px] text-blue-400 font-bold block uppercase tracking-wide">Plain-Language Diagnostic Breakdown</span>
                        <p className="text-xs text-slate-300 leading-relaxed">{parsedReport.summary}</p>
                      </div>

                      {/* Doctor Consultation Sheet Generator */}
                      <div className="p-4 bg-blue-950/20 border border-blue-900/40 rounded-2xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-blue-400 font-bold block uppercase tracking-wide">GP Consultation Preparation questions</span>
                          <button 
                            onClick={() => triggerCelebration("Consultation prep sheet compiled as PDF. Ready to download.")}
                            className="text-[10px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                          >
                            <FileDown className="h-3.5 w-3.5" />
                            Export Card
                          </button>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4 leading-relaxed">
                          {parsedReport.doctorPrep.map((q: string, i: number) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* TAB: RISK ASSESSMENT ENGINE */}
              {activeTab === "risk" && (
                <motion.div 
                  key="risk"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="glass-card bg-slate-800/80 border-slate-700/80 rounded-3xl p-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-slate-100">Preventive Disease Engine</h3>
                        <p className="text-xs text-slate-400">Maps user vitals and laboratory historical data to estimate 5-year chronic vulnerability risk categories.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      
                      {/* Diabetes Risk */}
                      <div className="p-5 bg-slate-900/60 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-xs font-bold text-slate-300 block mb-1">Type 2 Diabetes Risk</span>
                          <p className="text-[10px] text-slate-500 leading-relaxed">Based on ADA guidelines using Fasting Sugar averages, age, and weight trajectories.</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black ${
                            activeProfileId === "father" ? "text-coral-500" : activeProfileId === "mother" ? "text-yellow-400" : "text-green-400"
                          }`}>
                            {activeProfileId === "father" ? "High Risk (78%)" : activeProfileId === "mother" ? "Moderate (24%)" : "Low Risk (8%)"}
                          </span>
                        </div>
                      </div>

                      {/* Cardiovascular Risk */}
                      <div className="p-5 bg-slate-900/60 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-xs font-bold text-slate-300 block mb-1">Cardiovascular (ASCVD) Risk</span>
                          <p className="text-[10px] text-slate-500 leading-relaxed">Calculates risks of myocardial events using blood pressure, lipid indices, and age.</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black ${
                            activeProfileId === "father" ? "text-coral-500" : activeProfileId === "mother" ? "text-yellow-400" : "text-green-400"
                          }`}>
                            {activeProfileId === "father" ? "High Risk (42%)" : activeProfileId === "mother" ? "Moderate (18%)" : "Low Risk (3%)"}
                          </span>
                        </div>
                      </div>

                      {/* Fatty Liver Risk */}
                      <div className="p-5 bg-slate-900/60 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-xs font-bold text-slate-300 block mb-1">Fatty Liver (NAFLD) Risk</span>
                          <p className="text-[10px] text-slate-500 leading-relaxed">Combines Waist Circumference, Triglycerides, and BMI estimations.</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black ${
                            activeProfileId === "father" ? "text-yellow-400" : "text-green-400"
                          }`}>
                            {activeProfileId === "father" ? "Moderate (34%)" : "Low Risk (<10%)"}
                          </span>
                        </div>
                      </div>

                    </div>

                    <div className="p-4 bg-slate-900/40 rounded-2xl text-[10px] text-slate-500 leading-relaxed border border-slate-700 flex items-start gap-2">
                      <ShieldCheck className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Crucial Disclaimer:</strong> SUMINO provides software-driven preventive alerts using peer-reviewed guidelines. We do not diagnose diseases, issue treatments, or substitute professional physician clinical judgments. Always consult a general practitioner for changes to medication or diagnosis.
                      </span>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB: HABITS & MEDS */}
              {activeTab === "habits" && (
                <motion.div 
                  key="habits"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Habit coach check-in checklist */}
                    <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 space-y-6">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <Dumbbell className="h-5 w-5 text-blue-400" />
                          <h3 className="font-heading font-bold text-base text-slate-100">Habit Coach</h3>
                        </div>
                        <span className="text-xs text-green-400 font-bold">Streak: {habitStreak} Days 🔥</span>
                      </div>

                      <div className="space-y-4">
                        {/* Step habit */}
                        <div className="p-4 bg-slate-900/45 rounded-2xl border border-slate-700 space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-300">🚶 Steps target</span>
                            <span className="font-bold text-slate-200">{activeProfile.habits.steps.current} / {activeProfile.habits.steps.target} steps</span>
                          </div>
                          <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 transition-all duration-300"
                              style={{ width: `${Math.min(100, (activeProfile.habits.steps.current / activeProfile.habits.steps.target) * 100)}%` }}
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => addSteps(1000)}
                              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-300 rounded-lg cursor-pointer"
                            >
                              +1,000 steps
                            </button>
                            <button
                              onClick={() => addSteps(3000)}
                              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-300 rounded-lg cursor-pointer"
                            >
                              +3,000 steps
                            </button>
                          </div>
                        </div>

                        {/* Water habit with simulated dynamic wave container */}
                        <div className="p-4 bg-slate-900/45 rounded-2xl border border-slate-700 space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-300">💧 Hydration log</span>
                            <span className="font-bold text-slate-200">{activeProfile.habits.water.current} / {activeProfile.habits.water.target} ml</span>
                          </div>
                          <div className="h-10 w-full bg-slate-700 rounded-2xl overflow-hidden relative flex items-center justify-center">
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-blue-500/30 transition-all duration-550 flex items-center justify-center"
                              style={{ height: `${(activeProfile.habits.water.current / activeProfile.habits.water.target) * 100}%` }}
                            />
                            <span className="text-[10px] font-bold z-10 text-slate-200">
                              {Math.round((activeProfile.habits.water.current / activeProfile.habits.water.target) * 100)}% filled
                            </span>
                          </div>
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => addWater(250)}
                              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-300 rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              <Droplet className="h-3 w-3 text-blue-400" />
                              +250ml (Cup)
                            </button>
                            <button
                              onClick={() => addWater(750)}
                              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-300 rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              <Droplet className="h-3 w-3 text-blue-400" />
                              +750ml (Bottle)
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Medication schedule tracker */}
                    <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 space-y-6">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-400" />
                          <h3 className="font-heading font-bold text-base text-slate-100">Medication Assistant</h3>
                        </div>
                        <span className="text-xs text-slate-400">Adherence Score: {Math.round((activeProfile.medications.filter(m => m.taken).length / activeProfile.medications.length) * 100)}%</span>
                      </div>

                      <div className="space-y-3">
                        {activeProfile.medications.map((med, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => toggleMedication(idx)}
                            className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                              med.taken 
                                ? "bg-green-950/20 border-green-900/60 text-green-400"
                                : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`h-2.5 w-2.5 rounded-full ${
                                med.timing === "Morning" ? "bg-yellow-400" : med.timing === "Afternoon" ? "bg-orange-400" : "bg-indigo-500"
                              }`} />
                              <div>
                                <span className="text-xs font-bold block">{med.name}</span>
                                <span className="text-[10px] text-slate-500 block">{med.dosage} • {med.timing}</span>
                              </div>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={med.taken}
                              onChange={() => {}} 
                              className="h-4 w-4 text-blue-500 rounded border-slate-700 bg-slate-800 focus:ring-blue-500"
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => triggerCelebration("Add medication dialog. Input fields configuration.")}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 border border-slate-700/80 rounded-2xl text-xs font-bold text-slate-300 hover:text-slate-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Add Medication Reminder
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* TAB: ABDM SANDBOX */}
              {activeTab === "abdm" && (
                <motion.div 
                  key="abdm"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="glass-card bg-slate-800/80 border-slate-700/80 rounded-3xl p-6 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-base text-slate-100">National Health ID (ABHA Sandbox)</h3>
                          <p className="text-xs text-slate-400">Ayushman Bharat Digital Mission (ABDM) Integration Gateway</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-green-950/50 text-green-400 border border-green-900 text-[10px] font-bold">
                        ABDM Standard Compliant
                      </span>
                    </div>

                    {abhaIsVerified ? (
                      /* Display ABHA Digital Card */
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-7 flex justify-center">
                          <div className="w-full max-w-sm bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl border border-white/20 p-5 shadow-2xl relative overflow-hidden text-slate-200">
                            <div className="absolute -right-10 -bottom-10 h-36 w-36 bg-white/5 rounded-full blur-xl" />
                            
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <span className="text-[10px] font-black text-blue-400 tracking-wider block">ABHA CARD</span>
                                <span className="text-[8px] text-slate-400">National Health Authority, India</span>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white font-bold border border-white/10">NDHM</span>
                            </div>

                            <div className="flex gap-4 items-center mb-6">
                              <div className="h-14 w-14 bg-slate-800 rounded-xl border border-white/10 flex items-center justify-center text-slate-400">
                                <User className="h-8 w-8" />
                              </div>
                              <div>
                                <h4 className="font-heading font-bold text-sm text-white">{activeProfile.name}</h4>
                                <span className="text-xs font-semibold block mt-0.5 text-blue-300">{activeProfile.abhaAddress}</span>
                                <span className="text-[10px] text-slate-400 block mt-0.5">Gender: {activeProfile.gender} • DOB: 1992</span>
                              </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-white/10 pt-4 text-xs font-bold text-slate-300">
                              <div>
                                <span className="text-[8px] text-slate-500 block">ABHA Number</span>
                                <span>91-8022-9018-4421</span>
                              </div>
                              <div className="h-8 w-8 bg-white rounded flex items-center justify-center p-1">
                                <svg className="h-full w-full text-slate-900" viewBox="0 0 100 100">
                                  <rect x="5" y="5" width="20" height="20" />
                                  <rect x="75" y="5" width="20" height="20" />
                                  <rect x="5" y="75" width="20" height="20" />
                                  <rect x="40" y="40" width="20" height="20" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ABDM Actions & Consents */}
                        <div className="md:col-span-5 space-y-4">
                          <h4 className="text-xs font-bold text-slate-300">Active ABDM Consents</h4>
                          <div className="space-y-3">
                            {consentRequests.map((c) => (
                              <div key={c.id} className="p-3 bg-slate-900/60 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-3">
                                <div>
                                  <span className="text-[10px] text-slate-500 font-bold block">{c.requester}</span>
                                  <span className="text-xs font-semibold text-slate-300 block mt-1">{c.purpose}</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="text-slate-500">Exp: {c.expiry}</span>
                                  <button
                                    onClick={() => toggleConsent(c.id)}
                                    className={`px-3 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                                      c.status === "Approved"
                                        ? "bg-green-950/40 text-green-400 border-green-900"
                                        : "bg-blue-500/10 text-blue-400 border-blue-800 hover:bg-blue-500/20"
                                    }`}
                                  >
                                    {c.status}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Mock ABHA creation flow wizard */
                      <div className="max-w-md mx-auto space-y-4 py-4">
                        {abhaStep === 1 ? (
                          <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-250">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 mb-1">Aadhaar Number (12 Digits)</label>
                              <input
                                type="text"
                                maxLength={12}
                                value={abhaAadhaar}
                                onChange={(e) => setAbhaAadhaar(e.target.value.replace(/\D/g, ""))}
                                placeholder="0000 0000 0000"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <button
                              onClick={handleCreateAbha}
                              disabled={abhaAadhaar.length !== 12}
                              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 text-white rounded-2xl text-xs font-bold transition-colors cursor-pointer"
                            >
                              Request Aadhaar OTP Validation
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-250">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 mb-1">Enter 4-Digit OTP sent to your phone</label>
                              <input
                                type="text"
                                maxLength={4}
                                value={abhaOtp}
                                onChange={(e) => setAbhaOtp(e.target.value.replace(/\D/g, ""))}
                                placeholder="Enter 1234 (Mock Code)"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-slate-100 focus:outline-none focus:border-blue-500 text-center tracking-widest font-black"
                              />
                            </div>
                            <button
                              onClick={handleCreateAbha}
                              disabled={abhaOtp.length !== 4}
                              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 text-white rounded-2xl text-xs font-bold transition-colors cursor-pointer"
                            >
                              Complete Verification & Create ID
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Sidebar: Health Score, Family OS summary, Warnings */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Single Health Score Card */}
            <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 relative overflow-hidden text-center flex flex-col items-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-4">Overall Family Wellness Score</span>
              
              {/* Radial Progress Score */}
              <div className="relative h-36 w-36 flex items-center justify-center mb-4">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={activeProfile.healthScore > 80 ? "#22c55e" : activeProfile.healthScore > 60 ? "#eab308" : "#ef4444"}
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * activeProfile.healthScore) / 100}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-heading font-black text-4xl text-slate-100">{activeProfile.healthScore}</span>
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Index score</span>
                </div>
              </div>

              {/* Subscores Breakdowns */}
              <div className="w-full space-y-2.5 pt-4 border-t border-slate-700/60 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Heart Health Index</span>
                  <span className="font-bold text-slate-200">88/100</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Metabolic Stability</span>
                  <span className="font-bold text-slate-200">{activeProfileId === "father" ? "48/100 (Low)" : "82/100"}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Glycemic Control</span>
                  <span className="font-bold text-slate-200">{activeProfileId === "father" ? "52/100 (Low)" : "85/100"}</span>
                </div>
              </div>
            </div>

            {/* Family Health OS Core Moat Widget */}
            <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-blue-400" />
                  <h3 className="font-heading font-bold text-base text-slate-100">Family Health OS</h3>
                </div>
                <button 
                  onClick={() => triggerCelebration("Initiated emergency notification broadcast across all family profiles.")}
                  className="px-3 py-1 bg-red-950/50 border border-red-900/50 text-[10px] font-bold text-coral-400 rounded-xl hover:bg-red-900/40 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  SOS Alert
                </button>
              </div>

              {/* Mini family cards list */}
              <div className="space-y-3">
                {Object.keys(profiles).map((pId) => {
                  const prof = profiles[pId];
                  return (
                    <div 
                      key={pId}
                      onClick={() => setActiveProfileId(pId)}
                      className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        activeProfileId === pId
                          ? "bg-slate-900 border-blue-500/80 text-slate-100"
                          : "bg-slate-900/40 border-slate-700 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          prof.healthScore > 80 ? "bg-green-500/10 text-green-400" : prof.healthScore > 60 ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-500"
                        }`}>
                          {prof.healthScore}
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{prof.name}</span>
                          <span className="text-[10px] text-slate-500 block">{prof.role} • {prof.chronicConditions.slice(0, 1).join("") || "Healthy"}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-600" />
                    </div>
                  );
                })}
              </div>

              {/* Family Risk Heatmap */}
              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Family Risk Heatmap</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Active indicators show a hereditary vulnerability for <strong className="text-slate-300 font-medium">Type 2 Diabetes</strong> (Father diagnosed, Self in pre-diabetic monitoring). Diet logs sync shared parameters.
                </p>
              </div>
            </div>

            {/* Gamification / Streaks & Milestones */}
            <div className="glass-card bg-slate-800/80 border-slate-700/60 rounded-3xl p-6 space-y-4">
              <h4 className="font-heading font-bold text-sm text-slate-100 flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-blue-400 animate-bounce" />
                Active Health Milestones
              </h4>
              <div className="space-y-3">
                {activeProfile.milestones.map((ms, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/50 border border-slate-700 rounded-2xl text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{ms}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 7. VITALS LOGGING MODAL CONTAINER */}
      <AnimatePresence>
        {vitalsModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-slate-800 rounded-3xl border border-slate-700 p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-700 mb-6">
                <h3 className="font-heading font-bold text-base text-slate-100">Log Family Health Indicator</h3>
                <button 
                  onClick={() => setVitalsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                
                {vitalTypeToLog === "BP" && (
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-400 block mb-1">Blood Pressure reading</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Systolic (Top Value)</label>
                        <input
                          type="number"
                          value={bpSysInput}
                          onChange={(e) => setBpSysInput(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-slate-100 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Diastolic (Bottom Value)</label>
                        <input
                          type="number"
                          value={bpDiaInput}
                          onChange={(e) => setBpDiaInput(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-slate-100 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {vitalTypeToLog === "Sugar" && (
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-400 block mb-1">Blood Sugar Value (mg/dL)</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Glucose Level</label>
                        <input
                          type="number"
                          value={sugarInput}
                          onChange={(e) => setSugarInput(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-slate-100 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Timing Status</label>
                        <select
                          value={sugarType}
                          onChange={(e) => setSugarType(e.target.value as "Fasting" | "Post-Prandial")}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-slate-100 focus:outline-none cursor-pointer"
                        >
                          <option value="Fasting">Fasting</option>
                          <option value="Post-Prandial">Post-Prandial (After Food)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {vitalTypeToLog === "Weight" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 mb-1">Body Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={weightInput}
                      onChange={(e) => setWeightInput(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                )}

                {vitalTypeToLog === "HR" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 mb-1">Resting Heart Rate (bpm)</label>
                    <input
                      type="number"
                      value={hrInput}
                      onChange={(e) => setHrInput(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                )}

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={handleAddVital}
                    className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 rounded-2xl text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Save Log to Vault
                  </button>
                  <button
                    onClick={() => setVitalsModalOpen(false)}
                    className="px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-2xl text-xs font-semibold text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
