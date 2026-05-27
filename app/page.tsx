import Link from "next/link";
import { BLOG_POSTS, CITY_PAGES, PHONE_DISPLAY, SEO_PAGES, SERVICE_HUBS, SITE_NAME, cityFromTargetArea, toPath } from "@/lib/site-data";

export default function HomePage() {
  return (
    <main className="pulse-main">
      <section className="pulse-hero">
        <div className="pulse-wrap pulse-hero-grid">
          <div className="pulse-hero-copy">
            <p className="pulse-kicker">Emergency Roofing Network</p>
            <h1>Contain The Leak. Protect The Property. Act Fast.</h1>
            <p className="pulse-lead">
              {SITE_NAME} gives you a direct emergency path from first warning signs to actionable next steps,
              with city-specific routes for storm damage, active leak spread, and urgent roof stabilization.
            </p>
            <div className="pulse-actions">
              <a className="pulse-call" href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, "")}`}>Call {PHONE_DISPLAY}</a>
              <Link className="pulse-btn" href="/services">Compare Service Paths</Link>
            </div>
            <div className="pulse-badge-row">
              <span className="pulse-badge">24/7 Urgent Triage</span>
              <span className="pulse-badge">Storm + Leak Specialists</span>
              <span className="pulse-badge">Residential + Commercial</span>
            </div>
          </div>

          <aside className="pulse-hero-showcase">
            <article className="pulse-hero-panel pulse-hero-panel-priority">
              <p className="pulse-kicker">Immediate Priorities</p>
              <h3>First 10 Minutes</h3>
              <ul className="pulse-list-check">
                <li>Identify active water entry points</li>
                <li>Protect high-value interior areas</li>
                <li>Escalate to emergency repair route</li>
              </ul>
            </article>
            <div className="pulse-hero-stat-grid">
              <article className="pulse-hero-stat"><strong>{SEO_PAGES.length}</strong><span>Localized pages</span></article>
              <article className="pulse-hero-stat"><strong>24/7</strong><span>Emergency routing</span></article>
              <article className="pulse-hero-stat"><strong>4 Steps</strong><span>Triage to repair</span></article>
              <article className="pulse-hero-stat"><strong>1 Call</strong><span>To begin response</span></article>
            </div>
          </aside>
        </div>
      </section>

      <section className="pulse-trust-band">
        <div className="pulse-wrap pulse-trust-wrap">
          <div className="pulse-trust-list">
            <article className="pulse-trust-item"><strong>Contain First</strong><span>Reduce interior spread before full repairs.</span></article>
            <article className="pulse-trust-item"><strong>Practical Guidance</strong><span>Clear actions while waiting for response.</span></article>
            <article className="pulse-trust-item"><strong>Localized Routing</strong><span>City-specific pages for intent matching.</span></article>
            <article className="pulse-trust-item"><strong>Storm-Aware</strong><span>Built for severe weather conditions.</span></article>
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <h2>Emergency Response Flow</h2>
          <div className="pulse-grid pulse-grid-2 pulse-process">
            <article className="pulse-card pulse-step"><h3>Leak Intake</h3><p>We identify severity, weather exposure, and immediate risk.</p></article>
            <article className="pulse-card pulse-step"><h3>Damage Control</h3><p>Initial protection guidance to limit water migration.</p></article>
            <article className="pulse-card pulse-step"><h3>Roof Assessment</h3><p>Root-cause isolation and scope definition.</p></article>
            <article className="pulse-card pulse-step"><h3>Repair Roadmap</h3><p>Clear next steps for immediate and permanent fixes.</p></article>
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <h2>High-Priority Service Pages</h2>
          <div className="pulse-grid pulse-grid-3">
            {SERVICE_HUBS.slice(0, 9).map((page, i) => (
              <Link className={`pulse-card ${i % 2 === 0 ? "pulse-card-accent" : ""}`} key={page.pageSlug} href={toPath(page.pageSlug)}>
                <h3>{page.pageTitle.replace(/\s*\|.*/, "")}</h3>
                <p>{page.primaryKeyword}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <h2>City Coverage</h2>
          <div className="pulse-grid pulse-grid-4">
            {CITY_PAGES.slice(0, 24).map((page) => (
              <Link className="pulse-chip" key={page.pageSlug} href={toPath(page.pageSlug)}>{cityFromTargetArea(page.targetArea)}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <h2>Planning Guides</h2>
          <div className="pulse-grid pulse-grid-2">
            {BLOG_POSTS.slice(0, 8).map((page) => (
              <Link className="pulse-card" key={page.pageSlug} href={`/blog/${toPath(page.pageSlug).replace(/^\//, "").replace(/^blog\//, "")}`}>
                <h3>{page.pageTitle}</h3>
                <p>Read before booking urgent work.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
