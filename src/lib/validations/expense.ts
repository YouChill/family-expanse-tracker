// src/lib/validations/expense.ts
import { z } from 'zod'

// Lista dozwolonych kategorii
export const expenseCategories = [
  'food',
  'home',
  'transport',
  'health',
  'clothing',
  'entertainment',
  'education',
  'shopping',
  'travel',
  'other',
] as const

export type ExpenseCategoryType = (typeof expenseCategories)[number]

// Schema dodawania wydatku
export const createExpenseSchema = z.object({
  amount: z
    .number({
      required_error: 'Kwota jest wymagana',
      invalid_type_error: 'Kwota musi być liczbą',
    })
    .positive('Kwota musi być większa od 0')
    .max(999999.99, 'Kwota nie może przekraczać 999 999,99'),
  category: z.enum(expenseCategories, {
    required_error: 'Kategoria jest wymagana',
    invalid_type_error: 'Nieprawidłowa kategoria',
  }),
  description: z
    .string()
    .max(500, 'Opis może mieć maksymalnie 500 znaków')
    .optional()
    .nullable(),
  expense_date: z
    .string()
    .min(1, 'Data jest wymagana')
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Nieprawidłowy format daty',
    })
    .refine(
      (date) => {
        const expenseDate = new Date(date)
        const today = new Date()
        today.setHours(23, 59, 59, 999)
        return expenseDate <= today
      },
      {
        message: 'Data nie może być z przyszłości',
      }
    ),
})

// Schema edycji wydatku
export const updateExpenseSchema = createExpenseSchema.partial()

// Schema filtrowania wydatków
export const filterExpenseSchema = z.object({
  category: z.enum(expenseCategories).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minAmount: z.number().positive().optional(),
  maxAmount: z.number().positive().optional(),
  userId: z.string().uuid().optional(),
})

// Schema sortowania
export const sortExpenseSchema = z.object({
  field: z.enum(['expense_date', 'amount', 'category', 'created_at']),
  direction: z.enum(['asc', 'desc']),
})

// Schema paginacji
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
})

// Typy TypeScript
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>
export type FilterExpenseInput = z.infer<typeof filterExpenseSchema>
export type SortExpenseInput = z.infer<typeof sortExpenseSchema>
export type PaginationInput = z.infer<typeof paginationSchema>
