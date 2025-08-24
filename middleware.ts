import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/control-panel/*",];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/sign-in", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};


// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "@/auth";

// const protectedRoutes = ["/control-panel/*",];

// export default async function middleware(request: NextRequest) {
//   const session = await auth();

//   const isProtected = protectedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );

//   if (!session && isProtected) {
//     return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin));
//   }

//   if (session?.user?.email) {
//     const apiRes = await fetch(`${request.nextUrl.origin}/api/check-user`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: session.user.email }),
//     });

//     const data = await apiRes.json();

//     if (!data.active) {
//       // Manually clear session cookies
//       const response = NextResponse.redirect(new URL("/", request.nextUrl.origin));
//       response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
//       response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });
//       return response;
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };