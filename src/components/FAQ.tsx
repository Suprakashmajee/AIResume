import { useId, useState, type ReactNode } from 'react'

export interface FaqItem {
  q: string
  a: string
}

export function FAQ({ items, title = 'Frequently asked questions' }: { items: FaqItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section className="section faq-section" aria-labelledby={`${baseId}-title`}>
      <div className="container narrow">
        <div className="section-head center">
          <p className="eyebrow">FAQ</p>
          <h2 id={`${baseId}-title`}>{title}</h2>
          <p className="section-lede">
            Straight answers about creating bills, privacy, and how Bill Store works in your browser.
          </p>
        </div>
        <div className="faq-list">
          {items.map((item, index) => {
            const open = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-btn-${index}`
            return (
              <div className={`faq-item${open ? ' open' : ''}`} key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="faq-trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden>
                      {open ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function PageIntro({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string
  title: string
  lede?: string
  children?: ReactNode
}) {
  return (
    <header className="page-intro container">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {lede ? <p className="page-intro-lede">{lede}</p> : null}
      {children}
    </header>
  )
}
