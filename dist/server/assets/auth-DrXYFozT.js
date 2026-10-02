import { t as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-BdB2e2iw.js";
//#region src/server/auth.ts
/** Регистрация: валидация полей + проверка уникальности логина + запись в БД. */
var registerUser = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a055523dbd411bc6e3997eaeae7ce95a4d758a90efc7b618d3b7d1971e25a667"));
/** Авторизация: проверка логина/пароля, сообщение при некорректном вводе. */
var loginUser = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ee6bbb87e9692e52f11bda794c34c5d6413a578a755cdde33c99fe7ff47b862b"));
createServerFn({ method: "GET" }).handler(createSsrRpc("9175d90fc1a6f058cb1cf4674a16c41f52b91968bc1e8cfac33cb57fea0adfaa"));
/** Выход из системы: удаление cookie сессии. */
var logoutUser = createServerFn({ method: "POST" }).handler(createSsrRpc("3e9f08adae656a15cbdb2e3a8bfe9daf543d748edc3be4c62d4693c66f570dba"));
//#endregion
export { logoutUser as n, registerUser as r, loginUser as t };
