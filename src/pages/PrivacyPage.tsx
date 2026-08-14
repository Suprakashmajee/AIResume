import { Link } from 'react-router-dom'

const SUPPORT_EMAIL = 'support@airesumedraft.com'
const LAST_UPDATED = 'August 14, 2026'

export function PrivacyPage() {
  return (
    <section className="section page-top legal-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="lede">
            This Privacy Policy explains how AiResumeDraft collects, uses, and protects information
            when you use airesumedraft.com.
          </p>
          <p className="legal-meta">Last updated: {LAST_UPDATED}</p>
        </div>

        <article className="legal-body">
          <h2>1. Who we are</h2>
          <p>
            AiResumeDraft (“we”, “us”, or “our”) operates the website at airesumedraft.com. For
            privacy questions, contact <strong>{SUPPORT_EMAIL}</strong>.
          </p>

          <h2>2. Information we collect</h2>
          <h3>Information you provide</h3>
          <ul>
            <li>
              Resume content you enter in the builder (name, contact details, work history, education,
              skills, and similar fields)
            </li>
            <li>Optional account details if you sign in (such as name and email)</li>
            <li>Messages you send to our support email</li>
          </ul>
          <h3>Information stored in your browser</h3>
          <p>
            Draft resumes and login session data may be stored in your browser’s local storage so you
            can continue editing without uploading every change to our servers. Clearing site data in
            your browser removes those drafts.
          </p>
          <h3>Automatically collected information</h3>
          <ul>
            <li>Basic technical data such as browser type, device type, and approximate location</li>
            <li>Pages visited and interactions needed to keep the site working</li>
            <li>Cookie and advertising identifiers when ads are shown (see Advertising below)</li>
          </ul>

          <h2>3. How we use information</h2>
          <ul>
            <li>To run the resume builder, templates, and export features</li>
            <li>To remember drafts and optional sign-in state on your device</li>
            <li>To respond to support requests</li>
            <li>To improve site performance, reliability, and content</li>
            <li>To show relevant ads through advertising partners when enabled</li>
          </ul>

          <h2>4. Advertising and cookies (Google AdSense)</h2>
          <p>
            We may use Google AdSense and related Google services to display ads. Google and its
            partners may use cookies or similar technologies to serve ads based on your visits to
            this site and/or other sites on the internet.
          </p>
          <ul>
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user’s prior
              visits to this or other websites.
            </li>
            <li>
              Google’s use of advertising cookies enables it and its partners to serve ads based on
              visits to this site and/or other sites.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              . You can also visit{' '}
              <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
                aboutads.info
              </a>{' '}
              for more opt-out options.
            </li>
          </ul>
          <p>
            For more information about how Google uses data, see{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              How Google uses information from sites or apps that use our services
            </a>
            .
          </p>

          <h2>5. How we share information</h2>
          <p>
            We do not sell your resume content. We may share limited technical or advertising data
            with service providers who help us host the site, show ads, or analyze traffic, only as
            needed to operate AiResumeDraft. We may also disclose information if required by law.
          </p>

          <h2>6. Data retention</h2>
          <p>
            Browser-stored drafts remain on your device until you clear them or overwrite them.
            Support emails are kept only as long as needed to resolve your request. Advertising and
            analytics partners may retain data according to their own policies.
          </p>

          <h2>7. Security</h2>
          <p>
            We use reasonable technical measures to protect the site. No method of transmission or
            storage is 100% secure. Avoid entering sensitive passwords or financial details into
            resume fields that are not needed for job applications.
          </p>

          <h2>8. Children’s privacy</h2>
          <p>
            AiResumeDraft is intended for users seeking employment and is not directed at children
            under 13 (or the minimum age required in your region). We do not knowingly collect
            personal information from children.
          </p>

          <h2>9. Your choices</h2>
          <ul>
            <li>Clear local drafts and login data from your browser settings</li>
            <li>Contact us to ask about account or support data we may hold</li>
            <li>Use Google Ads Settings or industry opt-out tools to limit personalized ads</li>
          </ul>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The “Last updated” date at the top
            will change when we do. Continued use of the site after updates means you accept the
            revised policy.
          </p>

          <h2>11. Contact</h2>
          <p>
            Privacy questions: <strong>{SUPPORT_EMAIL}</strong>. Also see our{' '}
            <Link to="/contact">Contact</Link> page and <Link to="/terms">Terms of Service</Link>.
          </p>
        </article>
      </div>
    </section>
  )
}
