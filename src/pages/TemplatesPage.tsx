import { Link } from 'react-router-dom'
import { PageIntro } from '../components/FAQ'
import { AdSlot } from '../components/AdSlot'
import { templates } from '../data/content'
import { useInvoice } from '../context/InvoiceContext'
import type { InvoiceTemplateId } from '../types/invoice'

export function TemplatesPage() {
  const { updateInvoice } = useInvoice()

  return (
    <div className="page templates-page">
      <PageIntro
        eyebrow="Templates"
        title="Invoice templates for every kind of bill"
        lede="Pick a layout that matches your brand. Each template keeps line items, tax, and payment details readable—so clients know exactly what to pay."
      />
      <div className="container">
        <AdSlot className="ad-page" label="Sponsored" />
        <ul className="template-catalog">
          {templates.map((t) => (
            <li key={t.id}>
              <div className="template-card-visual" style={{ borderColor: t.accent }}>
                <span className="template-bar" style={{ background: t.accent }} />
                <span className="template-lines" aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <h2>{t.name}</h2>
              <p>{t.blurb}</p>
              <Link
                to="/generator"
                className="btn btn-primary"
                onClick={() =>
                  updateInvoice({
                    templateId: t.id as InvoiceTemplateId,
                    accentColor: t.accent,
                  })
                }
              >
                Use {t.name}
              </Link>
            </li>
          ))}
        </ul>
        <section className="prose-block">
          <h2>How to choose an invoice template</h2>
          <p>
            Classic and Minimal work well for consultants and professional services. Modern and
            Coastal suit creative studios and product businesses. Bold Ledger emphasizes the total
            due—helpful when payment follow-ups matter. You can change templates after filling your
            bill; Bill Store never forces you to start over.
          </p>
        </section>
      </div>
    </div>
  )
}
