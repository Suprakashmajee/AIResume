import type { ResumeData, ResumeExample, TemplateId } from '../types/resume'

export const accentColors = [
  '#0D7377',
  '#E4572E',
  '#1B4D6E',
  '#2F6B4F',
  '#8B4513',
  '#4A3F6B',
]

export const templates: {
  id: TemplateId
  name: string
  description: string
  badge: string
}[] = [
  {
    id: 'modern',
    name: 'Modern Draft',
    description: 'Clean hierarchy with bold name treatment and crisp section rules.',
    badge: 'Most popular',
  },
  {
    id: 'classic',
    name: 'Classic Pro',
    description: 'Traditional single-column layout that ATS parsers love.',
    badge: 'ATS-friendly',
  },
  {
    id: 'sidebar',
    name: 'Sidebar Focus',
    description: 'Accent column for contact and skills; body for experience.',
    badge: 'Visual',
  },
  {
    id: 'minimal',
    name: 'Minimal Line',
    description: 'Quiet typography and generous whitespace for senior roles.',
    badge: 'Elegant',
  },
  {
    id: 'executive',
    name: 'Executive Band',
    description: 'Strong header band and structured achievement bullets.',
    badge: 'Leadership',
  },
]

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export const emptyResume = (): ResumeData => ({
  fullName: '',
  headline: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  summary: '',
  experience: [
    {
      id: createId(),
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    },
  ],
  education: [
    {
      id: createId(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      details: '',
    },
  ],
  skills: [],
  template: 'modern',
  accentColor: '#0D7377',
})

export const demoResume: ResumeData = {
  fullName: 'Jordan Avery',
  headline: 'Product Designer · Systems & Growth',
  email: 'jordan.avery@email.com',
  phone: '(415) 555-0142',
  location: 'San Francisco, CA',
  website: 'jordanavery.design',
  summary:
    'Product designer with 7+ years shaping SaaS experiences from discovery to launch. Known for turning ambiguous problems into clear flows, measurable UX outcomes, and design systems teams actually use.',
  experience: [
    {
      id: 'exp-1',
      company: 'Northline Analytics',
      title: 'Senior Product Designer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      bullets: [
        'Led redesign of onboarding that lifted activation by 28% in two quarters.',
        'Built a shared component library adopted by 4 product squads.',
        'Partnered with research to ship accessibility improvements across 12 core screens.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Cascade Health',
      title: 'Product Designer',
      location: 'Remote',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      bullets: [
        'Designed clinician dashboards used by 3,000+ daily active users.',
        'Reduced task completion time for chart review by 35% through information architecture changes.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Rhode Island School of Design',
      degree: 'BFA',
      field: 'Graphic Design',
      startDate: '2014',
      endDate: '2018',
      details: 'Capstone focused on healthcare interface design.',
    },
  ],
  skills: [
    'Figma',
    'Design Systems',
    'User Research',
    'Prototyping',
    'A/B Testing',
    'Accessibility (WCAG)',
    'FigJam',
    'HTML/CSS',
  ],
  template: 'modern',
  accentColor: '#0D7377',
}

export const examples: ResumeExample[] = [
  {
    id: 'software',
    title: 'Software Developer',
    category: 'Technology',
    description: 'Impact-first bullets, stack clarity, and measurable delivery outcomes.',
    highlights: ['ATS keywords', 'Impact metrics', 'Clean skills list'],
    data: {
      ...demoResume,
      fullName: 'Alex Chen',
      headline: 'Full-Stack Software Developer',
      email: 'alex.chen@email.com',
      phone: '(206) 555-0198',
      location: 'Seattle, WA',
      website: 'github.com/alexchen',
      summary:
        'Full-stack developer with 5 years building reliable web products. Comfortable across React, Node.js, and cloud services, with a bias toward clear APIs and maintainable UI.',
      experience: [
        {
          id: 's1',
          company: 'Harbor Apps',
          title: 'Software Developer',
          location: 'Seattle, WA',
          startDate: '2021-01',
          endDate: '',
          current: true,
          bullets: [
            'Shipped customer portal features serving 40k monthly users with 99.9% uptime.',
            'Cut API latency 42% by introducing caching and query optimization.',
            'Mentored 2 junior engineers through code review and pair programming.',
          ],
        },
        {
          id: 's2',
          company: 'Brightpath Labs',
          title: 'Junior Developer',
          location: 'Seattle, WA',
          startDate: '2019-06',
          endDate: '2020-12',
          current: false,
          bullets: [
            'Built React components for an internal analytics dashboard.',
            'Automated regression checks that reduced release bugs by 20%.',
          ],
        },
      ],
      education: [
        {
          id: 'se1',
          school: 'University of Washington',
          degree: 'BS',
          field: 'Computer Science',
          startDate: '2015',
          endDate: '2019',
          details: 'Dean’s List · Capstone: real-time collaboration tools',
        },
      ],
      skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'REST APIs'],
      template: 'classic',
      accentColor: '#1B4D6E',
    },
  },
  {
    id: 'nursing',
    title: 'Registered Nurse',
    category: 'Healthcare',
    description: 'Licenses up front, clinical competencies, and patient-outcome language.',
    highlights: ['Licenses', 'Clinical skills', 'Shift readiness'],
    data: {
      ...demoResume,
      fullName: 'Maya Patel, RN',
      headline: 'Registered Nurse · Med-Surg',
      email: 'maya.patel@email.com',
      phone: '(312) 555-0166',
      location: 'Chicago, IL',
      website: '',
      summary:
        'Compassionate med-surg RN with 4 years of acute care experience. Skilled in patient education, care coordination, and high-acuity prioritization in fast-paced units.',
      experience: [
        {
          id: 'n1',
          company: 'Lakeside Medical Center',
          title: 'Registered Nurse',
          location: 'Chicago, IL',
          startDate: '2022-04',
          endDate: '',
          current: true,
          bullets: [
            'Provide bedside care for 5–6 patients per shift on a 32-bed med-surg unit.',
            'Reduced medication near-misses by reinforcing double-check protocols with charge nurses.',
            'Educate patients and families on discharge plans, improving teach-back scores.',
          ],
        },
      ],
      education: [
        {
          id: 'ne1',
          school: 'University of Illinois Chicago',
          degree: 'BSN',
          field: 'Nursing',
          startDate: '2018',
          endDate: '2022',
          details: 'RN License · BLS & ACLS certified',
        },
      ],
      skills: ['Patient Assessment', 'IV Therapy', 'EMR (Epic)', 'Care Planning', 'Wound Care', 'Patient Education'],
      template: 'sidebar',
      accentColor: '#2F6B4F',
    },
  },
  {
    id: 'marketing',
    title: 'Marketing Manager',
    category: 'Marketing',
    description: 'Campaign ownership, funnel metrics, and cross-channel storytelling.',
    highlights: ['ROI focus', 'Channel mix', 'Leadership tone'],
    data: {
      ...demoResume,
      fullName: 'Sam Rivera',
      headline: 'Marketing Manager · Demand Generation',
      email: 'sam.rivera@email.com',
      phone: '(646) 555-0133',
      location: 'New York, NY',
      website: 'samrivera.co',
      summary:
        'Demand-gen marketer who connects creative, product, and sales. Builds campaigns that convert—and dashboards that prove it.',
      experience: [
        {
          id: 'm1',
          company: 'Volt Commerce',
          title: 'Marketing Manager',
          location: 'New York, NY',
          startDate: '2020-08',
          endDate: '',
          current: true,
          bullets: [
            'Grew qualified pipeline 47% YoY through lifecycle email and paid social.',
            'Launched a content engine producing 24 assets/quarter with consistent brand voice.',
            'Aligned weekly with sales to refine ICP messaging and MQL definitions.',
          ],
        },
      ],
      education: [
        {
          id: 'me1',
          school: 'NYU Stern',
          degree: 'BS',
          field: 'Marketing',
          startDate: '2014',
          endDate: '2018',
          details: '',
        },
      ],
      skills: ['Demand Gen', 'HubSpot', 'Google Ads', 'Lifecycle Email', 'Analytics', 'Copywriting', 'A/B Testing'],
      template: 'executive',
      accentColor: '#E4572E',
    },
  },
  {
    id: 'teacher',
    title: 'Teacher',
    category: 'Education',
    description: 'Classroom impact, curriculum design, and community partnership language.',
    highlights: ['Student outcomes', 'Curriculum', 'Certifications'],
    data: {
      ...demoResume,
      fullName: 'Taylor Brooks',
      headline: 'Middle School English Teacher',
      email: 'taylor.brooks@email.com',
      phone: '(503) 555-0171',
      location: 'Portland, OR',
      website: '',
      summary:
        'English teacher focused on literacy growth, inclusive classrooms, and clear parent communication. Experienced with project-based learning and differentiated instruction.',
      experience: [
        {
          id: 't1',
          company: 'Cedar Ridge Middle School',
          title: 'English Language Arts Teacher',
          location: 'Portland, OR',
          startDate: '2019-08',
          endDate: '',
          current: true,
          bullets: [
            'Improved average reading scores by 1.2 grade levels across a 120-student caseload.',
            'Designed interdisciplinary units connecting literature, civic writing, and media literacy.',
            'Advised the student newspaper and mentored new teachers during onboarding.',
          ],
        },
      ],
      education: [
        {
          id: 'te1',
          school: 'Portland State University',
          degree: 'M.Ed.',
          field: 'Secondary Education',
          startDate: '2017',
          endDate: '2019',
          details: 'State teaching license · Endorsement: English',
        },
      ],
      skills: ['Lesson Planning', 'Differentiated Instruction', 'Classroom Management', 'Google Classroom', 'Assessment Design'],
      template: 'minimal',
      accentColor: '#8B4513',
    },
  },
  {
    id: 'project',
    title: 'Project Manager',
    category: 'Operations',
    description: 'Scope control, stakeholder clarity, and delivery metrics that land offers.',
    highlights: ['Delivery KPIs', 'Stakeholders', 'Tools'],
    data: {
      ...demoResume,
      fullName: 'Riley Nguyen',
      headline: 'Project Manager · Digital Delivery',
      email: 'riley.nguyen@email.com',
      phone: '(512) 555-0188',
      location: 'Austin, TX',
      website: '',
      summary:
        'Project manager who keeps complex launches on track. Strong facilitator across engineering, design, and business partners with a calm approach to risk and change.',
      experience: [
        {
          id: 'p1',
          company: 'Summit Digital',
          title: 'Project Manager',
          location: 'Austin, TX',
          startDate: '2020-02',
          endDate: '',
          current: true,
          bullets: [
            'Delivered 18 client projects on time with an average NPS of 72.',
            'Introduced weekly risk reviews that cut scope creep incidents by 30%.',
            'Managed budgets up to $1.2M and coordinated vendors across three time zones.',
          ],
        },
      ],
      education: [
        {
          id: 'pe1',
          school: 'University of Texas at Austin',
          degree: 'BA',
          field: 'Business Administration',
          startDate: '2012',
          endDate: '2016',
          details: 'PMP certified',
        },
      ],
      skills: ['Agile/Scrum', 'Jira', 'Stakeholder Management', 'Budgeting', 'Risk Planning', 'Confluence'],
      template: 'modern',
      accentColor: '#4A3F6B',
    },
  },
  {
    id: 'sales',
    title: 'Sales Associate',
    category: 'Sales',
    description: 'Quota language, customer rapport, and retail or B2B conversion wins.',
    highlights: ['Quota results', 'CRM habits', 'Service tone'],
    data: {
      ...demoResume,
      fullName: 'Chris Morgan',
      headline: 'Sales Associate · Retail & Client Care',
      email: 'chris.morgan@email.com',
      phone: '(617) 555-0120',
      location: 'Boston, MA',
      website: '',
      summary:
        'Customer-first sales associate with a track record of exceeding monthly targets while keeping service scores high. Quick learner with strong product knowledge habits.',
      experience: [
        {
          id: 'sa1',
          company: 'Harbor Home Goods',
          title: 'Sales Associate',
          location: 'Boston, MA',
          startDate: '2023-03',
          endDate: '',
          current: true,
          bullets: [
            'Exceeded monthly sales targets by an average of 18% for three consecutive quarters.',
            'Maintained a 4.9/5 customer satisfaction score through attentive floor support.',
            'Trained new hires on POS workflows and product storytelling.',
          ],
        },
      ],
      education: [
        {
          id: 'sae1',
          school: 'Bunker Hill Community College',
          degree: 'AA',
          field: 'Business',
          startDate: '2021',
          endDate: '2023',
          details: '',
        },
      ],
      skills: ['POS Systems', 'Upselling', 'Customer Service', 'Inventory', 'CRM Basics', 'Merchandising'],
      template: 'classic',
      accentColor: '#0D7377',
    },
  },
]

export const aiSuggestions: Record<string, string[]> = {
  summary: [
    'Results-driven professional with a proven record of improving team outcomes through clear communication and measurable goals.',
    'Collaborative problem-solver who turns complex requirements into practical plans stakeholders can trust.',
    'Detail-oriented contributor focused on quality, continuous learning, and shipping work that moves the business forward.',
  ],
  experience: [
    'Owned end-to-end delivery for a high-visibility initiative, coordinating cross-functional partners and shipping on schedule.',
    'Improved a key workflow by identifying friction points, prototyping solutions, and measuring adoption after launch.',
    'Mentored teammates through structured feedback, raising team quality while protecting delivery timelines.',
    'Partnered with stakeholders to clarify requirements, reduce rework, and keep priorities aligned week to week.',
    'Documented processes and playbooks that shortened onboarding time for new team members.',
  ],
  skills: [
    'Communication',
    'Problem Solving',
    'Stakeholder Management',
    'Data Analysis',
    'Project Coordination',
    'Presentation Design',
    'Process Improvement',
    'Cross-functional Collaboration',
  ],
}

export const faqs = [
  {
    q: 'How do I use AiResumeDraft?',
    a: 'Pick a template, fill in your contact details, experience, education, and skills, then refine with AI suggestions. Preview updates live, and you can download a TXT file or print a polished PDF anytime.',
  },
  {
    q: 'Is AiResumeDraft free?',
    a: 'Yes. You can build, edit, preview, and export your resume draft at no cost. Everything runs in your browser—your draft stays on your device unless you choose to copy it elsewhere.',
  },
  {
    q: 'What makes this an AI resume builder?',
    a: 'AiResumeDraft helps you move from a blank page to a strong first draft with role-aware phrasing suggestions for summaries, experience bullets, and skills. You stay in control of every word.',
  },
  {
    q: 'Are the templates ATS-friendly?',
    a: 'Yes. Each template uses clear section headings, readable hierarchy, and standard resume structure so applicant tracking systems can parse your content while still looking sharp to humans.',
  },
  {
    q: 'Can I build my resume on mobile?',
    a: 'Absolutely. The builder is fully responsive. Edit on your phone during a commute, then fine-tune on desktop before you apply.',
  },
  {
    q: 'Should I download PDF or TXT?',
    a: 'Use PDF when you want consistent visual formatting for human reviewers. Keep a TXT export handy for portals that prefer plain text or paste-friendly content.',
  },
  {
    q: 'Can I import an existing resume?',
    a: 'You can start from a blank draft, load a sample, or paste content section by section. Import keeps momentum when you already have a rough draft to improve.',
  },
  {
    q: 'Is my information secure?',
    a: 'Your resume data is stored locally in your browser for this session. We do not sell personal data. Clear your browser storage if you are on a shared device.',
  },
  {
    q: 'How do I contact support?',
    a: 'Visit the Contact page on this website to see our support email: support@airesumedraft.com. You can copy the address from there without opening Outlook or another mail app.',
  },
  {
    q: 'How do I log in or log out?',
    a: 'Click Log in in the header. You can sign in with your name and email right away, or use Continue with Google when Google sign-in is configured. When you are signed in, your name appears in the header with a Log out button.',
  },
]
