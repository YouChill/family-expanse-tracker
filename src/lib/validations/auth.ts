// src/lib/validations/auth.ts
import { z } from 'zod'

// Schema logowania
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email jest wymagany')
    .email('Nieprawidłowy format email'),
  password: z
    .string()
    .min(1, 'Hasło jest wymagane')
    .min(6, 'Hasło musi mieć minimum 6 znaków'),
})

// Schema rejestracji
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Imię jest wymagane')
      .min(2, 'Imię musi mieć minimum 2 znaki')
      .max(50, 'Imię może mieć maksymalnie 50 znaków'),
    email: z
      .string()
      .min(1, 'Email jest wymagany')
      .email('Nieprawidłowy format email'),
    password: z
      .string()
      .min(1, 'Hasło jest wymagane')
      .min(6, 'Hasło musi mieć minimum 6 znaków')
      .max(72, 'Hasło może mieć maksymalnie 72 znaki')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Hasło musi zawierać małą literę, wielką literę i cyfrę'
      ),
    confirmPassword: z.string().min(1, 'Potwierdź hasło'),
    familyName: z
      .string()
      .min(1, 'Nazwa rodziny jest wymagana')
      .min(2, 'Nazwa rodziny musi mieć minimum 2 znaki')
      .max(100, 'Nazwa rodziny może mieć maksymalnie 100 znaków'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła nie są identyczne',
    path: ['confirmPassword'],
  })

// Schema resetowania hasła
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email jest wymagany')
    .email('Nieprawidłowy format email'),
})

// Schema ustawiania nowego hasła
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Hasło jest wymagane')
      .min(6, 'Hasło musi mieć minimum 6 znaków')
      .max(72, 'Hasło może mieć maksymalnie 72 znaki')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Hasło musi zawierać małą literę, wielką literę i cyfrę'
      ),
    confirmPassword: z.string().min(1, 'Potwierdź hasło'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła nie są identyczne',
    path: ['confirmPassword'],
  })

// Typy TypeScript
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
