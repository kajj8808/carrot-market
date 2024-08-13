import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/sessions";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/log-in": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      // login을 하지 않으면 못 보는 페이지 처리
      return NextResponse.redirect(new URL("/create-account", request.url));
    } else {
      // login이 되어있고 로그인이 되었을때만 볼수있는 페이지 처리
      //
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
