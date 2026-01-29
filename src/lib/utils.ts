// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'

/**
 * Merge class names with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format number as currency (PLN by default)
 */
export function formatCurrency(
  amount: number,
  currency = 'PLN',
  locale = 'pl-PL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format date in Polish locale
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  return new Intl.DateTimeFormat('pl-PL', options || defaultOptions).format(
    new Date(date)
  )
}

/**
 * Format date as short string (e.g., "29 sty 2026")
 */
export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * Format relative date (e.g., "Dzisiaj", "Wczoraj", "3 dni temu")
 */
export function formatRelativeDate(date: string | Date): string {
  const now = new Date()
  const d = new Date(date)
  const diffTime = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'Dzisiaj'
  }

  if (diffDays === 1) {
    return 'Wczoraj'
  }

  if (diffDays < 7) {
    return `${diffDays} dni temu`
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return weeks === 1 ? 'Tydzień temu' : `${weeks} tygodnie temu`
  }

  return formatDateShort(date)
}

/**
 * Format number with thousands separator
 */
export function formatNumber(num: number, locale = 'pl-PL'): string {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Format percentage
 */
export function formatPercent(
  value: number,
  decimals = 1,
  locale = 'pl-PL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100)
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Capitalize first letter of string
 */
export function capitalize(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Delay execution (for testing/UX)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key])
      if (!result[groupKey]) {
        result[groupKey] = []
      }
      result[groupKey].push(item)
      return result
    },
    {} as Record<string, T[]>
  )
}

/**
 * Sum array of numbers or objects
 */
export function sum(array: number[]): number
export function sum<T>(array: T[], key: keyof T): number
export function sum<T>(array: T[] | number[], key?: keyof T): number {
  if (typeof array[0] === 'number') {
    return (array as number[]).reduce((acc, val) => acc + val, 0)
  }
  if (key) {
    return (array as T[]).reduce((acc, item) => acc + Number(item[key]), 0)
  }
  return 0
}

/**
 * Get start and end of current month
 */
export function getCurrentMonthRange(): { start: Date; end: Date } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  return { start, end }
}

/**
 * Get start and end of last N days
 */
export function getLastNDaysRange(days: number): { start: Date; end: Date } {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - days)
  return { start, end }
}

/**
 * Format date to YYYY-MM-DD string (for inputs)
 */
export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}
