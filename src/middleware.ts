import authConfig from "@/auth.config"
import NextAuth from "next-auth"
const { auth } = NextAuth(authConfig)

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRouters,
} from "@/routes"

// middleware presmerovava pred vztupem do stranky
export default auth((req) => {
    const { nextUrl } = req;
    // pokud existuje v req auth, tak je logged in 
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRouters.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (nextUrl.pathname == "/github") {
        return Response.redirect(new URL("https://github.com/JakubGrezl/next-photos", nextUrl));
    }

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoutes) {
        return Response.redirect(new URL("/login", nextUrl));
    }


    return null;
})

export const config = {
    // redex, co ma jit pres middleware -> ignoruje naprkl slozku public 
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}