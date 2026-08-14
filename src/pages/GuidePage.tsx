import { Link } from 'react-router-dom'

export function GuidePage() {
  return (
    <section className="section page-top legal-page">
      <div className="container narrow">
        <div className="section-head">
          <p className="eyebrow">Guides</p>
          <h1>How to build a stronger resume</h1>
          <p className="lede">
            Practical steps for drafting a clear resume with AiResumeDraft—before you apply, after you
            export, and when you tailor for a specific role.
          </p>
        </div>

        <article className="legal-body">
          <h2>1. Start with a clean structure</h2>
          <p>
            Most hiring screens expect a predictable order: contact details, summary, experience,
            education, and skills. Use the builder steps to fill each section completely instead of
            dumping everything into one paragraph. Empty sections look unfinished; short, specific
            bullets look professional.
          </p>

          <h2>2. Write a summary that matches the job</h2>
          <p>
            A strong summary is two to four lines that state your role, years of experience, and the
            outcomes you are known for. Avoid vague phrases like “hard worker.” Prefer concrete
            language such as “Frontend developer with 4 years building React dashboards used by
            20,000 monthly users.”
          </p>

          <h2>3. Turn duties into results</h2>
          <p>
            For each job, lead with impact. Replace “Responsible for sales calls” with “Closed 18
            enterprise accounts in Q3, increasing regional revenue by 12%.” Numbers, tools, and
            scope help recruiters and ATS parsers understand your value quickly.
          </p>

          <h2>4. Choose a template for readability</h2>
          <p>
            Templates on AiResumeDraft are designed for clear hierarchy and ATS-friendly text. Pick
            a layout that fits your industry: classic for corporate roles, modern for product and
            design, compact when you have dense experience. Browse{' '}
            <Link to="/templates">Templates</Link> and compare with{' '}
            <Link to="/examples">Examples</Link> before you finalize styling.
          </p>

          <h2>5. Keep skills honest and searchable</h2>
          <p>
            List skills that appear in the job description only if you can discuss them in an
            interview. Group related tools (for example, “React, TypeScript, Vite”) and avoid long
            keyword stuffing. Recruiters skim; relevance beats volume.
          </p>

          <h2>6. Proof before you export</h2>
          <p>
            Check spelling, dates, and company names. Confirm phone and email are current. Export a
            PDF for applications and keep a plain-text copy for forms that strip formatting. Open the{' '}
            <Link to="/builder">Resume Builder</Link> anytime to refine a saved draft.
          </p>

          <h2>7. Tailor for each application</h2>
          <p>
            Reuse your master draft, then adjust the summary, top bullets, and skills for the role.
            Mirroring a few keywords from the posting—honestly—improves both human review and
            automated screening.
          </p>

          <p>
            Need help with the product itself? Email support@airesumedraft.com or visit{' '}
            <Link to="/contact">Contact</Link>.
          </p>
        </article>
      </div>
    </section>
  )
}
