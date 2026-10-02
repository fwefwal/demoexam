import { a as getCookie, i as deleteCookie, o as setCookie, t as createServerFn } from "../server.js";
import { n as createServerRpc, t as prisma } from "./db-Bz1ydeEb.js";
import { compare, hash } from "bcryptjs";
import { z } from "zod";
//#region src/lib/hash.ts
var SALT_ROUNDS = 10;
/** Хеширует пароль пользователя перед сохранением в базу данных. */
function hashPassword(password) {
	return hash(password, SALT_ROUNDS);
}
/** Сравнивает введённый пароль с хешем из базы данных. */
function verifyPassword(password, passwordHash) {
	return compare(password, passwordHash);
}
var registerSchema = z.object({
	login: z.string().trim().min(1, "Введите логин").regex(/^[A-Za-z0-9]{6,}$/, "Логин: латиница и цифры, не менее 6 символов"),
	password: z.string().min(1, "Введите пароль").min(8, "Пароль: не менее 8 символов"),
	fullname: z.string().trim().min(1, "Введите ФИО").regex(/^[А-Яа-яЁё\s]+$/, "ФИО: только буквы кириллицы и пробелы"),
	phone: z.string().trim().min(1, "Введите телефон").regex(/^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/, "Телефон: формат 8(XXX)XXX-XX-XX"),
	email: z.string().trim().min(1, "Введите email").regex(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, "Email: некорректный адрес")
});
var loginSchema = z.object({
	login: z.string().trim().min(1, "Введите логин"),
	password: z.string().min(1, "Введите пароль")
});
/** Преобразует ошибки Zod в объект "поле -> сообщение" (по одному сообщению на поле). */
function collectFieldErrors(error) {
	const errors = {};
	for (const issue of error.issues) {
		const field = String(issue.path[0] ?? "form");
		if (!errors[field]) errors[field] = issue.message;
	}
	return errors;
}
//#endregion
//#region src/server/auth.ts?tss-serverfn-split
var SESSION_COOKIE = "korok_session";
var SESSION_MAX_AGE = 604800;
function toSessionUser(user) {
	return {
		id: user.id,
		login: user.login,
		fullname: user.fullname,
		email: user.email,
		phone: user.phone,
		role: user.role
	};
}
function startSession(userId) {
	setCookie(SESSION_COOKIE, String(userId), {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_MAX_AGE
	});
}
/** Регистрация: валидация полей + проверка уникальности логина + запись в БД. */
var registerUser_createServerFn_handler = createServerRpc({
	id: "a055523dbd411bc6e3997eaeae7ce95a4d758a90efc7b618d3b7d1971e25a667",
	name: "registerUser",
	filename: "src/server/auth.ts"
}, (opts) => registerUser.__executeServer(opts));
var registerUser = createServerFn({ method: "POST" }).validator((data) => data).handler(registerUser_createServerFn_handler, async ({ data }) => {
	const parsed = registerSchema.safeParse(data);
	if (!parsed.success) return {
		ok: false,
		fieldErrors: collectFieldErrors(parsed.error)
	};
	const { login, password, fullname, phone, email } = parsed.data;
	if (await prisma.user.findUnique({ where: { login } })) return {
		ok: false,
		fieldErrors: { login: "Такой логин уже занят" }
	};
	const user = await prisma.user.create({ data: {
		login,
		password: await hashPassword(password),
		fullname,
		phone,
		email
	} });
	startSession(user.id);
	return {
		ok: true,
		user: toSessionUser(user)
	};
});
var loginUser_createServerFn_handler = createServerRpc({
	id: "ee6bbb87e9692e52f11bda794c34c5d6413a578a755cdde33c99fe7ff47b862b",
	name: "loginUser",
	filename: "src/server/auth.ts"
}, (opts) => loginUser.__executeServer(opts));
var loginUser = createServerFn({ method: "POST" }).validator((data) => data).handler(loginUser_createServerFn_handler, async ({ data }) => {
	const parsed = loginSchema.safeParse(data);
	if (!parsed.success) return {
		ok: false,
		fieldErrors: collectFieldErrors(parsed.error)
	};
	const user = await prisma.user.findUnique({ where: { login: parsed.data.login } });
	const passwordMatches = user ? await verifyPassword(parsed.data.password, user.password) : false;
	if (!user || !passwordMatches) return {
		ok: false,
		formError: "Неверный логин или пароль"
	};
	startSession(user.id);
	return {
		ok: true,
		user: toSessionUser(user)
	};
});
var getCurrentUser_createServerFn_handler = createServerRpc({
	id: "9175d90fc1a6f058cb1cf4674a16c41f52b91968bc1e8cfac33cb57fea0adfaa",
	name: "getCurrentUser",
	filename: "src/server/auth.ts"
}, (opts) => getCurrentUser.__executeServer(opts));
var getCurrentUser = createServerFn({ method: "GET" }).handler(getCurrentUser_createServerFn_handler, async () => {
	const raw = getCookie(SESSION_COOKIE);
	const id = Number(raw);
	if (!raw || !Number.isInteger(id)) return null;
	const user = await prisma.user.findUnique({ where: { id } });
	return user ? toSessionUser(user) : null;
});
var logoutUser_createServerFn_handler = createServerRpc({
	id: "3e9f08adae656a15cbdb2e3a8bfe9daf543d748edc3be4c62d4693c66f570dba",
	name: "logoutUser",
	filename: "src/server/auth.ts"
}, (opts) => logoutUser.__executeServer(opts));
var logoutUser = createServerFn({ method: "POST" }).handler(logoutUser_createServerFn_handler, async () => {
	deleteCookie(SESSION_COOKIE, { path: "/" });
	return { ok: true };
});
//#endregion
export { getCurrentUser_createServerFn_handler, loginUser_createServerFn_handler, logoutUser_createServerFn_handler, registerUser_createServerFn_handler };
