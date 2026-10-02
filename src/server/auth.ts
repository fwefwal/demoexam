import { createServerFn } from '@tanstack/react-start'
import { deleteCookie, getCookie, setCookie } from '@tanstack/react-start/server'
import { prisma } from '#/db'
import { hashPassword, verifyPassword } from '#/lib/hash'
import {
  collectFieldErrors,
  loginSchema,
  registerSchema,
  type FieldErrors,
  type LoginInput,
  type RegisterInput,
} from '#/lib/validation'

const SESSION_COOKIE = 'korok_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 дней

export type SessionUser = {
  id: number
  login: string
  fullname: string
  email: string
  phone: string
  role: string
}

export type AuthResult =
  | { ok: true; user: SessionUser }
  | { ok: false; fieldErrors?: FieldErrors; formError?: string }

type UserRow = {
  id: number
  login: string
  fullname: string
  email: string
  phone: string
  role: string
}

function toSessionUser(user: UserRow): SessionUser {
  return {
    id: user.id,
    login: user.login,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    role: user.role,
  }
}

function startSession(userId: number) {
  setCookie(SESSION_COOKIE, String(userId), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export const registerUser = createServerFn({ method: 'POST' })
  .validator((data: RegisterInput) => data)
  .handler(async ({ data }): Promise<AuthResult> => {
    const parsed = registerSchema.safeParse(data)

    if (!parsed.success) {
      return { ok: false, fieldErrors: collectFieldErrors(parsed.error) }
    }

    const { login, password, fullname, phone, email } = parsed.data

    const existing = await prisma.user.findUnique({ where: { login } })

    if (existing) {
      return { ok: false, fieldErrors: { login: 'Такой логин уже занят' } }
    }

    const user = await prisma.user.create({
      data: {
        login,
        password: await hashPassword(password),
        fullname,
        phone,
        email,
      },
    })

    startSession(user.id)

    return { ok: true, user: toSessionUser(user) }
  })

export const loginUser = createServerFn({ method: 'POST' })
  .validator((data: LoginInput) => data)
  .handler(async ({ data }): Promise<AuthResult> => {
    const parsed = loginSchema.safeParse(data)

    if (!parsed.success) {
      return { ok: false, fieldErrors: collectFieldErrors(parsed.error) }
    }

    const user = await prisma.user.findUnique({
      where: { login: parsed.data.login },
    })

    const passwordMatches = user
      ? await verifyPassword(parsed.data.password, user.password)
      : false

    if (!user || !passwordMatches) {
      return { ok: false, formError: 'Неверный логин или пароль' }
    }

    startSession(user.id)

    return { ok: true, user: toSessionUser(user) }
  })

export const getCurrentUser = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SessionUser | null> => {
    const raw = getCookie(SESSION_COOKIE)
    const id = Number(raw)

    if (!raw || !Number.isInteger(id)) {
      return null
    }

    const user = await prisma.user.findUnique({ where: { id } })

    return user ? toSessionUser(user) : null
  },
)

export const logoutUser = createServerFn({ method: 'POST' }).handler(
  async () => {
    deleteCookie(SESSION_COOKIE, { path: '/' })

    return { ok: true }
  },
)
