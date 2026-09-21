import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BlogRepository,
  SiteConfigRepository,
} from "../../core/database/repositories";
import { generatePageMetadata, SITE_URL, buildBreadcrumbSchema } from "../../core/utils/seo";
import type { BlogPost, BlogCategory } from "../../core/models";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = generatePageMetadata({
  title: "Jim Corbett Safari Blog — Wildlife, Booking & Travel Guides",
  description:
    "Expert guides on Jim Corbett National Park — zone comparisons, safari booking tips, best time to visit, season guide, and Delhi to Corbett travel advice from on-ground naturalists.",
  canonicalPath: "/blog",
  keywords: [
    "jim corbett safari blog",
    "jim corbett travel guide",
    "jim corbett wildlife tips",
    "corbett national park guide",
    "safari booking tips jim corbett",
  ],
});

// ─── Structured data ──────────────────────────────────────────────────────────

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
]);

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Jim Corbett Safari Blog",
  description:
    "Expert guides on Jim Corbett National Park — zone comparisons, safari booking tips, best time to visit, and Delhi travel advice.",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organization",
    name: "Panthera Corbett Safari",
    url: SITE_URL,
  },
};

// ─── Category colour map ──────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "Booking Guide": "bg-[#37482E] text-[#FBF8F0]",
  "Safari Types": "bg-[#C99A3D] text-[#17211A]",
  "Zone Guide": "bg-[#17211A] text-[#FBF8F0]",
  "Season Guide": "bg-[#5C8A4A] text-[#FBF8F0]",
  "Travel Guide": "bg-[#8A5C2E] text-[#FBF8F0]",
  "Packages & Trips": "bg-[#2E5C8A] text-[#FBF8F0]",
  "Wildlife Guide": "bg-[#4A7C5A] text-[#FBF8F0]",
  "Planning Tips": "bg-[#8A6B2E] text-[#FBF8F0]",
};

// ─── Post Card Component ──────────────────────────────────────────────────────

function PostCard({ post }: { post: BlogPost }) {
  const catClass = CATEGORY_COLORS[post.category] ?? "bg-[#37482E] text-[#FBF8F0]";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-[#E8E0CC] rounded-[4px] overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-48 overflow-hidden bg-[#E8E0CC]">
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-[#17211A]/20" />
        <span
          className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold ${catClass}`}
        >
          {post.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-[#8A9468] mb-2">
          <span>{post.readTimeMinutes} min read</span>
          <span>·</span>
          <time dateTime={post.updatedAt}>
            {new Date(post.updatedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>
        <h2 className="font-serif text-lg font-bold text-[#17211A] leading-snug mb-2 group-hover:text-[#37482E] transition-colors line-clamp-3">
          {post.title}
        </h2>
        <p className="text-sm text-[#17211A]/70 leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 text-xs font-semibold text-[#37482E] group-hover:underline">
          Read Article →
        </div>
      </div>
    </Link>
  );
}

// ─── Featured Post Card ────────────────────────────────────────────────────────

function FeaturedPostCard({ post }: { post: BlogPost }) {
  const catClass = CATEGORY_COLORS[post.category] ?? "bg-[#37482E] text-[#FBF8F0]";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative overflow-hidden rounded-[4px] bg-[#17211A] min-h-[400px] flex flex-col justify-end"
    >
      <Image
        src={post.featuredImage}
        alt={post.featuredImageAlt}
        fill
        className="object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
        sizes="(max-width: 768px) 100vw, 60vw"
        priority
      />
      <div className="relative z-10 p-8">
        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-3 ${catClass}`}>
          {post.category}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-[#E8D09A] transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-[#E8E0CC]/80 leading-relaxed line-clamp-2 max-w-xl mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-[#8A9468]">
          <span>{post.readTimeMinutes} min read</span>
          <span>·</span>
          <time dateTime={post.updatedAt}>
            Updated{" "}
            {new Date(post.updatedAt).toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
            })}
          </time>
          <span className="ml-auto text-[#C99A3D] font-semibold text-sm group-hover:underline">
            Read Article →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogListingPage() {
  const allPosts = BlogRepository.getAllPosts();
  const featuredPosts = BlogRepository.getFeaturedPosts();
  const nonFeatured = allPosts.filter((p) => !p.isFeatured);
  const categories = BlogRepository.getAllCategories();
  const contact = SiteConfigRepository.getContact();

  return (
    <div className="bg-[#FBF8F0] min-h-screen">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#17211A] text-[#FBF8F0] pt-16 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-6 flex items-center gap-2 text-xs text-[#8A9468]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#E8E0CC]">Safari Blog</span>
          </nav>
          <div className="max-w-2xl">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[#37482E] text-xs font-semibold text-[#C99A3D] uppercase tracking-wider">
              Field Guides & Expert Notes
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#FBF8F0] leading-tight mb-4">
              Jim Corbett Safari Blog
            </h1>
            <p className="text-lg text-[#E8E0CC]/80 leading-relaxed">
              Zone guides, booking tips, season breakdowns, and wildlife notes
              from our naturalists and safari desk — written to help you plan
              a better Corbett experience.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

        {/* ── Featured Posts ── */}
        {featuredPosts.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#17211A] mb-6">
              Featured Guides
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {featuredPosts[0] && (
                <div className="lg:col-span-3">
                  <FeaturedPostCard post={featuredPosts[0]} />
                </div>
              )}
              <div className="lg:col-span-2 space-y-4">
                {featuredPosts.slice(1).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Category strip ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-[#17211A] mb-6">
            Browse by Topic
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${CATEGORY_COLORS[cat]}`}
              >
                {cat}
              </div>
            ))}
          </div>
        </section>

        {/* ── All Posts Grid ── */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-[#17211A] mb-6">
            All Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonFeatured.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {featuredPosts.slice(1).length === 0 && featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#17211A] rounded-[4px] p-8 sm:p-12 text-[#FBF8F0] text-center">
          <h2 className="font-serif text-2xl font-bold mb-2">
            Ready to Book Your Safari?
          </h2>
          <p className="text-[#E8E0CC]/70 mb-6 text-sm max-w-lg mx-auto">
            Our safari desk is available 7 days a week. WhatsApp us to check
            zone availability and confirm your permit within 30 minutes.
          </p>
          <a
            href={SiteConfigRepository.getWhatsAppLink(
              "Hello! I read your blog and want to book a Jim Corbett safari."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C99A3D] text-[#17211A] font-bold text-sm px-8 py-3 rounded-[4px] hover:bg-[#E8B84B] transition-colors"
          >
            WhatsApp Safari Desk
          </a>
          <p className="mt-3 text-xs text-[#8A9468]">
            Or call:{" "}
            <a href={`tel:${contact.phoneRaw}`} className="hover:text-white transition-colors">
              {contact.phoneDisplay}
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
