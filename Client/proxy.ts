import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/search", "/login", "/register", "/auth/loginaccount", "/auth/createaccount"];

const ROLE_ROUTES: Record<string, string[]> = {
  Admin: [
    "/admin/dashboard",
    "/admin/bookings",
    "/admin/users",
    "/admin/vehicles",
  ],

  Owner: [
    "/owner/dashboard",
    "/owner/add-vehicle",
    "/owner/bookings",
    "/owner/edit-vehicle",
    "/owner/profile",
    "/owner/vehicles",
  ],

  Renter: [
    "/renter/dashboard",
    "/renter/bookings",
    "/renter/profile",
  ],
};

// ─── Helpers ─────────────────────────────────────────

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;

  // dynamic vehicle page
  if (/^\/vehicle\/[^/]+$/.test(pathname)) return true;

  return false;
}

function getAllowedRoutes(role: string): string[] {
  return ROLE_ROUTES[role] ?? [];
}

function isRouteAllowed(pathname: string, allowedRoutes: string[]): boolean {
  return allowedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

function getDefaultRedirect(role: string): string {
  switch (role) {
    case "Admin":
      return "/admin/dashboard";

    case "Owner":
      return "/owner/dashboard";

    case "Renter":
      return "/renter/dashboard";

    default:
      return "/login";
  }
}

// ─── Proxy (Next.js 16 middleware replacement) ─────────────────

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // read role from cookie
  const role = request.cookies.get("role")?.value?.trim();

  // if no role → login
  if (!role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const allowedRoutes = getAllowedRoutes(role);

  // route not allowed
  if (!isRouteAllowed(pathname, allowedRoutes)) {
    const redirectUrl = new URL(getDefaultRedirect(role), request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// ─── Matcher ─────────────────────────────────────────

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};