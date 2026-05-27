import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, PHONE_DISPLAY, SITE_NAME, absoluteUrl } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.pageSlug.replace(/^\/+/, "").replace(/^blog\//, "") === slug) ?? null;
}

function keywordList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.pageSlug.replace(/^\/+/, "").replace(/^blog\//, "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Page Not Found" };
  return {
    title: post.pageTitle,
    description: `Read our guide on ${post.primaryKeyword}, warning signs, and safe next steps.`,
    alternates: { canonical: `/blog/${slug}` },
    keywords: [post.primaryKeyword],
    openGraph: {
      title: `${post.pageTitle} | ${SITE_NAME}`,
      description: `Guide for ${post.primaryKeyword}.`,
      url: absoluteUrl(`/blog/${slug}`),
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedKeywords = keywordList(post.secondaryKeywords);
  const place = post.targetArea.includes(",") ? post.targetArea : "Canada";

  return (
    <main className="pulse-main pulse-section">
      <article className="pulse-wrap">
        <p className="pulse-kicker">Guide</p>
        <h1>{post.pageTitle}</h1>
        <p className="pulse-lead">
          This guide explains {post.primaryKeyword} in plain language so you can quickly understand risk level,
          immediate next steps, and when to escalate to urgent professional support.
        </p>

        <section className="pulse-detail">
          <h2>Why This Topic Matters</h2>
          <p>Roof leaks can spread quickly through insulation, ceilings, and wall assemblies when early signs are missed.</p>
          <p>In {place}, weather shifts and seasonal freeze-thaw patterns can accelerate small defects into urgent problems.</p>
          <p>Responding early helps limit secondary damage, reduce repair scope, and protect occupant safety.</p>
        </section>

        <section className="pulse-detail">
          <h2>What To Check First</h2>
          <ul>
            <li>Track when and where water appears (rain event, snow melt, or wind-driven storm).</li>
            <li>Check for ceiling discoloration, dripping points, and attic moisture spread.</li>
            <li>Avoid climbing onto wet or unstable roof surfaces during active weather.</li>
            <li>Document symptoms clearly so emergency assessment is faster and more accurate.</li>
          </ul>
          <p>Once immediate hazards are controlled, compare short-term protection options with permanent repair pathways.</p>
          <p>Prioritize decisions that stop active intrusion first, then resolve underlying roof-system defects.</p>
        </section>

        {relatedKeywords.length > 0 && (
          <section className="pulse-detail">
            <h2>Related Search Topics</h2>
            <div className="pulse-grid pulse-grid-3">
              {relatedKeywords.map((keyword) => (
                <article key={keyword} className="pulse-card">
                  <h3>{keyword}</h3>
                  <p>Useful when comparing emergency scenarios, repair options, and urgency thresholds.</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="pulse-actions">
          <a className="pulse-call" href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, "")}`}>Call {PHONE_DISPLAY}</a>
          <Link className="pulse-btn" href="/blog">Back To Guides</Link>
        </section>
      </article>
    </main>
  );
}
