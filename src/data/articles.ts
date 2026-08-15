export type Article = {
  slug: string
  title: string
  description: string
  category: string
  readMinutes: number
  updated: string
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
}

export const articles: Article[] = [
  {
    slug: 'ats-resume-checklist',
    title: 'ATS resume checklist: what parsers actually read',
    description:
      'A practical checklist for building resumes that survive applicant tracking systems without sounding robotic.',
    category: 'ATS',
    readMinutes: 8,
    updated: 'August 15, 2026',
    sections: [
      {
        heading: 'Why ATS formatting still matters',
        paragraphs: [
          'Many employers route applications through an applicant tracking system before a recruiter reads a word. The system stores your file, extracts text into fields, and sometimes ranks keywords against the job description. If your layout hides text in images, multi-column text boxes, or unusual fonts, important details can be skipped.',
          'AiResumeDraft templates keep a clear heading structure, standard section labels, and selectable text so both parsers and people can follow your story.',
        ],
      },
      {
        heading: 'Checklist before you export',
        paragraphs: ['Run through these points every time you tailor a resume for a new role.'],
        bullets: [
          'Use standard section titles: Summary, Experience, Education, Skills',
          'Keep dates in a consistent format such as Jan 2022 – Present',
          'Spell company names and job titles exactly as they appear in official materials',
          'Avoid tables, text boxes, and icons that replace words',
          'Put contact details as plain text in the header, not only inside a graphic',
          'Match a few role-specific keywords honestly in your summary and top bullets',
          'Export a PDF that still allows text selection when you open it',
        ],
      },
      {
        heading: 'Keywords without stuffing',
        paragraphs: [
          'Mirror language from the posting only when it reflects real experience. If the role asks for stakeholder communication and you led weekly product reviews with sales and support, say that in a bullet. Repeating the same phrase ten times does not help and can look unnatural to a human reviewer.',
        ],
      },
      {
        heading: 'Final human pass',
        paragraphs: [
          'After the ATS check, read the resume out loud. If a sentence is hard to say, it will be hard to skim. Ask whether each bullet proves impact with a result, tool, or scope. Then send the version that is both machine-readable and easy for a hiring manager to trust in thirty seconds.',
        ],
      },
    ],
  },
  {
    slug: 'resume-bullet-formulas',
    title: 'Resume bullet formulas that show impact',
    description:
      'Replace vague duties with measurable bullets using simple formulas you can reuse across any industry.',
    category: 'Writing',
    readMinutes: 7,
    updated: 'August 15, 2026',
    sections: [
      {
        heading: 'Duty lines vs impact lines',
        paragraphs: [
          '“Responsible for customer onboarding” tells a recruiter what was assigned. “Reduced onboarding time from 10 days to 6 by redesigning the welcome checklist for 120 monthly accounts” tells them what changed because you were there.',
        ],
      },
      {
        heading: 'Three formulas that work',
        paragraphs: ['Use one of these patterns, then fill in your numbers and tools.'],
        bullets: [
          'Action + task + result: Launched a weekly QA checklist that cut production defects by 18%',
          'Action + scope + method: Managed a 6-person support pod using shared macros and daily standups',
          'Action + problem + outcome: Rebuilt the reporting dashboard so leadership reviewed metrics in one view instead of four spreadsheets',
        ],
      },
      {
        heading: 'Where to find numbers',
        paragraphs: [
          'Pull metrics from dashboards, performance reviews, ticket volumes, revenue reports, class sizes, patient loads, or project timelines. If exact figures are confidential, use ranges or relative change (“double-digit growth,” “cut cycle time by about a third”). Approximate honesty beats invented precision.',
        ],
      },
      {
        heading: 'Edit for scannability',
        paragraphs: [
          'Start bullets with strong verbs: built, led, automated, negotiated, redesigned, trained. Keep each bullet to one or two lines. Group related wins under the role where they happened, and put the strongest proof near the top of each job.',
        ],
      },
    ],
  },
  {
    slug: 'resume-summary-examples',
    title: 'Resume summary examples for common career stages',
    description:
      'Short summary patterns for early-career, mid-level, and career-change resumes—with notes on what to customize.',
    category: 'Writing',
    readMinutes: 6,
    updated: 'August 15, 2026',
    sections: [
      {
        heading: 'What a summary is for',
        paragraphs: [
          'Your summary is a headline paragraph, not a biography. In three to five lines, state who you are professionally, the environments you work in, and the outcomes you are known for. Save detailed stories for experience bullets.',
        ],
      },
      {
        heading: 'Early-career pattern',
        paragraphs: [
          'Emphasize projects, internships, coursework applied in practice, and tools you can use on day one. Example direction: “Junior data analyst with internship experience cleaning sales datasets in SQL and presenting weekly insights to a five-person ops team. Comfortable with Excel, Looker Studio, and clear stakeholder updates.”',
        ],
      },
      {
        heading: 'Mid-level pattern',
        paragraphs: [
          'Lead with years of experience, domain, and a signature result. Example direction: “Operations manager with 6 years in ecommerce fulfillment. Improved on-time ship rate to 97% while coaching a 14-person warehouse team through peak season.”',
        ],
      },
      {
        heading: 'Career-change pattern',
        paragraphs: [
          'Connect transferable strengths to the target role without hiding your past. Example direction: “Classroom teacher moving into instructional design. Built 40+ lesson modules, ran parent workshops for 200 families, and now applying curriculum design skills to employee learning programs.”',
          'Customize every summary for the posting. Keep a master version in AiResumeDraft, then edit the first two lines before each application.',
        ],
      },
    ],
  },
  {
    slug: 'first-job-resume-guide',
    title: 'How to write a resume for your first job',
    description:
      'Build a credible first resume using projects, coursework, volunteering, and part-time work—even with limited paid experience.',
    category: 'Career stages',
    readMinutes: 7,
    updated: 'August 15, 2026',
    sections: [
      {
        heading: 'You already have evidence',
        paragraphs: [
          'First-job resumes fail when they apologize for missing years instead of presenting proof of readiness. Class projects, campus roles, freelance gigs, caregiving logistics, sports leadership, and volunteer shifts all demonstrate reliability and skill when you describe them clearly.',
        ],
      },
      {
        heading: 'Section order that helps',
        paragraphs: [
          'Put Education near the top if it is your strongest signal. Follow with Projects or Experience, then Skills. A short summary can frame the kind of role you want, such as retail associate, helpdesk technician, or junior marketing coordinator.',
        ],
        bullets: [
          'List relevant coursework only when it maps to the job',
          'Describe projects with tools used and what you delivered',
          'Quantify part-time work: shifts covered, customers helped, stock accuracy',
          'Include volunteer roles with real ownership, not only attendance',
        ],
      },
      {
        heading: 'Skills employers can trust',
        paragraphs: [
          'Separate tools you have practiced from tools you have only watched in a tutorial. If you built a small website for a club, list the stack. If you handled cash and resolved complaints in a cafe, say so—customer communication is a workplace skill.',
        ],
      },
      {
        heading: 'Keep the design quiet',
        paragraphs: [
          'Choose a clean template, one accent color, and consistent spacing. Recruiters hiring for first roles skim for clarity and professionalism. A readable one-page draft usually beats a decorative two-page layout with thin content.',
        ],
      },
    ],
  },
  {
    slug: 'career-change-resume',
    title: 'Career change resume: reframe experience without erasing it',
    description:
      'How to reposition past roles for a new field while staying honest and easy for recruiters to follow.',
    category: 'Career stages',
    readMinutes: 8,
    updated: 'August 15, 2026',
    sections: [
      {
        heading: 'Lead with the destination',
        paragraphs: [
          'A career-change resume should make the target role obvious in the first screen. Use a summary that names the transition, highlight transferable wins first, and move less relevant older details lower or into a shorter combined section.',
        ],
      },
      {
        heading: 'Translate, do not invent',
        paragraphs: [
          'Retail inventory work can support operations analyst applications when you describe forecasting, variance checks, and process improvements. Nursing documentation experience can support healthtech onboarding roles when you describe training peers on systems and reducing error rates. Keep the facts; change the framing.',
        ],
      },
      {
        heading: 'Bridge projects and learning',
        paragraphs: [
          'Add a Projects or Professional development section for certificates, portfolio pieces, bootcamp work, or volunteer assignments in the new field. These entries show momentum and reduce the risk that recruiters see only your previous job title.',
        ],
      },
      {
        heading: 'Tailor ruthlessly',
        paragraphs: [
          'Keep a master draft with everything, then create a targeted version for each posting. Swap the summary, reorder bullets, and trim skills that do not serve the new role. AiResumeDraft makes that editing loop faster so you are not rebuilding formatting from scratch each time.',
        ],
      },
    ],
  },
  {
    slug: 'common-resume-mistakes',
    title: 'Common resume mistakes that quietly cost interviews',
    description:
      'Fix frequent issues with length, vague claims, outdated contact details, and templates that fight both ATS and humans.',
    category: 'Editing',
    readMinutes: 6,
    updated: 'August 15, 2026',
    sections: [
      {
        heading: 'Mistakes worth catching early',
        paragraphs: ['Most rejected drafts share a few preventable problems.'],
        bullets: [
          'Typos in your email or phone number',
          'Objectives that only say what you want, not what you offer',
          'Walls of text instead of scannable bullets',
          'Skills lists stuffed with every tool you have ever opened',
          'Inconsistent dates or overlapping unexplained gaps',
          'Designs that look impressive in a mockup but fail when parsed as text',
        ],
      },
      {
        heading: 'Length and relevance',
        paragraphs: [
          'One page is enough for many early and mid-career roles. Two pages can work for longer careers if every section earns its space. Cut tasks that every employee in that job would do, and keep the work that made you comparatively effective.',
        ],
      },
      {
        heading: 'Proof before send',
        paragraphs: [
          'Export your file, open it on another device, and click every link. Ask a trusted reader whether your top three bullets prove value in under a minute. Small edits here often matter more than another round of template shopping.',
        ],
      },
    ],
  },
  {
    slug: 'tailor-resume-job-description',
    title: 'How to tailor a resume to a job description in 20 minutes',
    description:
      'A fast workflow for matching your draft to a posting without rewriting your whole career history.',
    category: 'Strategy',
    readMinutes: 7,
    updated: 'August 15, 2026',
    sections: [
      {
        heading: 'Step 1: Extract the employer’s priorities',
        paragraphs: [
          'Highlight required skills, repeated phrases, tools, and outcomes in the posting. Separate must-haves from nice-to-haves. Those must-haves should appear in your summary, skills, or top bullets if you truly have them.',
        ],
      },
      {
        heading: 'Step 2: Reorder, do not rebuild',
        paragraphs: [
          'Open your master resume in the builder. Move the most relevant experience bullets to the top of each role. Replace a generic summary with one that names the target function. Trim skills that distract from the posting.',
        ],
      },
      {
        heading: 'Step 3: Add proof for the top three requirements',
        paragraphs: [
          'For each critical requirement, ensure there is at least one concrete example. If the job emphasizes cross-functional collaboration, include a bullet about partnering with sales, engineering, or operations on a shipped outcome.',
        ],
      },
      {
        heading: 'Step 4: Final match pass',
        paragraphs: [
          'Read the posting once more, then skim your resume as if you were the recruiter. If a major requirement is invisible, adjust before you export. Save the tailored version with the company name in the file name so you do not send the wrong draft.',
        ],
      },
    ],
  },
  {
    slug: 'resume-vs-linkedin',
    title: 'Resume vs LinkedIn: keep them consistent without cloning',
    description:
      'How to align your resume and LinkedIn profile so recruiters see one coherent story across both channels.',
    category: 'Strategy',
    readMinutes: 5,
    updated: 'August 15, 2026',
    sections: [
      {
        heading: 'Same facts, different depth',
        paragraphs: [
          'Job titles, employers, and dates should match. LinkedIn can hold a longer narrative, recommendations, and media. Your resume should stay concise and tailored to one application at a time.',
        ],
      },
      {
        heading: 'Headline and summary alignment',
        paragraphs: [
          'If your resume targets product marketing, your LinkedIn headline should not still say only “Looking for opportunities.” Use related language so a recruiter who checks both places does not feel misled.',
        ],
      },
      {
        heading: 'What to leave off the resume',
        paragraphs: [
          'Full project galleries, course lists, and soft hobby details often work better on LinkedIn. On the resume, reserve space for evidence tied to the role you want next.',
        ],
      },
    ],
  },
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}
