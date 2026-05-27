import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS, SITE_NAME, absoluteUrl } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Roof Leak Guides",
  description: "Read emergency roof leak and storm damage guides for homes and businesses.",
  alternates: { canonical: "/blog" },
  openGraph: { title: `${SITE_NAME} Blog`, description: "Guides and tips", url: absoluteUrl("/blog") },
};

export default function BlogIndexPage() {
  function toBlogPath(slug: string) {
    return `/blog/${slug.replace(/^\/+/, "").replace(/^blog\//, "")}`;
  }

  return (
    <main className="pulse-main pulse-section">
      <div className="pulse-wrap">
        <p className="pulse-kicker">Decision Guides</p>
        <h1>Roof Leak Intelligence For Faster Action</h1>
        <p className="pulse-lead">
          Use these guides to understand risk levels, likely root causes, and the best sequence for containment,
          assessment, and permanent repair.
        </p>

        <div className="pulse-grid pulse-grid-2">
          {BLOG_POSTS.map((post, index) => (
            <Link key={post.pageSlug} href={toBlogPath(post.pageSlug)} className={`pulse-card ${index % 2 === 0 ? "pulse-card-accent" : ""}`}>
              <h2>{post.pageTitle}</h2>
              <p>{post.primaryKeyword}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
