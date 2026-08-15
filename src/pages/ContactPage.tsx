import { PageIntro } from '../components/FAQ'
import { AdSlot } from '../components/AdSlot'
import { siteDomain, siteName } from '../data/content'

export function ContactPage() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="Contact"
        title="Contact Bill Store"
        lede="Have a question about the invoice generator, privacy, or advertising? Send a note and we will do our best to help."
      />
      <div className="container contact-layout">
        <AdSlot className="ad-page" label="Sponsored" />
        <div className="prose-block">
          <h2>Reach us</h2>
          <p>
            Email:{' '}
            <a href={`mailto:hello@${siteDomain}`}>hello@{siteDomain}</a>
          </p>
          <p>
            Website: <a href={`https://${siteDomain}`}>https://{siteDomain}</a>
          </p>
          <p>
            For privacy requests, include “Privacy” in the subject line. For AdSense or partnership
            inquiries, include “Advertising”.
          </p>
          <h2>Before you write</h2>
          <ul>
            <li>PDF tips and FAQs are on the home page.</li>
            <li>Drafts save in your browser—try another device if you cannot find a saved bill.</li>
            <li>We cannot recover invoices stored only on your local device.</li>
          </ul>
          <p className="muted-note">
            {siteName} is an independent tool site. Response times may vary; please allow a few
            business days.
          </p>
        </div>
      </div>
    </div>
  )
}
