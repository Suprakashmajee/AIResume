import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { AdSlot } from '../components/AdSlot'
import { FAQ } from '../components/FAQ'
import { InvoicePreview } from '../components/InvoicePreview'
import { useInvoice } from '../context/InvoiceContext'
import { audiences, faqItems, features, howSteps, siteName, templates } from '../data/content'
import { calcTotals, createSampleInvoice } from '../utils/invoice'

export function HomePage() {
  const sample = createSampleInvoice()
  const sampleTotals = calcTotals(sample)
  const { loadSample } = useInvoice()

  return (
    <>
      <section className="hero">
        <div className="hero-atmosphere" aria-hidden />
        <div className="hero-visual" aria-hidden>
          <div className="hero-sheet-wrap">
            <InvoicePreview invoice={sample} totals={sampleTotals} />
          </div>
        </div>
        <div className="container hero-content">
          <p className="brand-lockup">{siteName}</p>
          <h1>Free online bill & invoice generator</h1>
          <p className="hero-lede">
            Create accurate, professional invoices in minutes. Add your logo, line items, tax, and
            payment details—then download a clean PDF your clients will trust.
          </p>
          <div className="hero-actions">
            <Link to="/generator" className="btn btn-primary btn-lg">
              Create your bill now
            </Link>
            <Link
              to="/generator"
              className="btn btn-ghost btn-lg"
              onClick={() => loadSample()}
            >
              Try a sample invoice
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <AdSlot className="ad-home-top" label="Sponsored" />
      </div>

      <section className="section how-section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">How it works</p>
            <h2>Make a professional bill in three steps</h2>
            <p className="section-lede">
              Bill Store keeps the flow simple: pick a look, enter details, export. Calculations stay
              accurate so you can focus on getting paid.
            </p>
          </div>
          <ol className="how-grid">
            {howSteps.map((step) => (
              <li key={step.step}>
                <span className="how-num">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Features</p>
            <h2>Billing made easy in every aspect</h2>
            <p className="section-lede">
              Everything you need for freelancers, shops, and agencies—without complicated accounting
              software.
            </p>
          </div>
          <ul className="feature-grid">
            {features.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section templates-teaser">
        <div className="container">
          <div className="section-head split">
            <div>
              <p className="eyebrow">Templates</p>
              <h2>Layouts that look paid—not pasted into a spreadsheet</h2>
              <p className="section-lede">
                Switch designs anytime. Your invoice data stays put while the presentation changes.
              </p>
            </div>
            <Link to="/templates" className="btn btn-ghost">
              Browse all templates
            </Link>
          </div>
          <ul className="template-strip">
            {templates.map((t) => (
              <li key={t.id} style={{ '--swatch': t.accent } as CSSProperties}>
                <span className="swatch" aria-hidden />
                <strong>{t.name}</strong>
                <p>{t.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section audience-section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Who it’s for</p>
            <h2>Built for every everyday billing need</h2>
            <p className="section-lede">
              Whether you invoice once a month or every project milestone, Bill Store keeps the
              paperwork light.
            </p>
          </div>
          <ul className="audience-grid">
            {audiences.map((a) => (
              <li key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
          <div className="mid-cta">
            <Link to="/generator" className="btn btn-primary btn-lg">
              Get started for free
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <AdSlot className="ad-home-mid" label="Sponsored" />
      </div>

      <section className="section content-section">
        <div className="container prose-block">
          <h2>Why use an online invoice generator?</h2>
          <p>
            Professional invoices set clear expectations: what was delivered, how much is owed, and
            how to pay. Spreadsheets and Word docs often drift out of format, hide calculation errors,
            or look inconsistent from one client to the next. An online bill generator like Bill Store
            standardizes your layout, calculates totals automatically, and lets you export a PDF you
            can send the same day.
          </p>
          <p>
            Bill Store is designed to be Google AdSense-friendly and useful: substantial guides on
            this site explain invoicing basics, privacy, and terms of use. The generator itself runs
            in your browser—no forced signup—so you can create a bill quickly on desktop or mobile.
          </p>
          <h3>Tips for invoices that get paid faster</h3>
          <ul>
            <li>Use a unique invoice number and clear due date on every bill.</li>
            <li>Include payment details (bank, PayPal, or link) in plain language.</li>
            <li>Itemize work with quantities and rates so clients can reconcile quickly.</li>
            <li>Add tax and discounts explicitly instead of burying them in a single line.</li>
            <li>Keep branding consistent—logo and accent color help clients recognize you.</li>
          </ul>
        </div>
      </section>

      <FAQ items={faqItems} />

      <section className="section final-cta">
        <div className="container final-cta-inner">
          <h2>Ready to send your next bill?</h2>
          <p>Open the free generator, fill in a few fields, and download a polished invoice PDF.</p>
          <Link to="/generator" className="btn btn-primary btn-lg">
            Open invoice generator
          </Link>
        </div>
      </section>
    </>
  )
}
