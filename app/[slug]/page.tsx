import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PHONE_DISPLAY, SEO_PAGES, SITE_NAME, absoluteUrl, bySlug, cityFromTargetArea, relatedPages, toPath } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

export async function generateStaticParams() {
  return SEO_PAGES
    .map((page) => page.pageSlug.replace(/^\//, ""))
    .filter((slug) => !slug.includes("/"))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = bySlug(slug);
  if (!page) return { title: "Page Not Found" };

  return {
    title: page.pageTitle,
    description: `${page.pageTitle}. ${page.ctaStrategy}.`,
    alternates: { canonical: toPath(page.pageSlug) },
    keywords: [page.primaryKeyword],
    openGraph: {
      title: `${page.pageTitle} | ${SITE_NAME}`,
      description: `${page.pageTitle}. ${page.searchIntent}.`,
      url: absoluteUrl(toPath(page.pageSlug)),
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export default async function DynamicSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = bySlug(slug);
  if (!page) notFound();

  const city = cityFromTargetArea(page.targetArea);
  const related = relatedPages(page, 16);

  return (
    <main className="pulse-main pulse-section">
      <div className="pulse-wrap">
        <p className="pulse-kicker">{page.pageType}</p>
        <h1>{page.pageTitle}</h1>
        <p>
          When active leaking or storm exposure threatens your property, fast decisions matter. Our approach is built
          around clear triage guidance, practical containment steps, and repair pathways you can act on immediately.
        </p>
        <p>
          In {city}, we support homeowners, landlords, and commercial managers with location-aware emergency roofing
          routes designed to reduce further interior and structural damage.
        </p>

        <div className="pulse-actions">
          <a className="pulse-call" href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, "")}`}>
            Call {PHONE_DISPLAY}
          </a>
          <Link className="pulse-btn" href="/services">
            Compare Services
          </Link>
        </div>

        <section className="pulse-detail">
          <h2>How We Handle Emergency Visits</h2>
          <div className="pulse-grid pulse-grid-2">
            <article className="pulse-card"><h3>1. Urgency Intake</h3><p>We identify leak severity, weather exposure, and immediate safety risk.</p></article>
            <article className="pulse-card"><h3>2. Protection Guidance</h3><p>You get immediate steps to minimize interior water spread before on-site arrival.</p></article>
            <article className="pulse-card"><h3>3. Roof Assessment</h3><p>Technicians isolate the leak path and define the right corrective scope.</p></article>
            <article className="pulse-card"><h3>4. Repair Plan</h3><p>We confirm repair priorities and explain practical next steps for reliability.</p></article>
          </div>
        </section>

        <section className="pulse-detail">
          <h2>What This Page Helps You Understand</h2>
          <ul>
            <li>What to do first when leak activity appears suddenly.</li>
            <li>How response timing changes based on weather and roof type.</li>
            <li>What damage signals indicate high urgency.</li>
            <li>How temporary protection and permanent repairs differ.</li>
            <li>How service scope can vary across older and newer roofing systems.</li>
          </ul>
        </section>

        {related.length > 0 && (
          <section className="pulse-detail">
            <h2>Related Locations</h2>
            <div className="pulse-grid pulse-grid-4">
              {related.map((item) => (
                <Link key={item.pageSlug} href={toPath(item.pageSlug)} className="pulse-chip">
                  {cityFromTargetArea(item.targetArea)}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
