import { NextResponse, type NextRequest } from "next/server";

let check = 0;
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        if (check !== 1) {
            check++;
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }
}