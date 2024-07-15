import { NextResponse, type NextRequest } from "next/server";

let check = 0;
const isWindowDefined = typeof window !== "undefined";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        if (check !== 1) {
            check++;
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }
    else if(request.nextUrl.pathname.startsWith("/profile")){

        const check=isWindowDefined && window.localStorage.getItem("token")
        if(!check){
            return NextResponse.redirect(new URL("/home", request.url));
        }
        return NextResponse.next();

    }
}
