import Link from "next/link";
import { Metadata } from "next";
import { CITY_PAGES, SERVICE_HUBS, SITE_NAME, absoluteUrl, cityFromTargetArea, toPath } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Emergency Roofing Services",
  description: "Browse emergency roof leak, storm damage, and urgent inspection service hubs.",
  alternates: { canonical: "/services" },
  openGraph: { title: `${SITE_NAME} Services`, description: "Main service index", url: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <main className="pulse-main pulse-section">
      <div className="pulse-wrap">
        <p className="pulse-kicker">Service Command Center</p>
        <h1>Pick The Right Leak Or Storm-Damage Service Route</h1>
        <p className="pulse-lead">
          This index is built for urgent clarity: match your scenario, identify the fastest path, and move forward with a
          practical plan that protects both structure and interior spaces.
        </p>

        <section className="pulse-grid pulse-grid-3">
          {SERVICE_HUBS.map((page, index) => (
            <Link className={`pulse-card ${index % 3 === 0 ? "pulse-card-accent" : ""}`} key={page.pageSlug} href={toPath(page.pageSlug)}>
              <h2>{page.pageTitle.replace(/\s*\|.*/, "")}</h2>
              <p>{page.searchIntent}</p>
            </Link>
          ))}
        </section>

        <section className="pulse-detail">
          <h2>How To Use This Directory Fast</h2>
          <ul className="pulse-list-check">
            <li>Choose emergency pages for active leaks, sudden interior dripping, or immediate weather exposure.</li>
            <li>Choose storm pages for hail, wind, and rain events where roof integrity may be compromised.</li>
            <li>Choose specialized pages (flat roof, ice dam, inspection) for technical scenario matching.</li>
            <li>If uncertain, start with emergency triage and escalate based on risk findings.</li>
          </ul>
        </section>

        <section className="pulse-detail">
          <h2>City Coverage</h2>
          <p className="pulse-lead">Direct links to localized pages for faster, area-specific relevance.</p>
          <div className="pulse-grid pulse-grid-4">
            {CITY_PAGES.map((page) => (
              <Link className="pulse-chip" key={page.pageSlug} href={toPath(page.pageSlug)}>{cityFromTargetArea(page.targetArea)}</Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
