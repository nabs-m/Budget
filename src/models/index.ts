export type Direction = 'in' | 'out'
export type ClassifiedBy = 'ai' | 'user' | 'rule'
export type AccountType = 'checking' | 'savings' | 'credit' | 'investment'
export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly'
export type SourceType = 'csv' | 'pdf'

export interface RawTransaction {
  id: string
  source: SourceType
  sourceFile: string
  rawDate: string
  rawDescription: string
  rawAmount: string
  rawExtra: Record<string, string>
}

export interface Transaction {
  id: string
  rawTransactionId: string
  date: Date
  description: string
  amount: number
  direction: Direction
  categoryId: string | null
  accountId: string
  classifiedBy: ClassifiedBy | null
}

export interface Account {
  id: string
  name: string
  type: AccountType
}

export interface Category {
  id: string
  name: string
  color: string | null
  budgetLimit: number | null
  budgetPeriod: BudgetPeriod | null
}

export interface CategoryRule {
  id: string
  pattern: string
  categoryId: string
  source: 'ai' | 'user'
  confidence: number
  matchCount: number
  updatedAt: Date
}
