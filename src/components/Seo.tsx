import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getArticle } from '../data/articles'
import { defaultSeo, seoForPath, SITE_NAME, SITE_URL } from '../seo/routes'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertMetaMulti(attr: 'name' | 'property', key: string, values: string[]) {
  document.head
    .querySelectorAll(`meta[${attr}="${key}"]`)
    .forEach((node) => node.parentElement?.removeChild(node))
  values.forEach((content) => {
    const el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.setAttribute('content', content)
    document.head.appendChild(el)
  })
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v))
  }
}

export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    let title = seoForPath(pathname).title
    let description = seoForPath(pathname).description
    let path = seoForPath(pathname).path
    let noindex = seoForPath(pathname).noindex

    if (pathname.startsWith('/resources/')) {
      const slug = pathname.replace('/resources/', '').replace(/\/$/, '')
      const article = getArticle(slug)
      if (article) {
        title = `${article.title} — ${SITE_NAME}`
        description = article.description
        path = `/resources/${article.slug}`
        noindex = false
      }
    }

    const url = `${SITE_URL}${path === '/' ? '/' : path}`
    document.title = title

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    upsertMeta('name', 'googlebot', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('name', 'author', SITE_NAME)
    upsertMeta(
      'name',
      'keywords',
      'AI resume builder, ATS resume, free resume templates, resume examples, CV builder USA, resume format India, European CV, job application resume',
    )

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:locale', 'en_US')
    upsertMetaMulti('property', 'og:locale:alternate', ['en_IN', 'en_GB', 'en_IE', 'en_DE'])
    upsertMeta('property', 'og:image', `${SITE_URL}/og-image.jpg`)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', `${SITE_URL}/og-image.jpg`)

    upsertLink('canonical', url)
    upsertLink('alternate', url, { hreflang: 'en' })
    upsertLink('alternate', url, { hreflang: 'x-default' })

    // Keep a stable default description in the initial HTML for crawlers that read first paint.
    if (pathname === '/') {
      upsertMeta('name', 'description', defaultSeo.description)
    }
  }, [pathname])

  return null
}
