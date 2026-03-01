import { resolve } from 'node:path'
import { parseCSV } from '../parsers/csv.ts'
import { normalizeAll } from '../normalizer.ts'

const filePath = process.argv[2]

if (!filePath) {
  console.error('Usage: tsx src/cli/debug.ts <path-to-csv>')
  process.exit(1)
}

const rawTransactions = parseCSV(resolve(filePath))
const transactions = normalizeAll(rawTransactions, 'default')

console.log('\n=== RAW TRANSACTIONS ===\n')
console.log(JSON.stringify(rawTransactions, null, 2))

console.log('\n=== TRANSACTIONS ===\n')
console.log(JSON.stringify(transactions, null, 2))
