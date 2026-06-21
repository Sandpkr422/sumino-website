"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Database, Award } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // Direct mock API call for subscription
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: email,
          category: "Newsletter",
          message: "Subscribed to newsletter updates",
        }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to subscription system.");
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="inline-block p-1.5 bg-white rounded-xl mb-4 shadow-sm">
              <img
                src="/logo.jpg"
                alt="SUMINO Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-sm">
              Prevention Starts at Home. India&apos;s category-defining family health intelligence platform helping households spot risks early.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>AES-256 Bank Grade Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Database className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Compliant with DPDP Act 2023 Guidelines</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Award className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Transparent & Explainable Advisory Models</span>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61591036100295"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-full text-slate-400 transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/sumino.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-pink-600 hover:text-white rounded-full text-slate-400 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://x.com/suminohealth"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-full text-slate-400 transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/suminohealth/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-blue-700 hover:text-white rounded-full text-slate-400 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1: Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/solution" className="hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/families" className="hover:text-white transition-colors">For Families</Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-white transition-colors">For Doctors</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">Health Blog</Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white transition-colors">Partnerships</Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-white transition-colors">Investors</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4">
              Get clinical health alerts and preventive guides directly in your inbox.
            </p>
            {subscribed ? (
              <div className="p-3 bg-green-900/30 text-green-400 rounded-lg text-xs font-medium">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Disclaimer Section */}
        <div className="pt-8 pb-6 border-b border-slate-800 text-xs text-slate-500 leading-relaxed text-justify">
          <p>
            <strong className="text-slate-400">Medical Disclaimer:</strong> SUMINO is a preventive healthcare platform and digital wellness advisor. It does not provide medical diagnoses, clinical treatments, or pharmaceutical prescriptions. Our warning indicators are supportive guidelines mapped to peer-reviewed protocols and must never replace diagnostic decisions made by a qualified general physician or specialized healthcare practitioner. If your family is experiencing an acute medical emergency, please contact your nearest local clinic or hospital services immediately.
          </p>
        </div>

        {/* Legal & Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 SUMINO Healthcare Technology Private Limited. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/admin/social" className="hover:text-slate-300 font-semibold text-blue-400">Social Portal</Link>
            <Link href="/contact" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-300">Ethical AI Principles</Link>
            <Link href="/contact" className="hover:text-slate-300">Security Framework</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
