import { Link } from 'react-router-dom'
import { PageIntro } from '../components/FAQ'
import { siteDomain, siteName } from '../data/content'

export function TermsPage() {
  const updated = 'August 15, 2026'

  return (
    <div className="page">
      <PageIntro
        eyebrow="Legal"
        title="Terms of Use"
        lede={`By using ${siteName} (${siteDomain}), you agree to these Terms of Use.`}
      />
      <div className="container prose-block legal">
        <p>
          <strong>Last updated:</strong> {updated}
        </p>
        <h2>1. Service</h2>
        <p>
          Bill Store provides a free online tool to create and export invoices/bills for personal or
          business use. Features may change, and availability is not guaranteed.
        </p>
        <h2>2. No professional advice</h2>
        <p>
          Templates and calculations are helpers, not legal, tax, or accounting advice. You are
          responsible for verifying amounts, tax treatment, and compliance with laws that apply to
          you.
        </p>
        <h2>3. Your content</h2>
        <p>
          You retain rights to the invoice content you create. You are responsible for the accuracy
          of business details, client information, and payment instructions you enter. Do not use
          the tool for unlawful, fraudulent, or misleading billing.
        </p>
        <h2>4. Acceptable use</h2>
        <ul>
          <li>Do not attempt to disrupt or abuse the website or its infrastructure.</li>
          <li>Do not misuse ads, scrape the site excessively, or impersonate Bill Store.</li>
          <li>Do not upload malware or unlawful content via any form or upload control.</li>
        </ul>
        <h2>5. Advertising</h2>
        <p>
          The site may display third-party advertisements, including Google AdSense. Ad partners may
          set cookies as described in our <Link to="/privacy">Privacy Policy</Link>.
        </p>
        <h2>6. Disclaimer</h2>
        <p>
          THE SERVICE IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
          INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do
          not warrant uninterrupted or error-free operation.
        </p>
        <h2>7. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Bill Store and its operators are not liable for
          indirect, incidental, special, consequential, or punitive damages, or any loss of profits,
          data, or business opportunities arising from your use of the site or invoices you create.
        </p>
        <h2>8. Changes</h2>
        <p>
          We may update these terms. Continued use after changes means you accept the revised terms.
        </p>
        <h2>9. Contact</h2>
        <p>
          Questions: <a href={`mailto:hello@${siteDomain}`}>hello@{siteDomain}</a>
        </p>
      </div>
    </div>
  )
}
