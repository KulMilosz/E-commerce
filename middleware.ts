import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.nextauth.token;

  const authRoutes = ["/login", "/register", "/register-success"];
  const publicRoutes = ["/contact"];

  // Redirect authenticated users away from auth pages
  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}, {
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      const authRoutes = ["/login", "/register", "/register-success"];
      const publicRoutes = ["/contact"];

      // Allow access to auth pages and public routes without token
      if (!token && (authRoutes.some((route) => pathname.startsWith(route)) || 
                    publicRoutes.some((route) => pathname.startsWith(route)))) {
        return true;
      }

      // Require token for all other routes
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};