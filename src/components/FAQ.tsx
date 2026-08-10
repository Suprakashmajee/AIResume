import { useState } from 'react'
import { faqs } from '../data/content'

export function FAQ({ id = 'faq' }: { id?: string }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section faq-section" id={id}>
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">FAQ</p>
          <h2>Answers before you hit apply</h2>
          <p className="lede">
            Straight talk on building, exporting, and polishing your AiResumeDraft resume.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = open === index
            return (
              <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen ? <p className="faq-a">{item.a}</p> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
