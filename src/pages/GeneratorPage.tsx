import { templates } from '../data/content'
import { useInvoice } from '../context/InvoiceContext'
import { InvoiceForm } from '../components/InvoiceForm'
import { InvoicePreview } from '../components/InvoicePreview'
import { AdSlot } from '../components/AdSlot'
import type { InvoiceTemplateId } from '../types/invoice'

export function GeneratorPage() {
  const {
    invoice,
    totals,
    mode,
    setMode,
    updateInvoice,
    resetInvoice,
    loadSample,
  } = useInvoice()

  const downloadPdf = () => {
    setMode('preview')
    window.setTimeout(() => window.print(), 150)
  }

  return (
    <div className="generator-page">
      <div className="generator-toolbar no-print">
        <div className="container toolbar-inner">
          <div className="mode-tabs" role="tablist" aria-label="Editor mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'edit'}
              className={mode === 'edit' ? 'active' : undefined}
              onClick={() => setMode('edit')}
            >
              Edit
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'preview'}
              className={mode === 'preview' ? 'active' : undefined}
              onClick={() => setMode('preview')}
            >
              Preview
            </button>
          </div>
          <div className="toolbar-actions">
            <button type="button" className="btn btn-ghost" onClick={loadSample}>
              Load sample
            </button>
            <button type="button" className="btn btn-ghost" onClick={resetInvoice}>
              New bill
            </button>
            <button type="button" className="btn btn-primary" onClick={downloadPdf}>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="container generator-layout">
        <div className={`generator-main${mode === 'preview' ? ' previewing' : ''}`}>
          {mode === 'edit' ? (
            <InvoiceForm />
          ) : (
            <div className="preview-stage print-area">
              <InvoicePreview invoice={invoice} totals={totals} />
            </div>
          )}
        </div>

        <aside className="generator-side no-print">
          <div className="side-panel">
            <h2>Templates</h2>
            <p className="side-hint">Click a style—your details stay the same.</p>
            <ul className="template-picker">
              {templates.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={invoice.templateId === t.id ? 'active' : undefined}
                    onClick={() =>
                      updateInvoice({
                        templateId: t.id as InvoiceTemplateId,
                        accentColor: t.accent,
                      })
                    }
                  >
                    <span className="picker-swatch" style={{ background: t.accent }} />
                    <span>
                      <strong>{t.name}</strong>
                      <small>{t.blurb}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <AdSlot className="ad-generator" label="Sponsored" />
          <div className="side-panel tip-panel">
            <h2>Quick tip</h2>
            <p>
              Your draft auto-saves in this browser. Use Download PDF, then choose “Save as PDF” in
              the print dialog for a shareable file.
            </p>
          </div>
        </aside>
      </div>

      {mode === 'edit' ? (
        <div className="container live-preview-dock no-print">
          <h2 className="dock-title">Live preview</h2>
          <div className="preview-stage compact">
            <InvoicePreview invoice={invoice} totals={totals} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
