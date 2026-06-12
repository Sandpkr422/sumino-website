"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Search, 
  FileText, 
  Calendar, 
  Settings, 
  Video, 
  Image as ImageIcon,
  CheckCircle, 
  Clock, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Plus, 
  AlertCircle,
  Loader2,
  CalendarDays,
  Send,
  Eye,
  Sliders
} from "lucide-react";

// Custom inline SVG icons for Twitter/X and LinkedIn to avoid compilation errors
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

// Types matching the backend API
interface PubMedArticle {
  title: string;
  journal: string;
  pubDate: string;
  id: string;
  link: string;
}

interface ResearchReport {
  id: string;
  topic: string;
  category: string;
  summary: string;
  keyFindings: string[];
  preventiveRecommendations: string[];
  clinicalGuidelines: string[];
  sources: PubMedArticle[];
  timestamp: string;
}

interface VideoScript {
  title: string;
  hook: string;
  body: string;
  cta: string;
}

interface GeneratedPost {
  id: string;
  researchId: string;
  topic: string;
  category: string;
  tone: string;
  status: "draft" | "scheduled" | "published";
  scheduledDate: string | null;
  twitterThread: string[];
  linkedinPost: string;
  videoScript: VideoScript;
  imagePrompt: string;
  createdAt: string;
}

