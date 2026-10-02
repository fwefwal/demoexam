import { z } from 'zod'

export const LOGIN_REGEX = /^[A-Za-z0-9]{6,}$/

export const FULLNAME_REGEX = /^[А-Яа-яЁё\s]+$/

export const PHONE_REGEX = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/

export const registerSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, 'Введите логин')
    .regex(LOGIN_REGEX, 'Логин: латиница и цифры, не менее 6 символов'),
  password: z
    .string()
    .min(1, 'Введите пароль')
    .min(8, 'Пароль: не менее 8 символов'),
  fullname: z
    .string()
    .trim()
    .min(1, 'Введите ФИО')
    .regex(FULLNAME_REGEX, 'ФИО: только буквы кириллицы и пробелы'),
  phone: z
    .string()
    .trim()
    .min(1, 'Введите телефон')
    .regex(PHONE_REGEX, 'Телефон: формат 8(XXX)XXX-XX-XX'),
  email: z
    .string()
    .trim()
    .min(1, 'Введите email')
    .regex(EMAIL_REGEX, 'Email: некорректный адрес'),
})

export const loginSchema = z.object({
  login: z.string().trim().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>

export type FieldErrors = Record<string, string>

export function collectFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {}

  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? 'form')

    if (!errors[field]) {
      errors[field] = issue.message
    }
  }

  return errors
}
