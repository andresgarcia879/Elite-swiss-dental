import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith("/admin")
            const isOnLogin = nextUrl.pathname === "/login"

            if (isOnAdmin) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn && isOnLogin) {
                return Response.redirect(new URL("/admin", nextUrl))
            }
            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role as string // Add role to session
            }
            return session
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
