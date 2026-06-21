"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "How It Works", href: "/solution" },
    { name: "For Families", href: "/families" },
    { name: "For Doctors", href: "/doctors" },
    { name: "Partners", href: "/partners" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-navbar w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo.jpg"
                alt="SUMINO Logo"
                className="h-12 w-auto mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                  isActive(item.href)
                    ? "text-blue-500 font-semibold"
                    : "text-slate-500 hover:text-blue-900"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-500 hover:text-blue-900 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-blue-900 hover:bg-blue-50 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="md:hidden glass-navbar border-t border-slate-100" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-blue-500 bg-blue-50/50 font-semibold"
                    : "text-slate-500 hover:text-blue-900 hover:bg-blue-50/30"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-4 pb-2 px-3 flex flex-col gap-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-center px-3 py-2 rounded-md text-base font-medium text-slate-500 hover:text-blue-900 hover:bg-blue-50"
              >
                Contact
              </Link>
              <Link
                href="/waitlist"
                onClick={() => setIsOpen(false)}
                className="block text-center px-3 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-sm"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
