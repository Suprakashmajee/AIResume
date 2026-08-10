import { useState } from 'react'

const SUPPORT_EMAIL = 'support@airesumedraft.com'

export function ContactPage() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section page-top contact-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">Support</p>
          <h1>Contact AiResumeDraft</h1>
          <p className="lede">
            For help with the builder, templates, exports, or anything else, reach us at the support
            email below.
          </p>
        </div>

        <div className="contact-panel">
          <p className="contact-label">Support email</p>
          <p className="contact-email" aria-label="Support email address">
            {SUPPORT_EMAIL}
          </p>
          <button type="button" className="btn btn-secondary" onClick={copyEmail}>
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <p className="contact-note">
            You can select and copy the email address above. It will not open Outlook or another mail
            app from this page.
          </p>
        </div>
      </div>
    </section>
  )
}
