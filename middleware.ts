import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Build canonical URL using the primary site hostname and the request pathname
  const pathname = request.nextUrl.pathname || "/";
  const canonical = `https://www.brihaspathi.com${pathname}`;

  // Set Link header with rel="canonical" so crawlers receive canonical info
  response.headers.set("Link", `<${canonical}>; rel="canonical"`);

  return response;
}

export const config = {
  matcher: "/:path*",
};
