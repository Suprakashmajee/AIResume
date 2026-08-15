import { PageIntro } from '../components/FAQ'
import { siteDomain, siteName } from '../data/content'

export function PrivacyPage() {
  const updated = 'August 15, 2026'

  return (
    <div className="page">
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        lede={`This Privacy Policy explains how ${siteName} (${siteDomain}) handles information when you use our free invoice generator and related pages.`}
      />
      <div className="container prose-block legal">
        <p>
          <strong>Last updated:</strong> {updated}
        </p>
        <h2>1. Overview</h2>
        <p>
          Bill Store is a browser-based bill and invoice generator. You can create invoices without
          creating an account. Invoice content you type is processed in your browser. Optional local
          saving stores a draft on your device using browser storage.
        </p>
        <h2>2. Information we may collect</h2>
        <ul>
          <li>
            <strong>Usage data:</strong> Standard server or hosting logs may include IP address,
            browser type, referring URL, and pages visited.
          </li>
          <li>
            <strong>Contact email:</strong> If you email us, we receive the address and message you
            send.
          </li>
          <li>
            <strong>Local drafts:</strong> If you use auto-save, invoice fields may be stored in
            your browser’s local storage on that device only.
          </li>
          <li>
            <strong>Advertising cookies:</strong> Google AdSense and partners may use cookies or
            similar technologies to show relevant ads and measure performance.
          </li>
        </ul>
        <h2>3. How we use information</h2>
        <p>We use information to operate and improve the site, respond to inquiries, maintain
          security, and—where applicable—display advertising that supports a free product.
        </p>
        <h2>4. Google AdSense</h2>
        <p>
          Third-party vendors, including Google, use cookies to serve ads based on a user’s prior
          visits to this or other websites. Google’s use of advertising cookies enables it and its
          partners to serve ads based on visits. You may opt out of personalized advertising by
          visiting{' '}
          <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">
            Google Ads Settings
          </a>
          . Learn more in{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google’s Advertising policies
          </a>
          .
        </p>
        <h2>5. Data sharing</h2>
        <p>
          We do not sell your invoice contents. Service providers (hosting, analytics, advertising)
          may process technical data as needed to run the site. We may disclose information if
          required by law.
        </p>
        <h2>6. Retention</h2>
        <p>
          Local drafts remain until you clear site data or use “New bill”. Emails we receive are kept
          as long as needed to respond and maintain records.
        </p>
        <h2>7. Children’s privacy</h2>
        <p>
          The site is not directed to children under 13 (or the minimum age in your jurisdiction). We
          do not knowingly collect personal information from children.
        </p>
        <h2>8. Your choices</h2>
        <ul>
          <li>Clear browser storage to remove local invoice drafts.</li>
          <li>Use browser controls to block cookies (some features or ads may not work).</li>
          <li>Contact us for privacy questions at hello@{siteDomain}.</li>
        </ul>
        <h2>9. Changes</h2>
        <p>
          We may update this policy from time to time. The “Last updated” date will change when we
          post revisions.
        </p>
        <h2>10. Contact</h2>
        <p>
          Privacy questions: <a href={`mailto:hello@${siteDomain}`}>hello@{siteDomain}</a>
        </p>
      </div>
    </div>
  )
}
