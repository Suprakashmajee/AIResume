import { Link } from 'react-router-dom'

const SUPPORT_EMAIL = 'support@airesumedraft.com'

export function AboutPage() {
  return (
    <section className="section page-top legal-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">About</p>
          <h1>About AiResumeDraft</h1>
          <p className="lede">
            AiResumeDraft helps job seekers draft clear, ATS-friendly resumes with guided sections,
            professional templates, and practical writing suggestions.
          </p>
        </div>

        <article className="legal-body">
          <h2>Who we are</h2>
          <p>
            AiResumeDraft is an independent resume-building website operated for people who need a
            faster way to organize work history, skills, and achievements into a polished document.
            The product is available at{' '}
            <a href="https://airesumedraft.com" rel="noopener noreferrer">
              airesumedraft.com
            </a>
            .
          </p>

          <h2>What we offer</h2>
          <ul>
            <li>A step-by-step resume builder with live preview</li>
            <li>Multiple professional templates for different career styles</li>
            <li>Example resumes and writing tips for common job roles</li>
            <li>Local draft saving in your browser so you can continue later</li>
            <li>Export options including print-ready PDF and plain text</li>
          </ul>

          <h2>How we approach content</h2>
          <p>
            Our goal is practical help, not empty filler. Pages on this site explain how the builder
            works, how to choose a template, and how to improve resume wording. We keep the
            experience free to start so you can create and refine a resume without a complicated
            signup wall.
          </p>

          <h2>Advertising</h2>
          <p>
            AiResumeDraft may display advertisements through Google AdSense and similar partners to
            keep the core tools available at no cost. Ads are separate from resume content and do not
            change your draft. For details on cookies and data used for advertising, see our{' '}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about the product, privacy, or account support can be sent to{' '}
            <strong>{SUPPORT_EMAIL}</strong>. You can also visit our{' '}
            <Link to="/contact">Contact</Link> page for the support address and copy options.
          </p>
        </article>
      </div>
    </section>
  )
}
