"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, ShieldCheck, Landmark, Loader2, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";

function ContactForm() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      const allowedCategories = ["General Inquiry", "Doctors Panel", "Partnerships", "Investors", "Media"];
      const matched = allowedCategories.find(c => c.toLowerCase().includes(catParam.toLowerCase()));
      if (matched) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(prev => ({ ...prev, category: matched }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter your message details.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", category: "General Inquiry", message: "" });
      } else {
        setError("Failed to register your message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Could not connect to SUMINO API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Contact info column */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block font-heading">Get In Touch</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-blue-900 leading-tight">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Have questions about the SUMINO platform? Interested in doctor panel onboarding or institutional partnership integration? Reach out to our teams today.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-800 text-base">Email Relations</h3>
              <p className="text-sm text-slate-500">General: contact@sumino.in</p>
              <p className="text-sm text-slate-500">Partnerships: partners@sumino.in</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-800 text-base">Corporate Office</h3>
              <p className="text-sm text-slate-500">Bangalore Development Hub</p>
              <p className="text-sm text-slate-500">Karnataka, India (Beta Operational Base)</p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/40 text-xs text-slate-500 space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-900">
            <ShieldCheck className="h-4 w-4" />
            <span>Ethical Communication Promise</span>
          </div>
          <p className="leading-relaxed">
            We respect your communication. Your contact information is stored in a secure local database and is only shared internally to process your specific partnership or onboarding request.
          </p>
        </div>
      </div>

      {/* Form Column */}
      <div className="lg:col-span-7 glass-card p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-md">
        
        {success ? (
          <div className="text-center space-y-6 py-12 animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-200">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-2xl text-blue-900">Inquiry Submitted Successfully</h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you for reaching out. A representative from the respective team will contact you within 24–48 business hours.
              </p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-500 rounded-xl text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@domain.com"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-1">
                Inquiry Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Doctors Panel">Doctors Panel Onboarding</option>
                <option value="Partnerships">B2B/Institutional Partnerships</option>
                <option value="Investors">Investor Relations</option>
                <option value="Media">Media & Newsroom</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">
                Message / Inquiry Details
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your interest, clinic, or partnership proposal..."
                rows={4}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                required
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full cursor-pointer shadow-sm hover:shadow transition-all disabled:bg-slate-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 justify-center py-20">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <p className="text-sm text-slate-500">Loading form parameters...</p>
        </div>
      }>
        <ContactForm />
      </Suspense>
    </div>
  );
}
