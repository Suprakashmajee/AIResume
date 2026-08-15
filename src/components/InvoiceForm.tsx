import type { ChangeEvent } from 'react'
import { useInvoice } from '../context/InvoiceContext'
import { CURRENCIES, formatMoney, lineAmount } from '../utils/invoice'
import type { PartyInfo } from '../types/invoice'

function PartyFields({
  title,
  party,
  onChange,
}: {
  title: string
  party: PartyInfo
  onChange: (patch: Partial<PartyInfo>) => void
}) {
  return (
    <fieldset className="form-card">
      <legend>{title}</legend>
      <div className="field-grid">
        <label>
          Name / Business
          <input
            value={party.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Acme Studio"
            autoComplete="organization"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={party.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="billing@example.com"
            autoComplete="email"
          />
        </label>
        <label className="full">
          Street address
          <input
            value={party.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="123 Main Street"
            autoComplete="street-address"
          />
        </label>
        <label>
          City
          <input value={party.city} onChange={(e) => onChange({ city: e.target.value })} />
        </label>
        <label>
          State / Region
          <input value={party.state} onChange={(e) => onChange({ state: e.target.value })} />
        </label>
        <label>
          ZIP / Postal
          <input value={party.zip} onChange={(e) => onChange({ zip: e.target.value })} />
        </label>
        <label>
          Country
          <input value={party.country} onChange={(e) => onChange({ country: e.target.value })} />
        </label>
        <label>
          Phone
          <input
            value={party.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            autoComplete="tel"
          />
        </label>
        <label className="full">
          Tax ID / VAT / EIN
          <input value={party.taxId} onChange={(e) => onChange({ taxId: e.target.value })} />
        </label>
      </div>
    </fieldset>
  )
}

export function InvoiceForm() {
  const {
    invoice,
    totals,
    updateInvoice,
    updateFrom,
    updateTo,
    updateItem,
    addItem,
    removeItem,
  } = useInvoice()

  const onLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 1_500_000) {
      window.alert('Please choose a logo under 1.5 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') updateInvoice({ logoDataUrl: reader.result })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="invoice-form">
      <fieldset className="form-card">
        <legend>Invoice details</legend>
        <div className="field-grid">
          <label className="logo-field">
            Logo
            <div className="logo-row">
              {invoice.logoDataUrl ? (
                <img src={invoice.logoDataUrl} alt="" className="logo-thumb" />
              ) : (
                <span className="logo-placeholder">PNG / JPG</span>
              )}
              <input type="file" accept="image/*" onChange={onLogo} />
              {invoice.logoDataUrl ? (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => updateInvoice({ logoDataUrl: '' })}>
                  Remove
                </button>
              ) : null}
            </div>
          </label>
          <label>
            Invoice number
            <input
              value={invoice.invoiceNumber}
              onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
            />
          </label>
          <label>
            PO number
            <input
              value={invoice.poNumber}
              onChange={(e) => updateInvoice({ poNumber: e.target.value })}
              placeholder="Optional"
            />
          </label>
          <label>
            Invoice date
            <input
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) => updateInvoice({ invoiceDate: e.target.value })}
            />
          </label>
          <label>
            Due date
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateInvoice({ dueDate: e.target.value })}
            />
          </label>
          <label>
            Currency
            <select
              value={invoice.currency}
              onChange={(e) => updateInvoice({ currency: e.target.value as typeof invoice.currency })}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Accent color
            <input
              type="color"
              value={invoice.accentColor}
              onChange={(e) => updateInvoice({ accentColor: e.target.value })}
            />
          </label>
        </div>
      </fieldset>

      <PartyFields title="Bill from" party={invoice.from} onChange={updateFrom} />
      <PartyFields title="Bill to" party={invoice.to} onChange={updateTo} />

      <fieldset className="form-card">
        <legend>Line items</legend>
        <div className="line-items">
          {invoice.items.map((item, index) => (
            <div className="line-item" key={item.id}>
              <label className="line-desc">
                {index === 0 ? 'Description' : <span className="sr-only">Description</span>}
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  placeholder="Service or product"
                />
              </label>
              <label>
                {index === 0 ? 'Qty' : <span className="sr-only">Qty</span>}
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                />
              </label>
              <label>
                {index === 0 ? 'Price' : <span className="sr-only">Price</span>}
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                />
              </label>
              <div className="line-amount">
                {index === 0 ? <span className="line-amount-label">Amount</span> : null}
                <strong>{formatMoney(lineAmount(item), invoice.currency)}</strong>
              </div>
              <button
                type="button"
                className="btn-icon"
                aria-label="Remove line item"
                onClick={() => removeItem(item.id)}
                disabled={invoice.items.length <= 1}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-ghost" onClick={addItem}>
          + Add line
        </button>

        <div className="options-row">
          <label className="check">
            <input
              type="checkbox"
              checked={invoice.enableDiscount}
              onChange={(e) => updateInvoice({ enableDiscount: e.target.checked })}
            />
            Discount
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={invoice.enableTax}
              onChange={(e) => updateInvoice({ enableTax: e.target.checked })}
            />
            Tax
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={invoice.enableShipping}
              onChange={(e) => updateInvoice({ enableShipping: e.target.checked })}
            />
            Shipping
          </label>
        </div>

        {invoice.enableDiscount ? (
          <div className="field-grid compact">
            <label>
              Discount type
              <select
                value={invoice.discountType}
                onChange={(e) =>
                  updateInvoice({ discountType: e.target.value as 'percent' | 'fixed' })
                }
              >
                <option value="percent">Percent (%)</option>
                <option value="fixed">Fixed amount</option>
              </select>
            </label>
            <label>
              Discount value
              <input
                type="number"
                min={0}
                step="0.01"
                value={invoice.discountValue}
                onChange={(e) => updateInvoice({ discountValue: Number(e.target.value) })}
              />
            </label>
          </div>
        ) : null}

        {invoice.enableTax ? (
          <div className="field-grid compact">
            <label>
              Tax label
              <input
                value={invoice.taxLabel}
                onChange={(e) => updateInvoice({ taxLabel: e.target.value })}
              />
            </label>
            <label>
              Tax rate (%)
              <input
                type="number"
                min={0}
                step="0.01"
                value={invoice.taxRate}
                onChange={(e) => updateInvoice({ taxRate: Number(e.target.value) })}
              />
            </label>
          </div>
        ) : null}

        {invoice.enableShipping ? (
          <div className="field-grid compact">
            <label>
              Shipping amount
              <input
                type="number"
                min={0}
                step="0.01"
                value={invoice.shippingAmount}
                onChange={(e) => updateInvoice({ shippingAmount: Number(e.target.value) })}
              />
            </label>
          </div>
        ) : null}

        <dl className="form-totals">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatMoney(totals.subtotal, invoice.currency)}</dd>
          </div>
          {invoice.enableDiscount ? (
            <div>
              <dt>Discount</dt>
              <dd>−{formatMoney(totals.discountAmount, invoice.currency)}</dd>
            </div>
          ) : null}
          {invoice.enableShipping ? (
            <div>
              <dt>Shipping</dt>
              <dd>{formatMoney(totals.shippingAmount, invoice.currency)}</dd>
            </div>
          ) : null}
          {invoice.enableTax ? (
            <div>
              <dt>{invoice.taxLabel || 'Tax'}</dt>
              <dd>{formatMoney(totals.taxAmount, invoice.currency)}</dd>
            </div>
          ) : null}
          <div className="grand">
            <dt>Total</dt>
            <dd>{formatMoney(totals.total, invoice.currency)}</dd>
          </div>
        </dl>
      </fieldset>

      <fieldset className="form-card">
        <legend>Payment & notes</legend>
        <label className="stack">
          Payment details
          <textarea
            rows={3}
            value={invoice.paymentDetails}
            onChange={(e) => updateInvoice({ paymentDetails: e.target.value })}
            placeholder="Bank transfer, PayPal, or other payment instructions"
          />
        </label>
        <label className="stack">
          Notes
          <textarea
            rows={3}
            value={invoice.notes}
            onChange={(e) => updateInvoice({ notes: e.target.value })}
            placeholder="Payment terms, thank-you note, or refund policy"
          />
        </label>
      </fieldset>
    </div>
  )
}
