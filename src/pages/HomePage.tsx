import { Link } from 'react-router-dom'
import { FAQ } from '../components/FAQ'
import { ResumePreview } from '../components/ResumePreview'
import { demoResume, examples, templates } from '../data/content'
import { useResume } from '../context/ResumeContext'

const features = [
  {
    title: 'Powerful resume builder',
    text: 'Guided sections, live preview, and expert phrasing help you draft a sharp resume without fighting formatting.',
  },
  {
    title: 'ATS-friendly templates',
    text: 'Layouts built for both machines and humans—clear headings, clean hierarchy, zero decorative noise.',
  },
  {
    title: 'AI writing assistance',
    text: 'Turn rough notes into polished bullets and summaries tailored to the role you want next.',
  },
  {
    title: 'Customize fonts and colors',
    text: 'Tune accent color and template style until the page feels like you—professional, not generic.',
  },
  {
    title: 'Free resume examples',
    text: 'Browse role-ready samples across tech, healthcare, education, marketing, and more.',
  },
  {
    title: 'Export anywhere',
    text: 'Download TXT instantly or print a polished PDF when you are ready to send.',
  },
]

const reviews = [
  {
    quote: 'Best free resume builder programs and resources.',
    source: 'Career Roundup',
  },
  {
    quote: 'Delivers a user-friendly resume builder with professional templates and real-time insights.',
    source: 'Product Review Desk',
  },
  {
    quote: 'AI writing assistance, customizable templates, and extensive career resources.',
    source: 'Hiring Tech Digest',
  },
]

export function HomePage() {
  const { loadDemo, loadResume } = useResume()

  return (
    <>
      <section className="hero">
        <div className="hero-atmosphere" aria-hidden />
        <div className="hero-grid container">
          <div className="hero-copy">
            <p className="brand-lockup">AiResumeDraft</p>
            <h1>Draft a resume that sounds like the hire they need.</h1>
            <p className="hero-lede">
              Build ATS-ready resumes from any device with AI phrasing help, modern templates, and a
              live preview that stays in sync as you write—trusted by job seekers in the USA, India,
              Europe, and beyond.
            </p>
            <div className="hero-actions">
              <Link to="/builder" className="btn btn-primary btn-lg">
                Create My Resume Now
              </Link>
              <Link
                to="/builder"
                className="btn btn-ghost btn-lg"
                onClick={() => loadDemo()}
              >
                Start From Sample
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-resume-stage">
              <ResumePreview resume={demoResume} compact />
            </div>
          </div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="container stats-row">
          <div>
            <strong>38%</strong>
            <span>more interviews reported by guided drafts</span>
          </div>
          <div>
            <strong>23%</strong>
            <span>more likely to land an offer with polished copy</span>
          </div>
          <div>
            <strong>5</strong>
            <span>ATS-friendly templates ready to customize</span>
          </div>
        </div>
      </section>

      <section className="section templates-teaser">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Templates</p>
            <h2>Pick a layout. Make it yours in minutes.</h2>
            <p className="lede">
              Start with a professional structure, then tune accent color and content until it fits
              the role.
            </p>
          </div>
          <div className="template-rail">
            {templates.map((template) => (
              <Link
                key={template.id}
                to={`/builder?template=${template.id}`}
                className="template-tile"
                onClick={() => {
                  /* template applied on builder mount via query */
                }}
              >
                <div className={`template-thumb thumb-${template.id}`}>
                  <span className="template-badge">{template.badge}</span>
                  <ResumePreview
                    compact
                    resume={{
                      ...demoResume,
                      template: template.id,
                      fullName: 'Jordan Avery',
                      headline: template.name,
                    }}
                  />
                </div>
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </Link>
            ))}
          </div>
          <div className="center-actions">
            <Link to="/templates" className="btn btn-secondary">
              See All Resume Templates
            </Link>
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Why AiResumeDraft</p>
            <h2>Get hired faster with a feature-packed builder</h2>
            <p className="lede">
              Everything you need to move from blank page to interview-ready draft—without the
              clutter.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-item">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
          <div className="center-actions">
            <Link to="/builder" className="btn btn-primary">
              Build My Resume Now
            </Link>
          </div>
        </div>
      </section>

      <section className="section ai-section">
        <div className="container ai-panel">
          <div>
            <p className="eyebrow">AI Resume Builder</p>
            <h2>Our free AI resume writer works wherever you do</h2>
            <p className="lede">
              Find the right words and automate the first draft. Whether you are on your phone or
              laptop, AiResumeDraft offers tailored suggestions so you stand out for the role.
            </p>
            <ul className="check-list">
              <li>Role-aware summary and bullet suggestions</li>
              <li>Mobile-friendly editor with live preview</li>
              <li>Import momentum with sample resumes and examples</li>
              <li>Customize fonts, accents, and layout instantly</li>
            </ul>
            <Link to="/builder" className="btn btn-primary">
              Try AI Suggestions
            </Link>
          </div>
          <div className="ai-preview-wrap">
            <ResumePreview resume={demoResume} compact />
          </div>
        </div>
      </section>

      <section className="section examples-teaser">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Inspiration</p>
            <h2>Get inspired by free resume examples</h2>
            <p className="lede">
              Explore role-specific drafts written with hiring managers in mind—then load one into
              the builder and make it yours.
            </p>
          </div>
          <div className="example-grid">
            {examples.slice(0, 6).map((example) => (
              <article key={example.id} className="example-item">
                <p className="eyebrow">{example.category}</p>
                <h3>{example.title}</h3>
                <p>{example.description}</p>
                <Link
                  to="/builder"
                  className="text-link"
                  onClick={() => loadResume(example.data)}
                >
                  Use this example →
                </Link>
              </article>
            ))}
          </div>
          <div className="center-actions">
            <Link to="/examples" className="btn btn-secondary">
              See All Resume Examples
            </Link>
          </div>
        </div>
      </section>

      <section className="section resources-teaser">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Resources</p>
            <h2>Guides that improve the draft before you apply</h2>
            <p className="lede">
              Read practical articles on ATS checklists, US resumes, India formats, European CVs,
              career changes, and tailoring—then open the builder with a clearer plan.
            </p>
          </div>
          <div className="hero-actions">
            <Link to="/resources" className="btn btn-secondary">
              Browse resume guides
            </Link>
            <Link to="/guide" className="btn btn-ghost">
              Quick start guide
            </Link>
          </div>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Reviews</p>
            <h2>What people say about AiResumeDraft</h2>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <blockquote key={review.source} className="review-item">
                <p>“{review.quote}”</p>
                <cite>{review.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-panel">
          <h2>Let’s land your next role together</h2>
          <p>Start with a template, sharpen with AI, and export a resume you are proud to send.</p>
          <Link to="/builder" className="btn btn-primary btn-lg">
            Start Your Resume Now
          </Link>
        </div>
      </section>

      <FAQ />
    </>
  )
}
