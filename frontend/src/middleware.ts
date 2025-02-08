import { betterFetch } from "@better-fetch/fetch";
import auth from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import env from "./env";
import { createRouteMatcher } from "./lib/routeMatcher";

const isAuthRoute = createRouteMatcher(["/sign-in", "/sign-up"]);
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAdminRoute = createRouteMatcher(["/dashboard/admin(.*)"]);

type Session = typeof auth.$Infer.Session;

export default async function authMiddleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		`${env.NEXT_PUBLIC_AUTH_ENDPOINT}/get-session`,
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
			credentials: "include",
		},
	);
	
	if (session && isAuthRoute(request)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (!session && isProtectedRoute(request)) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	if (session && isAdminRoute(request)) {
		if (session.user.role !== "admin") {
			return NextResponse.rewrite(new URL('/404', request.url))
		}
	}

	if (session && isProtectedRoute(request) && !request.nextUrl.pathname.includes('/admin')) {
		if (session.user.role === "admin") {
			return NextResponse.redirect(new URL('/dashboard/admin', request.url));
		}

	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}
