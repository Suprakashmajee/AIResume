import { Link } from 'react-router-dom'
import { PageIntro } from '../components/FAQ'
import { AdSlot } from '../components/AdSlot'
import { siteDomain, siteName } from '../data/content'

export function AboutPage() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="About"
        title={`About ${siteName}`}
        lede={`${siteName} (${siteDomain}) is a free online bill and invoice generator built for freelancers, small businesses, and anyone who needs a clean PDF invoice without heavy accounting software.`}
      />
      <div className="container prose-block">
        <AdSlot className="ad-page" label="Sponsored" />
        <h2>Our mission</h2>
        <p>
          Getting paid should not require wrestling with desktop templates or paying for software you
          barely use. We built Bill Store so you can create professional invoices in the browser—
          with automatic totals, multi-currency formatting, logo support, and printable PDFs.
        </p>
        <h2>What makes Bill Store different</h2>
        <ul>
          <li>No mandatory account to create or download a bill</li>
          <li>Drafts can save locally in your browser for faster repeat invoicing</li>
          <li>Multiple templates and accent colors without redesigning from scratch</li>
          <li>Clear educational content so newcomers understand invoices vs receipts</li>
        </ul>
        <h2>Advertising</h2>
        <p>
          Bill Store is supported by advertising, including Google AdSense. Ads help keep the
          generator free. We aim for a readable experience: labeled ad slots, useful articles, and
          tools that work whether or not an ad loads.
        </p>
        <p>
          Questions? Visit our <Link to="/contact">Contact</Link> page or review the{' '}
          <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Use</Link>.
        </p>
        <p>
          <Link to="/generator" className="btn btn-primary">
            Create a bill
          </Link>
        </p>
      </div>
    </div>
  )
}