export default function SocialDashboard() {
  // Navigation / Tabs state
  const [activeTab, setActiveTab] = useState<"research" | "drafts" | "assets" | "calendar" | "settings">("research");
  
  // Data lists
  const [researchList, setResearchList] = useState<ResearchReport[]>([]);
  const [postsList, setPostsList] = useState<GeneratedPost[]>([]);
  
  // Selected items
  const [selectedResearch, setSelectedResearch] = useState<ResearchReport | null>(null);
  const [selectedPost, setSelectedPost] = useState<GeneratedPost | null>(null);
  
  // Research Form state
  const [topicInput, setTopicInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("Preventive Healthcare");
  const [isResearching, setIsResearching] = useState(false);
  const [researchError, setResearchError] = useState("");
  
  // Generator Form state
  const [selectedResearchId, setSelectedResearchId] = useState("");
  const [toneInput, setToneInput] = useState("Empathetic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorError, setGeneratorError] = useState("");

  // Settings / API Key state
  const [geminiKey, setGeminiKey] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  // Editing state
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedTweets, setEditedTweets] = useState<string[]>([]);
  const [editedLinkedIn, setEditedLinkedIn] = useState("");
  const [editedScript, setEditedScript] = useState<VideoScript>({ title: "", hook: "", body: "", cta: "" });
  const [editedImagePrompt, setEditedImagePrompt] = useState("");
  
  // Scheduling state
  const [schedulingPostId, setSchedulingPostId] = useState<string | null>(null);
  const [scheduleDate, setScheduleDate] = useState("");

  // Load research, posts, and saved API Key from localStorage
  useEffect(() => {
    fetchResearch();
    fetchPosts();
    const savedKey = localStorage.getItem("sumino_gemini_key");
    if (savedKey) {
      setGeminiKey(savedKey);
    }
  }, []);

  const fetchResearch = async () => {
    try {
      const res = await fetch("/api/social/posts?filter=research");
      if (res.ok) {
        const data = await res.json();
        setResearchList(data.research || []);
        if (data.research && data.research.length > 0 && !selectedResearch) {
          setSelectedResearch(data.research[0]);
          setSelectedResearchId(data.research[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load research history", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/social/posts");
      if (res.ok) {
        const data = await res.json();
        setPostsList(data.posts || []);
        if (data.posts && data.posts.length > 0 && !selectedPost) {
          setSelectedPost(data.posts[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  // Trigger Research API
  const handleRunResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;

    setIsResearching(true);
    setResearchError("");

    try {
      const res = await fetch("/api/social/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": geminiKey ? `Bearer ${geminiKey}` : ""
        },
        body: JSON.stringify({
          topic: topicInput,
          category: categoryInput
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to perform research.");
      }

      const data = await res.json();
      const newReport: ResearchReport = data.research;
      
      setResearchList(prev => [newReport, ...prev]);
      setSelectedResearch(newReport);
      setSelectedResearchId(newReport.id);
      setTopicInput("");
      
      // Auto switch tabs to Content Drafts so they can generate next
      setActiveTab("drafts");
    } catch (err: any) {
      setResearchError(err.message || "Something went wrong.");
    } finally {
      setIsResearching(false);
    }
  };

  // Trigger Generate API
  const handleGenerateContent = async () => {
    const rId = selectedResearchId || (selectedResearch ? selectedResearch.id : "");
    if (!rId) {
      setGeneratorError("Please select a researched topic first.");
      return;
    }

    setIsGenerating(true);
    setGeneratorError("");

    try {
      const res = await fetch("/api/social/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": geminiKey ? `Bearer ${geminiKey}` : ""
        },
        body: JSON.stringify({
          researchId: rId,
          tone: toneInput
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to generate content.");
      }

      const data = await res.json();
      const newPost: GeneratedPost = data.post;
      
      setPostsList(prev => [newPost, ...prev]);
      setSelectedPost(newPost);
      
      // Set editing fields immediately
      setEditedTweets(newPost.twitterThread);
      setEditedLinkedIn(newPost.linkedinPost);
      setEditedScript(newPost.videoScript);
      setEditedImagePrompt(newPost.imagePrompt);
      
      // Auto switch to drafts view
      setActiveTab("drafts");
    } catch (err: any) {
      setGeneratorError(err.message || "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Save changes to draft
  const handleSavePostEdits = async () => {
    if (!selectedPost) return;

    try {
      const res = await fetch("/api/social/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedPost.id,
          twitterThread: editedTweets,
          linkedinPost: editedLinkedIn,
          videoScript: editedScript,
          imagePrompt: editedImagePrompt
        })
      });

      if (res.ok) {
        const data = await res.json();
        const updated: GeneratedPost = data.post;
        
        setPostsList(prev => prev.map(p => p.id === updated.id ? updated : p));
        setSelectedPost(updated);
        setIsEditingPost(false);
        alert("Draft changes saved successfully!");
      }
    } catch (err) {
      console.error("Failed to save post edits", err);
    }
  };

  // Delete a post
  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content draft?")) return;

    try {
      const res = await fetch(`/api/social/posts?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setPostsList(prev => prev.filter(p => p.id !== id));
        if (selectedPost && selectedPost.id === id) {
          const remaining = postsList.filter(p => p.id !== id);
          setSelectedPost(remaining.length > 0 ? remaining[0] : null);
        }
      }
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  // Schedule a post
  const handleSchedulePost = async (id: string) => {
    if (!scheduleDate) return;

    try {
      const res = await fetch("/api/social/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: "scheduled",
          scheduledDate: new Date(scheduleDate).toISOString()
        })
      });

      if (res.ok) {
        const data = await res.json();
        const updated: GeneratedPost = data.post;
        
        setPostsList(prev => prev.map(p => p.id === updated.id ? updated : p));
        if (selectedPost && selectedPost.id === updated.id) {
          setSelectedPost(updated);
        }
        setSchedulingPostId(null);
        setScheduleDate("");
        alert(`Content successfully scheduled for ${new Date(updated.scheduledDate!).toLocaleDateString()}`);
      }
    } catch (err) {
      console.error("Failed to schedule post", err);
    }
  };

  // Mark as published
  const handleMarkPublished = async (id: string) => {
    try {
      const res = await fetch("/api/social/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: "published"
        })
      });

      if (res.ok) {
        const data = await res.json();
        const updated: GeneratedPost = data.post;
        
        setPostsList(prev => prev.map(p => p.id === updated.id ? updated : p));
        if (selectedPost && selectedPost.id === updated.id) {
          setSelectedPost(updated);
        }
      }
    } catch (err) {
      console.error("Failed to mark published", err);
    }
  };

  // Save Gemini Key to LocalStorage
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sumino_gemini_key", geminiKey.trim());
    setSaveStatus("success");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  // Copy text to clipboard helper
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Initialize editing state when selected post changes
  useEffect(() => {
    if (selectedPost) {
      setEditedTweets(selectedPost.twitterThread);
      setEditedLinkedIn(selectedPost.linkedinPost);
      setEditedScript(selectedPost.videoScript);
      setEditedImagePrompt(selectedPost.imagePrompt);
      setIsEditingPost(false);
    }
  }, [selectedPost]);

  // Statistics
  const draftCount = postsList.filter(p => p.status === "draft").length;
  const scheduledCount = postsList.filter(p => p.status === "scheduled").length;
  const publishedCount = postsList.filter(p => p.status === "published").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-6 w-6 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold text-sm">S</span>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">SUMINO ADMIN SUITE</span>
            </div>
            <h1 className="text-3xl font-heading font-black text-blue-900 leading-tight">
              Social Media & Topic Research Hub
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed mt-1">
              Automate clinical research of health topics, generate brand-aligned, DPDP-compliant threads, video scripts, and visual prompts, and queue posts.
            </p>
          </div>

          {/* Quick Engine Status & Stats */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 ${
              geminiKey ? "bg-green-50 border-green-200 text-green-900" : "bg-blue-50 border-blue-200 text-blue-950"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${geminiKey ? "bg-green-600" : "bg-blue-500"}`} />
              {geminiKey ? "AI-Powered Engine (Gemini)" : "Local High-Fidelity Engine"}
            </span>

            <div className="flex items-center rounded-2xl bg-white border border-slate-200/80 px-4 py-2 shadow-sm text-xs font-semibold gap-4">
              <div className="text-center">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Research Logs</span>
                <span className="text-slate-800 text-sm font-bold">{researchList.length}</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="text-center">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Drafts</span>
                <span className="text-slate-800 text-sm font-bold">{draftCount}</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="text-center">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Scheduled</span>
                <span className="text-slate-800 text-sm font-bold">{scheduledCount}</span>
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE NAVIGATION TABS */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar gap-2">
          <button
            onClick={() => setActiveTab("research")}
            className={`px-5 py-3.5 font-heading text-sm font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "research"
                ? "border-blue-500 text-blue-500 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Search className="h-4 w-4" />
            Topic Research
          </button>
          <button
            onClick={() => setActiveTab("drafts")}
            className={`px-5 py-3.5 font-heading text-sm font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "drafts"
                ? "border-blue-500 text-blue-500 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <FileText className="h-4 w-4" />
            Content Drafts
          </button>
          <button
            onClick={() => setActiveTab("assets")}
            className={`px-5 py-3.5 font-heading text-sm font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "assets"
                ? "border-blue-500 text-blue-500 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            Visual Assets
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-5 py-3.5 font-heading text-sm font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "calendar"
                ? "border-blue-500 text-blue-500 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Content Calendar
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-3.5 font-heading text-sm font-semibold border-b-2 flex items-center gap-2 transition-all cursor-pointer ml-auto ${
              activeTab === "settings"
                ? "border-blue-500 text-blue-500 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>

        {/* WORKSPACE PAGES PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-12">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: TOPIC RESEARCH WORKSPACE */}
              {activeTab === "research" && (
                <motion.div
                  key="research"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left: Input parameters */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md">
                      <h2 className="text-lg font-heading font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-500" />
                        Initiate Auto-Research
                      </h2>
                      
                      <form onSubmit={handleRunResearch} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Topic / Health Focus
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Early warning signs of stroke"
                            value={topicInput}
                            onChange={(e) => setTopicInput(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl text-sm transition-all outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Content Category
                          </label>
                          <select
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-sm transition-all outline-none"
                          >
                            <option>Preventive Healthcare</option>
                            <option>Elderly Care</option>
                            <option>Chronic Disease</option>
                            <option>Child Health</option>
                            <option>Women's Health</option>
                            <option>Family Wellness</option>
                          </select>
                        </div>

                        {researchError && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            <span>{researchError}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isResearching || !topicInput.trim()}
                          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold rounded-full shadow-lg shadow-blue-500/10 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                        >
                          {isResearching ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Searching PubMed & Summarizing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" />
                              Run Automatic Research
                            </>
                          )}
                        </button>
                      </form>

                      {/* Informational Box */}
                      <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-[11px] text-slate-500 leading-relaxed space-y-2">
                        <p className="font-bold text-blue-950 flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                          Research Process Flow
                        </p>
                        <p>
                          1. Pulls matching scientific publications dynamically from the NCBI PubMed database.
                        </p>
                        <p>
                          2. Uses AI (or medical template models) to extract core guidelines, key statistical findings, and actionable home preventative tips.
                        </p>
                        <p>
                          3. Keeps content DPDP-compliant and aligned with ICMR/WHO medical standards.
                        </p>
                      </div>
                    </div>

                    {/* Research History List */}
                    <div className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Recent Research Reports
                      </h3>
                      {researchList.length === 0 ? (
                        <p className="text-xs text-slate-400">No research history yet.</p>
                      ) : (
                        <div className="space-y-2 max-h-[250px] overflow-y-auto no-scrollbar">
                          {researchList.map((res) => (
                            <button
                              key={res.id}
                              onClick={() => {
                                setSelectedResearch(res);
                                setSelectedResearchId(res.id);
                              }}
                              className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex flex-col gap-1 cursor-pointer ${
                                selectedResearch?.id === res.id
                                  ? "bg-blue-50 border-blue-200 text-blue-900 font-medium"
                                  : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex justify-between items-center w-full">
                                <span className="font-bold truncate max-w-[150px]">{res.topic}</span>
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                  {res.category}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400">
                                {new Date(res.timestamp).toLocaleDateString()}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Detailed Research Output */}
                  <div className="lg:col-span-8">
                    {selectedResearch ? (
                      <div className="glass-card p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-5 gap-4">
                          <div>
                            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold uppercase tracking-wider">
                              {selectedResearch.category}
                            </span>
                            <h2 className="text-2xl font-heading font-black text-slate-800 mt-2">
                              {selectedResearch.topic}
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">
                              Researched on: {new Date(selectedResearch.timestamp).toLocaleString()}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedResearchId(selectedResearch.id);
                              setActiveTab("drafts");
                            }}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-xs font-bold shadow-md shadow-green-600/10 hover:shadow-lg transition-all cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Unlock Content Drafts
                          </button>
                        </div>

                        {/* Summary */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Preventative Executive Summary
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100 font-medium">
                            {selectedResearch.summary}
                          </p>
                        </div>

                        {/* Key Findings */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Key Scientific Findings
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {selectedResearch.keyFindings.map((finding, idx) => (
                              <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-100/60 shadow-sm flex items-start gap-3">
                                <span className="h-6 w-6 rounded-lg bg-red-50 text-red-500 font-bold flex items-center justify-center text-xs flex-shrink-0">
                                  {idx + 1}
                                </span>
                                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                  {finding}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recommendations & Guidelines */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          
                          {/* Recommendations */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Preventive At-Home Actions
                            </h4>
                            <ul className="space-y-2">
                              {selectedResearch.preventiveRecommendations.map((rec, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed font-semibold">
                                  <span className="h-1.5 w-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Clinical Guidelines */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Clinical Standards Reference
                            </h4>
                            <div className="p-4 bg-blue-50/30 border border-blue-100/80 rounded-2xl space-y-2">
                              {selectedResearch.clinicalGuidelines.map((guide, idx) => (
                                <p key={idx} className="text-xs text-blue-900 leading-relaxed font-semibold">
                                  💡 {guide}
                                </p>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* PubMed Sources */}
                        <div className="border-t border-slate-100 pt-5 space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            PubMed Academic Citations
                          </h4>
                          <div className="space-y-2">
                            {selectedResearch.sources.map((art) => (
                              <div key={art.id} className="flex justify-between items-center p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-colors">
                                <div className="space-y-0.5 truncate max-w-[70%]">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                                    {art.journal} • {art.pubDate}
                                  </span>
                                  <span className="text-xs text-slate-700 font-semibold block truncate">
                                    {art.title}
                                  </span>
                                </div>
                                <a
                                  href={art.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-blue-600"
                                >
                                  PubMed
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="glass-card p-12 text-center rounded-3xl border border-slate-200/80 shadow-md">
                        <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-700">No Research Selected</h3>
                        <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">
                          Run a new automatic topic research or select an existing report from the history on the left.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: CONTENT DRAFTS */}
              {activeTab === "drafts" && (
                <motion.div
                  key="drafts"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column: Draft Picker & Content Generator trigger */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* Content Generator Control Panel */}
                    <div className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md">
                      <h2 className="text-lg font-heading font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Sliders className="h-5 w-5 text-blue-500" />
                        Content Configurator
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Step 1: Select Topic Research
                          </label>
                          <select
                            value={selectedResearchId}
                            onChange={(e) => setSelectedResearchId(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-sm transition-all outline-none"
                          >
                            <option value="">-- Choose Research Report --</option>
                            {researchList.map(r => (
                              <option key={r.id} value={r.id}>{r.topic} ({r.category})</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Step 2: Copy Tone Style
                          </label>
                          <select
                            value={toneInput}
                            onChange={(e) => setToneInput(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-sm transition-all outline-none"
                          >
                            <option>Empathetic</option>
                            <option>Clinical</option>
                            <option>Urgent</option>
                            <option>Informative</option>
                          </select>
                        </div>

                        {generatorError && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            <span>{generatorError}</span>
                          </div>
                        )}

                        <button
                          onClick={handleGenerateContent}
                          disabled={isGenerating || !selectedResearchId}
                          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-bold rounded-full shadow-lg shadow-green-600/10 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Generating Brand Copy...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" />
                              Generate Post Drafts
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Draft Feed List */}
                    <div className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Draft Content Queue
                      </h3>
                      {postsList.length === 0 ? (
                        <p className="text-xs text-slate-400">No content drafts created yet.</p>
                      ) : (
                        <div className="space-y-2 max-h-[250px] overflow-y-auto no-scrollbar">
                          {postsList.map((post) => (
                            <div
                              key={post.id}
                              onClick={() => {
                                setSelectedPost(post);
                              }}
                              className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex flex-col gap-1 cursor-pointer ${
                                selectedPost?.id === post.id
                                  ? "bg-blue-50 border-blue-200 text-blue-900 font-medium"
                                  : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex justify-between items-center w-full">
                                <span className="font-bold truncate max-w-[130px]">{post.topic}</span>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                  post.status === "published"
                                    ? "bg-green-50 border border-green-200 text-green-700"
                                    : post.status === "scheduled"
                                    ? "bg-yellow-50 border border-yellow-200 text-yellow-700"
                                    : "bg-slate-100 border border-slate-200 text-slate-500"
                                }`}>
                                  {post.status}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[9px] text-slate-400 mt-1">
                                <span>Tone: {post.tone}</span>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right Column: Draft Editor Mockups */}
                  <div className="lg:col-span-8">
                    {selectedPost ? (
                      <div className="space-y-6">
                        
                        {/* Editor Header */}
                        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <span className="text-xs text-slate-400 font-bold uppercase">Active Copy Template</span>
                            <h2 className="text-xl font-heading font-black text-slate-800">
                              Draft for: {selectedPost.topic}
                            </h2>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              Created: {new Date(selectedPost.createdAt).toLocaleString()} | Tone: {selectedPost.tone}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {isEditingPost ? (
                              <>
                                <button
                                  onClick={handleSavePostEdits}
                                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full text-xs shadow-md transition-colors cursor-pointer"
                                >
                                  Save Edits
                                </button>
                                <button
                                  onClick={() => {
                                    setIsEditingPost(false);
                                    // Reset values
                                    setEditedTweets(selectedPost.twitterThread);
                                    setEditedLinkedIn(selectedPost.linkedinPost);
                                    setEditedScript(selectedPost.videoScript);
                                  }}
                                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-full text-xs transition-colors cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => setIsEditingPost(true)}
                                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-full text-xs transition-colors cursor-pointer"
                                >
                                  Edit Draft
                                </button>
                                <button
                                  onClick={() => handleDeletePost(selectedPost.id)}
                                  className="p-2 bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 rounded-full transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Tab Content Display Area (Simulation of Social Media Clients) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* TWITTER / X THREAD FEED MOCKUP */}
                          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                                <TwitterIcon className="h-4 w-4 text-sky-500" />
                                Twitter/X Thread ({editedTweets.length} Tweets)
                              </span>
                              <button
                                onClick={() => handleCopyToClipboard(editedTweets.join("\n\n"))}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="space-y-4 flex-1">
                              {editedTweets.map((tweet, index) => (
                                <div key={index} className="flex gap-3 text-xs bg-slate-50/50 p-3 rounded-2xl border border-slate-100 relative">
                                  <div className="flex flex-col items-center flex-shrink-0">
                                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                                      S
                                    </div>
                                    {index < editedTweets.length - 1 && (
                                      <div className="w-0.5 bg-slate-200 flex-1 my-1" />
                                    )}
                                  </div>
                                  <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-1 font-semibold text-slate-800">
                                      <span>SUMINO Health</span>
                                      <span className="text-[10px] text-slate-400 font-normal">@SuminoHealth</span>
                                    </div>
                                    
                                    {isEditingPost ? (
                                      <textarea
                                        rows={3}
                                        value={tweet}
                                        onChange={(e) => {
                                          const copy = [...editedTweets];
                                          copy[index] = e.target.value;
                                          setEditedTweets(copy);
                                        }}
                                        className="w-full p-2 border border-blue-200 rounded-lg text-xs bg-white focus:outline-none"
                                      />
                                    ) : (
                                      <p className="text-slate-600 leading-relaxed font-semibold whitespace-pre-wrap">
                                        {tweet}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* LINKEDIN PROFESSIONAL POST MOCKUP */}
                          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                                <LinkedinIcon className="h-4 w-4 text-blue-700" />
                                LinkedIn Professional Post
                              </span>
                              <button
                                onClick={() => handleCopyToClipboard(editedLinkedIn)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="space-y-3 flex-1 flex flex-col">
                              {/* Linkedin Identity Bar */}
                              <div className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-lg bg-blue-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                                  S
                                </div>
                                <div>
                                  <div className="font-bold text-xs text-slate-800">SUMINO</div>
                                  <div className="text-[9px] text-slate-400">Family Health Prevention Platform • 1st</div>
                                </div>
                              </div>

                              {isEditingPost ? (
                                <textarea
                                  rows={12}
                                  value={editedLinkedIn}
                                  onChange={(e) => setEditedLinkedIn(e.target.value)}
                                  className="w-full flex-1 p-3 border border-blue-200 rounded-xl text-xs bg-white focus:outline-none"
                                />
                              ) : (
                                <p className="text-xs text-slate-600 leading-relaxed font-semibold whitespace-pre-wrap bg-slate-50/50 p-4 rounded-2xl border border-slate-100 overflow-y-auto max-h-[300px]">
                                  {editedLinkedIn}
                                </p>
                              )}
                            </div>
                          </div>

                        </div>

                        {/* SHORT VIDEO SCRIPT CARD MOCKUP */}
                        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                            <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                              <Video className="h-4 w-4 text-red-500" />
                              Short Video Script (Reels / Shorts / TikTok)
                            </span>
                            <button
                              onClick={() => {
                                const fullScriptText = `Title: ${editedScript.title}\n\n[HOOK]\n${editedScript.hook}\n\n[BODY]\n${editedScript.body}\n\n[CTA]\n${editedScript.cta}`;
                                handleCopyToClipboard(fullScriptText);
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="space-y-4">
                            {isEditingPost ? (
                              <div className="grid grid-cols-1 gap-3 text-xs">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Video Title</label>
                                  <input
                                    type="text"
                                    value={editedScript.title}
                                    onChange={(e) => setEditedScript({...editedScript, title: e.target.value})}
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Hook (0-10s)</label>
                                  <textarea
                                    rows={2}
                                    value={editedScript.hook}
                                    onChange={(e) => setEditedScript({...editedScript, hook: e.target.value})}
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Body / Key Details (10-50s)</label>
                                  <textarea
                                    rows={4}
                                    value={editedScript.body}
                                    onChange={(e) => setEditedScript({...editedScript, body: e.target.value})}
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Call to Action (50-60s)</label>
                                  <textarea
                                    rows={2}
                                    value={editedScript.cta}
                                    onChange={(e) => setEditedScript({...editedScript, cta: e.target.value})}
                                    className="w-full p-2 border border-slate-200 rounded-lg"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                <div className="p-4 bg-red-50/20 border border-red-100/50 rounded-2xl space-y-1">
                                  <span className="font-bold text-red-500 uppercase tracking-widest text-[9px] block">
                                    01. Hook (0-10s)
                                  </span>
                                  <p className="text-slate-600 leading-relaxed font-semibold whitespace-pre-wrap">
                                    {editedScript.hook}
                                  </p>
                                </div>
                                <div className="p-4 bg-blue-50/20 border border-blue-100/50 rounded-2xl space-y-1">
                                  <span className="font-bold text-blue-500 uppercase tracking-widest text-[9px] block">
                                    02. Body Context (10-50s)
                                  </span>
                                  <p className="text-slate-600 leading-relaxed font-semibold whitespace-pre-wrap">
                                    {editedScript.body}
                                  </p>
                                </div>
                                <div className="p-4 bg-green-50/20 border border-green-100/50 rounded-2xl space-y-1">
                                  <span className="font-bold text-green-600 uppercase tracking-widest text-[9px] block">
                                    03. Outro CTA (50-60s)
                                  </span>
                                  <p className="text-slate-600 leading-relaxed font-semibold whitespace-pre-wrap">
                                    {editedScript.cta}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* SCHEDULER WIDGET */}
                        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl">
                              <CalendarDays className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">Schedule Post</h4>
                              <p className="text-xs text-slate-400">
                                {selectedPost.status === "scheduled" && selectedPost.scheduledDate
                                  ? `Currently scheduled for ${new Date(selectedPost.scheduledDate).toLocaleString()}`
                                  : selectedPost.status === "published"
                                  ? "This content is marked as Published."
                                  : "Add this draft to the Content Calendar queue."
                                }
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {schedulingPostId === selectedPost.id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="datetime-local"
                                  value={scheduleDate}
                                  onChange={(e) => setScheduleDate(e.target.value)}
                                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                                />
                                <button
                                  onClick={() => handleSchedulePost(selectedPost.id)}
                                  disabled={!scheduleDate}
                                  className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold rounded-xl text-xs cursor-pointer"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setSchedulingPostId(null)}
                                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-xs cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                {selectedPost.status !== "published" && (
                                  <button
                                    onClick={() => setSchedulingPostId(selectedPost.id)}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full text-xs shadow-md transition-all cursor-pointer"
                                  >
                                    {selectedPost.status === "scheduled" ? "Reschedule" : "Schedule Content"}
                                  </button>
                                )}
                                {selectedPost.status !== "published" && (
                                  <button
                                    onClick={() => handleMarkPublished(selectedPost.id)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full text-xs shadow-md transition-all cursor-pointer"
                                  >
                                    Mark Published
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="glass-card p-12 text-center rounded-3xl border border-slate-200/80 shadow-md">
                        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-700">No Draft Selected</h3>
                        <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">
                          Configure tone and generate draft posts from your research logs on the left or select an existing draft.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: VISUAL ASSETS */}
              {activeTab === "assets" && (
                <motion.div
                  key="assets"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6"
                >
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-heading font-black text-blue-900 flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-blue-500" />
                      Visual Asset Generator Prompts
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Prompts for Midjourney or DALL-E structured to align with Sumino's premium, clean, family-first aesthetics.
                    </p>
                  </div>

                  {selectedPost ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      {/* Left: Prompt copy widget */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                            Generated AI Image Prompt
                          </label>
                          <div className="p-4 bg-slate-50/80 border border-slate-100 rounded-2xl relative font-semibold text-xs leading-relaxed text-slate-600">
                            {isEditingPost ? (
                              <textarea
                                rows={6}
                                value={editedImagePrompt}
                                onChange={(e) => setEditedImagePrompt(e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                              />
                            ) : (
                              <p className="pr-12">{editedImagePrompt}</p>
                            )}

                            {!isEditingPost && (
                              <button
                                onClick={() => handleCopyToClipboard(editedImagePrompt)}
                                className="absolute top-4 right-4 p-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-xl transition-all cursor-pointer shadow-sm"
                                title="Copy Prompt"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 text-xs text-slate-500 leading-relaxed bg-blue-50/50 p-4 border border-blue-100/50 rounded-2xl">
                          <p className="font-bold text-blue-900">🎨 Brand Design Aesthetic Standards:</p>
                          <ul className="list-disc pl-4 space-y-1.5 font-semibold">
                            <li>Primary Colors: Warm slate, soft cream, dynamic medical blues (#2563EB) and healthy greens (#16A34A).</li>
                            <li>Avoid generic clinical rooms; prioritize authentic household scenarios where family prevention occurs.</li>
                            <li>Include high HSL tailwinds: soft studio lighting, shallow depth-of-field, authentic Indian households.</li>
                          </ul>
                        </div>
                      </div>

                      {/* Right: Mock visual asset preview */}
                      <div className="md:col-span-5 flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 self-start">
                          Visual Mockup Preview
                        </span>
                        
                        <div className="w-full aspect-square rounded-2xl bg-gradient-to-tr from-blue-50 to-blue-200/50 border border-slate-200 flex flex-col justify-between p-6 shadow-md overflow-hidden relative group">
                          {/* Decorative blur balls */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />

                          <div className="flex justify-between items-center z-10">
                            <span className="text-[10px] bg-white/80 border border-slate-100 px-2.5 py-0.5 rounded-full font-bold text-slate-600">
                              Active Vitals Mock
                            </span>
                            <span className="text-[10px] bg-green-50 text-green-900 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                              Stable
                            </span>
                          </div>

                          <div className="space-y-4 my-auto z-10 flex flex-col justify-center items-center text-center">
                            <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-md">
                              <ImageIcon className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-800 text-sm">{selectedPost.topic}</h4>
                              <p className="text-[10px] text-slate-400 max-w-[200px] leading-relaxed mx-auto font-medium">
                                Visual styled using Sumino's premium prevention color grid.
                              </p>
                            </div>
                          </div>

                          <div className="text-[9px] text-slate-400 flex justify-between items-center border-t border-slate-100 pt-3 z-10">
                            <span>🛡️ DPDP Compliant UI</span>
                            <span>Advisory Vitals</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-12">
                      <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-700">No Post Selected</h3>
                      <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">
                        Select a post draft to view its generated asset prompts.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 4: CONTENT CALENDAR */}
              {activeTab === "calendar" && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6"
                >
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-heading font-black text-blue-900 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      Social Content Calendar
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Timeline view of scheduled drafts, published resources, and queue logs.
                    </p>
                  </div>

                  {postsList.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-700">Calendar is Empty</h3>
                      <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">
                        Get started by researching topics and creating drafts to schedule them.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* Timeline Queue */}
                      <div className="space-y-4">
                        {(["scheduled", "draft", "published"] as const).map((status) => {
                          const items = postsList.filter(p => p.status === status);
                          if (items.length === 0) return null;

                          return (
                            <div key={status} className="space-y-3">
                              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                                {status === "scheduled" && <Clock className="h-4 w-4 text-yellow-500" />}
                                {status === "published" && <CheckCircle className="h-4 w-4 text-green-500" />}
                                {status === "draft" && <FileText className="h-4 w-4 text-slate-400" />}
                                {status} ({items.length})
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map((post) => (
                                  <div
                                    key={post.id}
                                    className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow transition-shadow flex flex-col justify-between gap-4"
                                  >
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-start">
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100 font-bold uppercase">
                                          {post.category}
                                        </span>
                                        {post.status === "scheduled" && post.scheduledDate && (
                                          <span className="text-[10px] font-bold text-yellow-600 flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {new Date(post.scheduledDate).toLocaleDateString()}
                                          </span>
                                        )}
                                      </div>
                                      
                                      <h4 className="font-bold text-slate-800 text-sm">{post.topic}</h4>
                                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                        {post.linkedinPost}
                                      </p>
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                      <div className="flex gap-1.5">
                                        <span className="p-1 rounded bg-slate-100 text-slate-500" title="Twitter Thread">
                                          <TwitterIcon className="h-3.5 w-3.5" />
                                        </span>
                                        <span className="p-1 rounded bg-slate-100 text-slate-500" title="LinkedIn Post">
                                          <LinkedinIcon className="h-3.5 w-3.5" />
                                        </span>
                                        <span className="p-1 rounded bg-slate-100 text-slate-500" title="Short Video">
                                          <Video className="h-3.5 w-3.5" />
                                        </span>
                                      </div>

                                      <button
                                        onClick={() => {
                                          setSelectedPost(post);
                                          setActiveTab("drafts");
                                        }}
                                        className="text-[10px] font-bold text-blue-500 hover:text-blue-600 flex items-center gap-0.5"
                                      >
                                        <Eye className="h-3 w-3" />
                                        View Draft
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 5: SETTINGS */}
              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card p-8 rounded-3xl border border-slate-200/80 shadow-md max-w-2xl mx-auto space-y-6"
                >
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-heading font-black text-blue-900 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-blue-500" />
                      Settings & Configurations
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Configure your Gemini API key and adjust default creator options.
                    </p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Gemini API Key
                      </label>
                      <input
                        type="password"
                        placeholder="AI-key (e.g. AIzaSy...)"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs outline-none transition-all font-mono"
                      />
                      <p className="text-[10px] text-slate-400 leading-normal mt-1.5">
                        Your key is stored <strong>locally in your browser</strong> (localStorage). It is never sent to any third-party server besides direct official Google Gemini endpoints. If left blank, the suite runs in <strong>Local High-Fidelity Mock Mode</strong> using clinical presets.
                      </p>
                    </div>

                    {saveStatus === "success" && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-700 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Configurations saved successfully in browser!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="py-2.5 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      Save Configuration
                    </button>
                  </form>

                  <div className="border-t border-slate-100 pt-5 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Creator Suite Information
                    </h4>
                    <div className="p-4 bg-slate-50 rounded-2xl text-[11px] text-slate-500 leading-relaxed space-y-2">
                      <p>
                        <strong>Application Version:</strong> Sumino Creator Hub v1.0.0
                      </p>
                      <p>
                        <strong>Data Directory:</strong> Writing locally to <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-900 font-mono text-[9px]">/data/social_posts.json</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-900 font-mono text-[9px]">/data/social_research.json</code>.
                      </p>
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
