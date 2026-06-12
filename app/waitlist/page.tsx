"use client";

import { useState } from "react";
import { ShieldCheck, ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Waitlist() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    familySize: "2-4",
    category: "General Family Wellness",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const cities = [
    "Bangalore",
    "Mumbai",
    "Delhi NCR",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Tier 2 City",
    "Tier 3 City",
    "Other",
  ];

  const handleNext = () => {
    setError("");
    if (step === 1) {
      if (!formData.name.trim()) {
        setError("Please enter your name.");
        return;
      }
      if (!formData.email.trim() || !formData.email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!formData.mobile.trim() || !mobileRegex.test(formData.mobile)) {
        setError("Please enter a valid 10-digit Indian mobile number.");
        return;
      }
      if (!formData.city) {
        setError("Please select your city.");
        return;
      }
      setStep(2);
    }
  };

  const handleBack = () => {
    setError("");
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to waitlist database. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-xl glass-card p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-lg relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
        
        {/* Header */}
        {!success && (
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block">Secure Waitlist</span>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-blue-900">
              Step Into the Future of Family Healthcare.
            </h1>
            <p className="text-sm text-slate-500">
              Join the waitlist for early beta access. Spot risks earlier, keep your family safe.
            </p>
          </div>
        )}

        {/* Progress Bar */}
        {!success && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`h-1.5 w-16 rounded-full ${step >= 1 ? "bg-blue-500" : "bg-slate-200"}`} />
            <div className={`h-1.5 w-16 rounded-full ${step >= 2 ? "bg-blue-500" : "bg-slate-200"}`} />
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {success ? (
          /* Success Screen */
          <div className="text-center space-y-6 py-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-200">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-2xl text-blue-900">You're On The Waitlist!</h2>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you, <strong className="text-slate-800">{formData.name}</strong>. We have registered your preference for <strong className="text-slate-800">{formData.category}</strong>.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 max-w-sm mx-auto">
              We release beta invites in geographical batches. We will send an SMS and email notification to <strong className="text-slate-700">{formData.email}</strong> once slots open in {formData.city}.
            </div>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Wizard Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {step === 1 && (
              /* Step 1: Personal Details */
              <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-200">
                
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700 mb-1">
                      10-Digit Mobile (India)
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-1">
                      City
                    </label>
                    <select
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                      required
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full cursor-pointer shadow-sm hover:shadow"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>

              </div>
            )}

            {step === 2 && (
              /* Step 2: Family Details */
              <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-200">
                
                <div>
                  <span className="block text-sm font-semibold text-slate-700 mb-2">
                    Household Size (Including yourself)
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {["Single", "2-4", "5+"].map((size) => (
                      <label
                        key={size}
                        className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer text-sm font-medium transition-all ${
                          formData.familySize === size
                            ? "border-blue-500 bg-blue-50/50 text-blue-500 font-semibold"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="familySize"
                          value={size}
                          checked={formData.familySize === size}
                          onChange={(e) => setFormData({ ...formData, familySize: e.target.value })}
                          className="sr-only"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-1">
                    Primary Wellness / Monitoring Focus
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="Care for Aging Parents">Care for Aging Parents</option>
                    <option value="Child Health Tracking">Child Health Tracking</option>
                    <option value="Chronic Condition Management">Chronic Condition Management</option>
                    <option value="General Family Wellness">General Family Wellness</option>
                  </select>
                </div>

                <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100/30 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
                  <ShieldCheck className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Your privacy is guaranteed. Your details are encrypted and will only be used to process beta slots. We never sell your personal information.
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-full cursor-pointer shadow-sm disabled:bg-slate-300"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Saving...
                      </>
                    ) : (
                      "Complete Sign Up"
                    )}
                  </button>
                </div>

              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}
