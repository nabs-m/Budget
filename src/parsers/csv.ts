import { parse } from 'csv-parse/sync'
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { RawTransaction } from '../models/index.ts'

// Expected CSV columns — adjust to match your bank's export format.
// The parser is forgiving: it lowercases headers and trims whitespace.
const COLUMN_DATE = 'date'
const COLUMN_DESCRIPTION = 'description'
const COLUMN_AMOUNT = 'amount'

export function parseCSV(filePath: string): RawTransaction[] {
  const content = readFileSync(filePath, 'utf-8')
  const rows: Record<string, string>[] = parse(content, {
    columns: (headers: string[]) => headers.map((h) => h.trim().toLowerCase()),
    skip_empty_lines: true,
    trim: true,
  })

  return rows.map((row) => {
    const { [COLUMN_DATE]: rawDate, [COLUMN_DESCRIPTION]: rawDescription, [COLUMN_AMOUNT]: rawAmount, ...rest } = row

    if (!rawDate || !rawDescription || !rawAmount) {
      throw new Error(
        `CSV is missing required columns. Expected: "${COLUMN_DATE}", "${COLUMN_DESCRIPTION}", "${COLUMN_AMOUNT}".\n` +
        `Got: ${Object.keys(row).join(', ')}`
      )
    }

    return {
      id: randomUUID(),
      source: 'csv',
      sourceFile: basename(filePath),
      rawDate,
      rawDescription,
      rawAmount,
      rawExtra: rest,
    }
  })
}
