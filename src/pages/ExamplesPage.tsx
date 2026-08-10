import { Link } from 'react-router-dom'
import { examples } from '../data/content'
import { useResume } from '../context/ResumeContext'

export function ExamplesPage() {
  const { loadResume } = useResume()

  return (
    <section className="section page-top">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Resume examples</p>
          <h1>Role-ready drafts you can customize</h1>
          <p className="lede">
            Browse examples across industries, then load any sample into the builder and rewrite it
            for your story.
          </p>
        </div>
        <div className="example-grid dense">
          {examples.map((example) => (
            <article key={example.id} className="example-item">
              <p className="eyebrow">{example.category}</p>
              <h3>{example.title}</h3>
              <p>{example.description}</p>
              <ul className="chip-list">
                {example.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                to="/builder"
                className="btn btn-secondary"
                onClick={() => loadResume(example.data)}
              >
                Open in builder
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
