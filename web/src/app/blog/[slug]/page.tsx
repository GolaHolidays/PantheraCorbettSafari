import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  BlogRepository,
  SiteConfigRepository,
} from "../../../core/database/repositories";
import { SITE_URL, buildBreadcrumbSchema } from "../../../core/utils/seo";
import type { ContentSection, BlogPost } from "../../../core/models";

// ─── Static Params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return BlogRepository.getAvailableSlugs().map((slug) => ({ slug }));
}

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BlogRepository.getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  const canonical = `${SITE_URL}/blog/${slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["Panthera Corbett Safari"],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  };
}

// ─── Structured Data Builders ─────────────────────────────────────────────────

function buildArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Panthera Corbett Safari",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Panthera Corbett Safari",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };
}

// ─── Content Renderer ─────────────────────────────────────────────────────────

const ACTION_LINKS: Record<string, string> = {
  whatsapp: "https://wa.me/919997488004?text=Hello!%20I%20want%20to%20book%20a%20Jim%20Corbett%20safari.",
  phone: "tel:+919997488004",
  "safari-price": "/safari-price",
  zones: "/zones/bijrani-zone",
  "canter-safari": "/canter-safari",
  "jeep-safari": "/jeep-safari",
  "delhi-package": "/delhi-to-jim-corbett-package",
  "delhi-cab": "/delhi-corbett-cab",
};

const CALLOUT_STYLES = {
  tip: { bg: "bg-[#EEF5E8]", border: "border-[#5C8A4A]", label: "Tip", labelColor: "text-[#3B5A2E]" },
  warning: { bg: "bg-[#FFF4E5]", border: "border-[#C99A3D]", label: "Note", labelColor: "text-[#8A6B2E]" },
  info: { bg: "bg-[#E8F0FA]", border: "border-[#2E5C8A]", label: "Info", labelColor: "text-[#1A3D5C]" },
  note: { bg: "bg-[#F4EFE6]", border: "border-[#8A9468]", label: "Important", labelColor: "text-[#37482E]" },
};

function RenderSection({ section, whatsappLink }: { section: ContentSection; whatsappLink: string }) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          id={section.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className="font-serif text-2xl font-bold text-[#17211A] mt-10 mb-4 scroll-mt-24"
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={section.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          className="font-serif text-xl font-semibold text-[#17211A] mt-6 mb-3 scroll-mt-24"
        >
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-[#17211A]/85 leading-relaxed mb-4 text-base">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2 mb-6 pl-1">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#17211A]/80 leading-relaxed">
              <span className="text-[#37482E] font-bold shrink-0 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-3 mb-6 pl-1">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#17211A]/80 leading-relaxed">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#37482E] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto mb-6 rounded-[4px] border border-[#E8E0CC]">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#37482E] text-[#FBF8F0]">
                {section.headers.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0CC] bg-white">
              {section.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 1 ? "bg-[#F4EFE6]" : ""}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-[#17211A]/85 text-xs">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      const style = CALLOUT_STYLES[section.variant];
      return (
        <div className={`${style.bg} border-l-4 ${style.border} rounded-r-[4px] px-5 py-4 mb-6`}>
          <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${style.labelColor}`}>
            {style.label}
          </div>
          <p className="text-sm text-[#17211A]/80 leading-relaxed">{section.text}</p>
        </div>
      );
    }
    case "cta": {
      const href = ACTION_LINKS[section.action] ?? whatsappLink;
      const isExternal = href.startsWith("http") || href.startsWith("tel:");
      return (
        <div className="my-8">
          {isExternal ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-block bg-[#37482E] text-[#FBF8F0] font-semibold text-sm px-7 py-3 rounded-[4px] hover:bg-[#17211A] transition-colors"
            >
              {section.text} →
            </a>
          ) : (
            <Link
              href={href}
              className="inline-block bg-[#37482E] text-[#FBF8F0] font-semibold text-sm px-7 py-3 rounded-[4px] hover:bg-[#17211A] transition-colors"
            >
              {section.text} →
            </Link>
          )}
        </div>
      );
    }
    default:
      return null;
  }
}

// ─── Table of Contents ─────────────────────────────────────────────────────────

