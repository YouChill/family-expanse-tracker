// src/lib/constants.ts
import type { ExpenseCategory } from '@/types/database'

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, { label: string; icon: string; color: string }> = {
  food: {
    label: 'Jedzenie i napoje',
    icon: '🍔',
    color: '#ef4444'
  },
  home: {
    label: 'Dom i rachunki',
    icon: '🏠',
    color: '#3b82f6'
  },
  transport: {
    label: 'Transport',
    icon: '🚗',
    color: '#8b5cf6'
  },
  health: {
    label: 'Zdrowie',
    icon: '🏥',
    color: '#ec4899'
  },
  clothing: {
    label: 'Odzież',
    icon: '👕',
    color: '#14b8a6'
  },
  entertainment: {
    label: 'Rozrywka',
    icon: '🎮',
    color: '#f59e0b'
  },
  education: {
    label: 'Edukacja',
    icon: '📚',
    color: '#06b6d4'
  },
  shopping: {
    label: 'Zakupy',
    icon: '🛒',
    color: '#84cc16'
  },
  travel: {
    label: 'Podróże',
    icon: '✈️',
    color: '#6366f1'
  },
  other: {
    label: 'Inne',
    icon: '💰',
    color: '#64748b'
  }
}

export function getCategoryLabel(category: ExpenseCategory): string {
  return EXPENSE_CATEGORIES[category]?.label || category
}

export function getCategoryIcon(category: ExpenseCategory): string {
  return EXPENSE_CATEGORIES[category]?.icon || '💰'
}

export function getCategoryColor(category: ExpenseCategory): string {
  return EXPENSE_CATEGORIES[category]?.color || '#64748b'
}
