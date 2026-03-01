# Budget

A TypeScript toolkit for parsing, normalizing, and summarizing personal finance transactions from CSV exports.

## Features

- Parse CSV bank/account exports into structured transactions
- Normalize raw data into a consistent `Transaction` format
- CLI for quick summaries: inflow, outflow, and net totals
- Data models for accounts, categories, and category rules (with AI/rule-based classification support)

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
```

## Usage

### CLI

Run the CLI against any supported CSV file:

```bash
npm run cli <path-to-csv>
```

**Example:**

```bash
npm run cli samples/sample.csv
```

**Output:**

```
Parsing: /path/to/sample.csv

Found 5 transaction(s):

  ↑ IN      $500.00  2026-02-01  Payroll
  ↓ OUT      $42.00  2026-02-02  Grocery Store
  ...

  Total in:  $500.00
  Total out: $142.00
  Net:       $358.00
```

### As a Library

```ts
import { parseCSV, normalizeAll } from './src/index.ts'

const raw = parseCSV('./samples/sample.csv')
const transactions = normalizeAll(raw, 'default')
```

## Project Structure

```
src/
  cli/        # CLI entry point
  models/     # TypeScript types and interfaces
  parsers/    # CSV parser
  normalizer  # Raw → Transaction normalization
samples/      # Example CSV files
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run cli <file>` | Parse and summarize a CSV file |
| `npm run build` | Compile TypeScript and bundle with Vite |
