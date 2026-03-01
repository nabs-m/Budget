import { resolve } from 'node:path'
import { parseCSV } from '../parsers/csv.ts'
import { normalizeAll } from '../normalizer.ts'

const filePath = process.argv[2]

if (!filePath) {
  console.error('Usage: tsx src/cli/index.ts <path-to-csv>')
  process.exit(1)
}

const absolutePath = resolve(filePath)
console.log(`\nParsing: ${absolutePath}\n`)

const rawTransactions = parseCSV(absolutePath)
const transactions = normalizeAll(rawTransactions, 'default')

const inflow = transactions.filter((t) => t.direction === 'in').reduce((sum, t) => sum + t.amount, 0)
const outflow = transactions.filter((t) => t.direction === 'out').reduce((sum, t) => sum + t.amount, 0)

console.log(`Found ${transactions.length} transaction(s):\n`)

for (const tx of transactions) {
  const flow = tx.direction === 'in' ? '↑ IN ' : '↓ OUT'
  const amount = `$${tx.amount.toFixed(2)}`.padStart(10)
  const date = tx.date.toISOString().slice(0, 10)
  console.log(`  ${flow} ${amount}  ${date}  ${tx.description}`)
}

console.log(`\n  Total in:  $${inflow.toFixed(2)}`)
console.log(`  Total out: $${outflow.toFixed(2)}`)
console.log(`  Net:       $${(inflow - outflow).toFixed(2)}\n`)
