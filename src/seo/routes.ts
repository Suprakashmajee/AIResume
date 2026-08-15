export type SeoConfig = {
  title: string
  description: string
  path: string
  noindex?: boolean
}

const siteName = 'AiResumeDraft'

export const defaultSeo: SeoConfig = {
  title: `${siteName} — Free AI Resume Builder for ATS-Friendly Resumes`,
  description:
    'Build an ATS-friendly resume online with AiResumeDraft. Free templates, AI writing help, and live preview for job seekers in the USA, India, Europe, and worldwide.',
  path: '/',
}

export const routeSeo: Record<string, SeoConfig> = {
  '/': defaultSeo,
  '/templates': {
    title: `Resume Templates — ${siteName}`,
    description:
      'Browse ATS-friendly resume templates. Customize layout and accent color, then export a clean PDF for US, India, and European job applications.',
    path: '/templates',
  },
  '/examples': {
    title: `Resume Examples by Role — ${siteName}`,
    description:
      'Explore role-ready resume examples and open any sample in the builder to rewrite it for your experience.',
    path: '/examples',
  },
  '/builder': {
    title: `Online Resume Builder — ${siteName}`,
    description:
      'Create your resume step by step with live preview, AI phrasing help, and export options. Free to start.',
    path: '/builder',
  },
  '/guide': {
    title: `How to Build a Stronger Resume — ${siteName}`,
    description:
      'A practical resume writing guide covering summaries, impact bullets, templates, and tailoring for each job.',
    path: '/guide',
  },
  '/resources': {
    title: `Resume Writing Resources & Guides — ${siteName}`,
    description:
      'Free resume guides for ATS, career changes, first jobs, US resumes, India formats, and European CVs.',
    path: '/resources',
  },
  '/about': {
    title: `About ${siteName}`,
    description:
      'Learn about AiResumeDraft, the free AI-assisted resume builder helping job seekers draft clearer applications.',
    path: '/about',
  },
  '/privacy': {
    title: `Privacy Policy — ${siteName}`,
    description: 'How AiResumeDraft collects, uses, and protects information, including advertising cookies.',
    path: '/privacy',
  },
  '/terms': {
    title: `Terms of Service — ${siteName}`,
    description: 'Terms governing use of the AiResumeDraft website and resume builder tools.',
    path: '/terms',
  },
  '/contact': {
    title: `Contact Support — ${siteName}`,
    description: 'Contact AiResumeDraft support at support@airesumedraft.com for product or account help.',
    path: '/contact',
  },
  '/login': {
    title: `Log in — ${siteName}`,
    description: 'Log in or create an AiResumeDraft account to save your profile.',
    path: '/login',
    noindex: true,
  },
  '/profile': {
    title: `Your Profile — ${siteName}`,
    description: 'View and update your AiResumeDraft account profile.',
    path: '/profile',
    noindex: true,
  },
}

export function seoForPath(pathname: string): SeoConfig {
  if (routeSeo[pathname]) return routeSeo[pathname]
  if (pathname.startsWith('/resources/')) {
    return {
      title: `Resume Guide — ${siteName}`,
      description: 'Practical resume writing guidance from AiResumeDraft.',
      path: pathname,
    }
  }
  return { ...defaultSeo, path: pathname }
}

export const SITE_URL = 'https://airesumedraft.com'
export const SITE_NAME = siteName
