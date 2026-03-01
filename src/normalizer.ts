import { randomUUID } from 'node:crypto'
import type { RawTransaction, Transaction } from './models/index.ts'

export function normalize(raw: RawTransaction, accountId: string): Transaction {
  const amount = parseAmount(raw.rawAmount)
  const direction = amount >= 0 ? 'in' : 'out'

  return {
    id: randomUUID(),
    rawTransactionId: raw.id,
    date: parseDate(raw.rawDate),
    description: cleanDescription(raw.rawDescription),
    amount: Math.abs(amount),
    direction,
    categoryId: null,
    accountId,
    classifiedBy: null,
  }
}

export function normalizeAll(raws: RawTransaction[], accountId: string): Transaction[] {
  return raws.map((raw) => normalize(raw, accountId))
}

function parseAmount(raw: string): number {
  // Strip currency symbols, spaces, and commas — keep minus sign and decimal
  const cleaned = raw.replace(/[^0-9.,-]/g, '').replace(',', '')
  const value = parseFloat(cleaned)
  if (isNaN(value)) throw new Error(`Could not parse amount: "${raw}"`)
  return value
}

function parseDate(raw: string): Date {
  const date = new Date(raw)
  if (isNaN(date.getTime())) throw new Error(`Could not parse date: "${raw}"`)
  return date
}

function cleanDescription(raw: string): string {
  return raw
    .replace(/#\d+/g, '')        // strip store numbers e.g. "STARBUCKS #4872"
    .replace(/\*/g, ' ')         // replace * separators e.g. "UBER *TRIP"
    .replace(/\s+/g, ' ')        // collapse whitespace
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()) // Title Case
}