function TableOfContents({ sections }: { sections: ContentSection[] }) {
  const h2Sections = sections.filter((s) => s.type === "h2") as Array<{ type: "h2"; text: string }>;
  if (h2Sections.length < 3) return null;

  return (
    <nav className="bg-[#F4EFE6] border border-[#E8E0CC] rounded-[4px] p-5 mb-8">
      <h2 className="font-serif text-base font-bold text-[#17211A] mb-3">In This Article</h2>
      <ol className="space-y-1.5">
        {h2Sections.map((s, i) => (
          <li key={i}>
            <a
              href={`#${s.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="text-xs text-[#37482E] hover:text-[#17211A] hover:underline transition-colors flex items-center gap-2"
            >
              <span className="text-[#8A9468] font-tabular">{String(i + 1).padStart(2, "0")}.</span>
              {s.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  whatsappLink,
  phoneDisplay,
  phoneRaw,
  relatedPosts,
}: {
  whatsappLink: string;
  phoneDisplay: string;
  phoneRaw: string;
  relatedPosts: BlogPost[];
}) {
  return (
    <aside className="space-y-6">
      {/* Book CTA */}
      <div className="bg-[#17211A] text-[#FBF8F0] rounded-[4px] p-6">
        <h3 className="font-serif text-lg font-bold mb-2">Book Your Safari</h3>
        <p className="text-xs text-[#E8E0CC]/70 leading-relaxed mb-4">
          WhatsApp our safari desk — zone availability confirmed within 30 minutes.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-[#C99A3D] text-[#17211A] font-bold text-sm py-2.5 rounded-[4px] hover:bg-[#E8B84B] transition-colors mb-2"
        >
          WhatsApp Booking
        </a>
        <a
          href={`tel:${phoneRaw}`}
          className="block w-full text-center border border-[#8A9468] text-[#E8E0CC] text-sm py-2.5 rounded-[4px] hover:bg-[#37482E] transition-colors"
        >
          {phoneDisplay}
        </a>
      </div>

      {/* Quick Links */}
      <div className="bg-white border border-[#E8E0CC] rounded-[4px] p-5">
        <h3 className="font-serif text-base font-bold text-[#17211A] mb-3">Quick Links</h3>
        <ul className="space-y-2 text-sm text-[#37482E]">
          {[
            { href: "/zones/bijrani-zone", label: "Bijrani Zone — Book Jeep" },
            { href: "/canter-safari", label: "Dhikala Canter Safari" },
            { href: "/safari-price", label: "All Zone Prices 2025–26" },
            { href: "/delhi-to-jim-corbett-package", label: "Delhi Packages" },
            { href: "/delhi-corbett-cab", label: "Delhi → Ramnagar Cab" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-[#17211A] hover:underline transition-colors flex items-center gap-1.5"
              >
                <span className="text-[#C99A3D]">›</span> {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white border border-[#E8E0CC] rounded-[4px] p-5">
          <h3 className="font-serif text-base font-bold text-[#17211A] mb-3">Related Articles</h3>
          <ul className="space-y-4">
            {relatedPosts.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex gap-3"
                >
                  <div className="relative w-16 h-14 shrink-0 rounded overflow-hidden bg-[#E8E0CC]">
                    <Image
                      src={p.featuredImage}
                      alt={p.featuredImageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#17211A] line-clamp-2 group-hover:text-[#37482E] transition-colors">
                      {p.title}
                    </p>
                    <p className="text-xs text-[#8A9468] mt-1">{p.readTimeMinutes} min</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BlogRepository.getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = BlogRepository.getRelatedPosts(slug, 3);
  const contact = SiteConfigRepository.getContact();
  const whatsappLink = SiteConfigRepository.getWhatsAppLink(
    `Hello! I read your article "${post.title}" and want to book a safari.`
  );

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
  ]);
  const articleSchema = buildArticleSchema(post);

  return (
    <div className="bg-[#FBF8F0] min-h-screen">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ── Hero ── */}
      <div className="relative h-72 sm:h-96 bg-[#17211A] overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto w-full">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-2 text-xs text-[#8A9468]">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#E8E0CC]/70 truncate max-w-[180px]">{post.category}</span>
            </nav>

            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-0.5 rounded-full bg-[#37482E] text-xs font-semibold text-[#C99A3D]">
                {post.category}
              </span>
              <span className="text-xs text-[#8A9468]">{post.readTimeMinutes} min read</span>
              <span className="text-xs text-[#8A9468]">·</span>
              <time className="text-xs text-[#8A9468]" dateTime={post.updatedAt}>
                Updated{" "}
                {new Date(post.updatedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#FBF8F0] leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Content + Sidebar ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

          {/* Main content */}
          <article>
            {/* Excerpt */}
            <p className="text-base font-medium text-[#37482E] leading-relaxed border-l-4 border-[#37482E] pl-4 mb-8 italic">
              {post.excerpt}
            </p>

            {/* Table of Contents */}
            <TableOfContents sections={post.content} />

            {/* Content sections */}
            <div>
              {post.content.map((section, idx) => (
                <RenderSection
                  key={idx}
                  section={section}
                  whatsappLink={whatsappLink}
                />
              ))}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-[#E8E0CC]">
              <span className="text-xs text-[#8A9468] font-semibold uppercase tracking-wide">Tags: </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block ml-2 px-2 py-0.5 bg-[#F4EFE6] text-[#37482E] text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 bg-[#17211A] rounded-[4px] p-7 text-[#FBF8F0] text-center">
              <h2 className="font-serif text-xl font-bold mb-2">Book Your Jim Corbett Safari</h2>
              <p className="text-sm text-[#E8E0CC]/70 mb-4">
                WhatsApp our desk — permits confirmed within 30 minutes.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C99A3D] text-[#17211A] font-bold text-sm px-6 py-2.5 rounded-[4px] hover:bg-[#E8B84B] transition-colors"
                >
                  WhatsApp Booking
                </a>
                <Link
                  href="/safari-price"
                  className="border border-[#8A9468] text-[#E8E0CC] text-sm px-6 py-2.5 rounded-[4px] hover:bg-[#37482E] transition-colors"
                >
                  View All Prices
                </Link>
              </div>
            </div>

            {/* Back to blog */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-[#37482E] hover:text-[#17211A] transition-colors"
              >
                ← Back to all articles
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <Sidebar
            whatsappLink={whatsappLink}
            phoneDisplay={contact.phoneDisplay}
            phoneRaw={contact.phoneRaw}
            relatedPosts={relatedPosts}
          />
        </div>
      </div>
    </div>
  );
}
