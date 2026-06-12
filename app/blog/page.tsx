"use client";

import { useState } from "react";
import Link from "next/link";
import { mockBlogs } from "@/data/mock-blogs";
import { ArrowRight, BookOpen, Clock, User } from "lucide-react";

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Preventive Healthcare", "Elderly Care", "Chronic Disease", "Child Health"];

  const filteredBlogs = selectedCategory === "All"
    ? mockBlogs
    : mockBlogs.filter(blog => blog.category === selectedCategory);

  const featuredBlog = mockBlogs[0];
  const gridBlogs = filteredBlogs.filter(blog => blog.slug !== featuredBlog.slug || selectedCategory !== "All");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-500 tracking-wider uppercase block font-heading">Resources</span>
          <h1 className="font-heading font-bold text-4xl text-blue-900">Preventive Health Intelligence Blog</h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            Clinical guidelines, caregiver tips, and health insights curated by medical specialists to keep your family healthy at home.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-2 border-b border-slate-200 pb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Section (only shown when category is All) */}
        {selectedCategory === "All" && featuredBlog && (
          <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 items-center">
              
              <div className="lg:col-span-4 bg-blue-500/10 h-64 rounded-2xl flex items-center justify-center text-blue-500">
                <BookOpen className="h-16 w-16" />
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold uppercase">
                  <span>{featuredBlog.category}</span>
                  <span>•</span>
                  <span>{featuredBlog.readTime}</span>
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-blue-900 hover:text-blue-500 transition-colors">
                  <Link href={`/blog/${featuredBlog.slug}`}>
                    {featuredBlog.title}
                  </Link>
                </h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  {featuredBlog.excerpt}
                </p>
                <div className="flex items-center gap-6 pt-2 text-xs md:text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-slate-400" />
                    <span>{featuredBlog.author.name} ({featuredBlog.author.role})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{featuredBlog.date}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Link
                    href={`/blog/${featuredBlog.slug}`}
                    className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors cursor-pointer"
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div>
          <h2 className="font-heading font-bold text-xl text-blue-900 mb-6 uppercase tracking-wider">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>
          {gridBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {gridBlogs.map((blog) => (
                <article key={blog.slug} className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">
                      <span>{blog.category}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-slate-800 hover:text-blue-500 transition-colors leading-snug">
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-xs text-slate-400">
                    <span>{blog.author.name}</span>
                    <span>{blog.date}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-6 bg-white border border-slate-100 rounded-2xl text-slate-500">
              No articles found in this category. Check back soon for updates.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
