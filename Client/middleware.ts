import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/search", "/login", "/register"];

const ROLE_ROUTES: Record<string, string[]> = {
  Owner: [
    "/admin/bookings",
    "/admin/dashboard",
    "/admin/users",
    "/admin/vehicles",
  ],
  Renter: [
    "/renter/bookings",
    "/renter/dashboard",
    "/renter/profile",
  ],
  Admin: [
    "/owner/add-vehicle",
    "/owner/bookings",
    "/owner/dashboard",
    "/owner/edit-vehicle",
    "/owner/profile",
    "/owner/vehicles",
  ],
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function isPublicRoute(pathname: string): boolean {
  // Exact match
  if (PUBLIC_ROUTES.includes(pathname)) return true;

  // Dynamic route: /vehicle/[id]  →  /vehicle/123
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
    case "Owner":
      return "/admin/dashboard";
    case "Renter":
      return "/renter/dashboard";
    case "Admin":
      return "/owner/dashboard";
    default:
      return "/login";
  }
}

// ─── Middleware ────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. সব সময় public route allow করো
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 2. localStorage middleware-এ কাজ করে না (server-side),
  //    তাই role cookie থেকে পড়তে হবে।
  //    Client-side থেকে role cookie সেট করতে হবে (নিচে util দেখো)।
  const role = request.cookies.get("role")?.value;

  // 3. Role না থাকলে → login page-এ পাঠাও
  if (!role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname); // login করার পর ফিরে আসবে
    return NextResponse.redirect(loginUrl);
  }

  // 4. Role অনুযায়ী route check করো
  const allowedRoutes = getAllowedRoutes(role);

  if (!isRouteAllowed(pathname, allowedRoutes)) {
    // Allowed না হলে → সেই role-এর default dashboard-এ পাঠাও
    const redirectUrl = new URL(getDefaultRedirect(role), request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 5. সব ঠিক আছে → এগিয়ে যাও
  return NextResponse.next();
}

// ─── Matcher: শুধু এই pattern-এর জন্য middleware চলবে ─────────────────────

export const config = {
  matcher: [
    /*
     * Public static file এবং Next.js internals বাদ দাও:
     * _next/static, _next/image, favicon.ico ইত্যাদি
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};