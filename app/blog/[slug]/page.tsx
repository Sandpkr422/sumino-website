import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockBlogs } from "@/data/mock-blogs";
import { ArrowLeft, Clock, User, ShieldCheck, Share2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for compilation step
export async function generateStaticParams() {
  return mockBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = mockBlogs.find((b) => b.slug === slug);
  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = mockBlogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = mockBlogs
    .filter((b) => b.slug !== slug)
    .slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back navigation */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog Index
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-8 md:p-12 space-y-8">
          
          {/* Header Metadata */}
          <div className="space-y-4 border-b border-slate-100 pb-8">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/50 text-blue-500 text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs md:text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-slate-400" />
                <span>By <strong>{blog.author.name}</strong> ({blog.author.role})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Article Copy */}
          <div 
            className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Trust Banner footer */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 flex items-start gap-3 mt-12 text-xs text-slate-400">
            <ShieldCheck className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p>
              This article is reviewed by our Medical Advisory Board and references validated preventive healthcare protocols. It is strictly educational and does not constitute clinical diagnostic advice.
            </p>
          </div>

        </article>

        {/* Related Reads */}
        {relatedBlogs.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-slate-200">
            <h2 className="font-heading font-bold text-xl text-blue-900 uppercase tracking-wider">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedBlogs.map((related) => (
                <div key={related.slug} className="bg-white rounded-3xl border border-slate-200/50 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <span className="text-xs text-slate-400 font-semibold uppercase">{related.category}</span>
                    <h3 className="font-heading font-bold text-base text-slate-800 hover:text-blue-500 transition-colors">
                      <Link href={`/blog/${related.slug}`}>
                        {related.title}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="inline-flex items-center text-xs font-bold text-blue-500 hover:text-blue-600 pt-4"
                  >
                    Read Post
                    <ArrowLeft className="ml-1 h-3.5 w-3.5 rotate-180" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
