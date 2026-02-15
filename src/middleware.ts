import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    // If the request is for the admin dashboard or login, skip intl middleware
    // and let NextAuth handle it (or handle it manually)
    const isPublicPath =
        req.nextUrl.pathname === "/login" ||
        req.nextUrl.pathname.startsWith("/api") ||
        req.nextUrl.pathname.startsWith("/_next") ||
        req.nextUrl.pathname.includes(".");

    if (req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname === "/login") {
        return; // NextAuth middleware has already run via `auth(...)` wrapper
    }

    return intlMiddleware(req);
});

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
