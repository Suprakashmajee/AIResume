import type { InvoiceTemplateId } from '../types/invoice'

export const siteName = 'Bill Store'
export const siteDomain = 'bill-store.com'
export const siteUrl = 'https://bill-store.com'

export const templates: {
  id: InvoiceTemplateId
  name: string
  blurb: string
  accent: string
}[] = [
  {
    id: 'classic',
    name: 'Classic',
    blurb: 'Clean header, clear totals, timeless for any industry.',
    accent: '#0f766e',
  },
  {
    id: 'modern',
    name: 'Modern',
    blurb: 'Bold accent bar and airy spacing for creative studios.',
    accent: '#0369a1',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    blurb: 'Quiet typography and soft dividers—ideal for consultants.',
    accent: '#334155',
  },
  {
    id: 'bold',
    name: 'Bold Ledger',
    blurb: 'Strong contrast and large totals so payment details stand out.',
    accent: '#b45309',
  },
  {
    id: 'ledger',
    name: 'Coastal',
    blurb: 'Seafoam accents with a polished two-column party layout.',
    accent: '#0e7490',
  },
]

export const howSteps = [
  {
    step: '01',
    title: 'Pick a template & fill details',
    text: 'Choose a professional layout, add your logo, and enter business and client information. Bill Store remembers your last inputs so repeat billing is faster.',
  },
  {
    step: '02',
    title: 'Add items — we calculate',
    text: 'List products or services with quantity and price. Subtotals, discounts, tax, and shipping update automatically so totals stay accurate.',
  },
  {
    step: '03',
    title: 'Preview, download & share',
    text: 'Review the live preview, switch templates if needed, then print or save as PDF and send the bill to your client.',
  },
]

export const features = [
  {
    title: 'Professional bill templates',
    text: 'Start from polished layouts built for freelancers, agencies, shops, and service businesses. Switch designs without retyping your data.',
  },
  {
    title: 'Automatic calculations',
    text: 'Line totals, discounts, tax rates, and shipping roll up into a clear grand total—no spreadsheet gymnastics required.',
  },
  {
    title: 'Remembers your last bill',
    text: 'Your browser stores recent business details, clients, and notes locally so the next invoice starts closer to done.',
  },
  {
    title: 'Multi-currency ready',
    text: 'Bill in USD, EUR, GBP, INR, and more. Amounts format correctly for the currency you select.',
  },
  {
    title: 'Logo & brand accents',
    text: 'Upload your logo and tune accent colors so every invoice feels on-brand without a design tool.',
  },
  {
    title: 'Print & PDF export',
    text: 'Download a clean PDF via print, ready to email, attach in DMs, or archive for your records.',
  },
]

export const audiences = [
  {
    title: 'Freelancers & solopreneurs',
    text: 'Turn hours into clear bills in minutes. Spend less time formatting and more time on client work.',
  },
  {
    title: 'Small businesses & startups',
    text: 'Stay organized with consistent numbering, tax fields, and payment instructions that look professional.',
  },
  {
    title: 'Consultants & agencies',
    text: 'Deliver branded invoices that match your standards—logo, accent color, and tidy line-item detail.',
  },
  {
    title: 'Online sellers & service providers',
    text: 'Document sales and services with multi-currency support and notes for shipping or terms.',
  },
]

export const faqItems = [
  {
    q: 'What is a bill (invoice)?',
    a: 'A bill or invoice is a formal request for payment. It lists who is billing, who is being billed, what was provided, the amount due, and when payment is expected. Clear invoices help you get paid faster and keep clean financial records.',
  },
  {
    q: 'What is the difference between an invoice and a receipt?',
    a: 'An invoice asks for payment before (or when) money is due. A receipt confirms that payment was already received. Use Bill Store to create the invoice you send; issue a receipt separately after the client pays.',
  },
  {
    q: 'Is Bill Store free to use?',
    a: 'Yes. You can create, preview, and export professional bills in your browser at no charge. The site may show ads to keep the tool free.',
  },
  {
    q: 'Do I need an account?',
    a: 'No account is required. Your draft can be saved in your own browser’s local storage so you can return later on the same device.',
  },
  {
    q: 'What types of invoices can I create?',
    a: 'You can create standard commercial invoices, service invoices, and simple proforma-style bills. Include contact details, invoice number, line items, tax, discounts, shipping, payment details, and notes.',
  },
  {
    q: 'Are my invoices private?',
    a: 'Invoice data is processed in your browser. When you use local save, it stays on your device. We do not require you to upload invoices to our servers to generate or download them. See our Privacy Policy for details about ads and analytics cookies.',
  },
  {
    q: 'Can I customize the design?',
    a: 'Yes. Choose from multiple templates, upload a logo, and adjust accent colors. Switch templates anytime—your content stays intact.',
  },
  {
    q: 'How do I download a PDF?',
    a: 'Open your bill in the generator, switch to Preview if you like, then use Download PDF. Your browser’s print dialog will open—choose “Save as PDF” as the destination.',
  },
]

export const adSenseClient = 'ca-pub-9146006984034713'
