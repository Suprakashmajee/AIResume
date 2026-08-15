import { Link } from 'react-router-dom'

const SUPPORT_EMAIL = 'support@airesumedraft.com'
const LAST_UPDATED = 'August 14, 2026'

export function TermsPage() {
  return (
    <section className="section page-top legal-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">Legal</p>
          <h1>Terms of Service</h1>
          <p className="lede">
            These Terms of Service govern your use of AiResumeDraft at airesumedraft.com. By using
            the site, you agree to these terms.
          </p>
          <p className="legal-meta">Last updated: {LAST_UPDATED}</p>
        </div>

        <article className="legal-body">
          <h2>1. Acceptance of terms</h2>
          <p>
            If you do not agree with these Terms, do not use AiResumeDraft. We may update these Terms
            periodically. The “Last updated” date shows when changes were published.
          </p>

          <h2>2. The service</h2>
          <p>
            AiResumeDraft provides tools to help you draft, edit, preview, and export resumes. Features
            may include templates, examples, writing suggestions, local draft saving, and optional
            sign-in. We may add, change, or remove features at any time.
          </p>

          <h2>3. Your responsibilities</h2>
          <ul>
            <li>Provide accurate information in your resume drafts</li>
            <li>Use the site only for lawful purposes</li>
            <li>Do not attempt to disrupt, scrape abusively, or reverse engineer the service</li>
            <li>Do not upload malware or content that violates others’ rights</li>
            <li>Keep any account credentials secure if you choose to sign in</li>
          </ul>

          <h2>4. Your content</h2>
          <p>
            You retain ownership of the resume content you create. You are responsible for the
            accuracy and legality of that content. By using the builder, you grant us a limited
            permission to process your content as needed to provide the service (for example,
            rendering previews and exports in your browser session).
          </p>

          <h2>5. No employment guarantee</h2>
          <p>
            AiResumeDraft is a writing and formatting aid. We do not guarantee interviews, job
            offers, ATS passage rates, or hiring outcomes. Always review your resume before sending
            it to employers.
          </p>

          <h2>6. Advertising</h2>
          <p>
            The site may display third-party advertisements, including Google AdSense. Ad content is
            provided by advertisers and ad networks and is not an endorsement by AiResumeDraft. See
            our <Link to="/privacy">Privacy Policy</Link> for cookie and advertising details.
          </p>

          <h2>7. Intellectual property</h2>
          <p>
            The AiResumeDraft name, branding, layout, and original site materials are owned by us or
            our licensors. You may not copy the site design or reuse our trademarks without
            permission. Template layouts are provided for your personal resume use.
          </p>

          <h2>8. Disclaimer of warranties</h2>
          <p>
            The service is provided “as is” and “as available.” To the fullest extent permitted by
            law, we disclaim warranties of merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that the site will be uninterrupted or error-free.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, AiResumeDraft and its operators are not liable
            for indirect, incidental, special, consequential, or punitive damages, or for lost
            profits, data, or opportunities arising from your use of the site.
          </p>

          <h2>10. Termination</h2>
          <p>
            We may suspend or stop providing access to the service if we believe these Terms are
            violated or if we discontinue the product. You may stop using the site at any time and
            clear local drafts from your browser.
          </p>

          <h2>11. Governing law</h2>
          <p>
            These Terms are governed by applicable laws in the jurisdiction where AiResumeDraft is
            operated, without regard to conflict-of-law principles. Local consumer protections may
            also apply.
          </p>

          <h2>12. Contact</h2>
          <p>
            Questions about these Terms: <strong>{SUPPORT_EMAIL}</strong>. Related pages:{' '}
            <Link to="/privacy">Privacy Policy</Link>, <Link to="/about">About</Link>,{' '}
            <Link to="/contact">Contact</Link>.
          </p>
        </article>
      </div>
    </section>
  )
}
