import type {
  CurrencyCode,
  InvoiceData,
  InvoiceTotals,
  LineItem,
  PartyInfo,
} from '../types/invoice'

export const CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: 'USD', label: 'U.S. Dollar (USD)', symbol: '$' },
  { code: 'EUR', label: 'Euro (EUR)', symbol: '€' },
  { code: 'GBP', label: 'British Pound (GBP)', symbol: '£' },
  { code: 'INR', label: 'Indian Rupee (INR)', symbol: '₹' },
  { code: 'CAD', label: 'Canadian Dollar (CAD)', symbol: 'CA$' },
  { code: 'AUD', label: 'Australian Dollar (AUD)', symbol: 'A$' },
  { code: 'JPY', label: 'Japanese Yen (JPY)', symbol: '¥' },
  { code: 'SGD', label: 'Singapore Dollar (SGD)', symbol: 'S$' },
]

export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function emptyParty(): PartyInfo {
  return {
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    taxId: '',
  }
}

export function createLineItem(partial?: Partial<LineItem>): LineItem {
  return {
    id: createId(),
    description: '',
    quantity: 1,
    price: 0,
    ...partial,
  }
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function defaultDueDate(days = 14): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function createDefaultInvoice(): InvoiceData {
  return {
    logoDataUrl: '',
    invoiceNumber: `INV-${new Date().getFullYear()}-001`,
    poNumber: '',
    invoiceDate: todayISO(),
    dueDate: defaultDueDate(),
    currency: 'USD',
    from: emptyParty(),
    to: emptyParty(),
    items: [createLineItem()],
    enableDiscount: false,
    discountType: 'percent',
    discountValue: 0,
    enableTax: false,
    taxLabel: 'Tax',
    taxRate: 0,
    enableShipping: false,
    shippingAmount: 0,
    paymentDetails: '',
    notes: '',
    templateId: 'classic',
    accentColor: '#0f766e',
  }
}

export function createSampleInvoice(): InvoiceData {
  return {
    ...createDefaultInvoice(),
    invoiceNumber: 'INV-2026-1042',
    poNumber: 'PO-7781',
    from: {
      name: 'Harbor Studio Co.',
      email: 'billing@harborstudio.example',
      address: '420 Market Street, Suite 12',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States',
      phone: '+1 (415) 555-0142',
      taxId: 'EIN 12-3456789',
    },
    to: {
      name: 'Northwind Retail',
      email: 'accounts@northwind.example',
      address: '88 Commerce Avenue',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'United States',
      phone: '+1 (512) 555-0198',
      taxId: '',
    },
    items: [
      createLineItem({
        description: 'Brand identity package — logo system & guidelines',
        quantity: 1,
        price: 1800,
      }),
      createLineItem({
        description: 'Website landing page design (desktop + mobile)',
        quantity: 1,
        price: 2400,
      }),
      createLineItem({
        description: 'Revision round (up to 2 rounds)',
        quantity: 2,
        price: 150,
      }),
    ],
    enableTax: true,
    taxLabel: 'Sales Tax',
    taxRate: 8.25,
    enableDiscount: true,
    discountType: 'percent',
    discountValue: 5,
    paymentDetails:
      'Bank transfer: Harbor Studio Co. / First National Bank / Account •••• 4821 / Routing 021000021',
    notes: 'Payment due within 14 days. Late payments may incur a 1.5% monthly fee. Thank you for your business.',
    templateId: 'modern',
    accentColor: '#0f766e',
  }
}

export function lineAmount(item: LineItem): number {
  const qty = Number.isFinite(item.quantity) ? item.quantity : 0
  const price = Number.isFinite(item.price) ? item.price : 0
  return Math.round(qty * price * 100) / 100
}

export function calcTotals(invoice: InvoiceData): InvoiceTotals {
  const subtotal = invoice.items.reduce((sum, item) => sum + lineAmount(item), 0)

  let discountAmount = 0
  if (invoice.enableDiscount && invoice.discountValue > 0) {
    discountAmount =
      invoice.discountType === 'percent'
        ? (subtotal * invoice.discountValue) / 100
        : invoice.discountValue
    discountAmount = Math.min(discountAmount, subtotal)
  }

  const afterDiscount = Math.max(subtotal - discountAmount, 0)
  const shippingAmount = invoice.enableShipping ? Math.max(invoice.shippingAmount, 0) : 0
  const taxable = afterDiscount + shippingAmount
  const taxAmount =
    invoice.enableTax && invoice.taxRate > 0 ? (taxable * invoice.taxRate) / 100 : 0
  const total = afterDiscount + shippingAmount + taxAmount

  return {
    subtotal: roundMoney(subtotal),
    discountAmount: roundMoney(discountAmount),
    taxAmount: roundMoney(taxAmount),
    shippingAmount: roundMoney(shippingAmount),
    total: roundMoney(total),
  }
}

function roundMoney(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function currencySymbol(code: CurrencyCode): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? code
}

export function formatMoney(amount: number, code: CurrencyCode): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: code === 'JPY' ? 0 : 2,
      maximumFractionDigits: code === 'JPY' ? 0 : 2,
    }).format(amount)
  } catch {
    return `${currencySymbol(code)}${amount.toFixed(2)}`
  }
}

export function formatDisplayDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const STORAGE_KEY = 'bill-store-invoice-v1'

export function loadSavedInvoice(): InvoiceData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as InvoiceData
    if (!parsed || !parsed.items || !Array.isArray(parsed.items)) return null
    return { ...createDefaultInvoice(), ...parsed }
  } catch {
    return null
  }
}

export function saveInvoice(invoice: InvoiceData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice))
  } catch {
    // ignore quota / private mode
  }
}

export function clearSavedInvoice(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
