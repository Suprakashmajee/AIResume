import { Link } from 'react-router-dom'
import { articles } from '../data/articles'

export function BlogPage() {
  return (
    <section className="section page-top">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Resources</p>
          <h1>Resume and career guides</h1>
          <p className="lede">
            Practical articles on ATS-friendly writing, summaries, career changes, and tailoring your
            draft—written to help you use AiResumeDraft with a clearer strategy.
          </p>
        </div>

        <div className="article-index">
          {articles.map((article) => (
            <article key={article.slug} className="article-teaser">
              <p className="eyebrow">
                {article.category} · {article.readMinutes} min read
              </p>
              <h2>
                <Link to={`/resources/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{article.description}</p>
              <Link to={`/resources/${article.slug}`} className="text-link">
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
