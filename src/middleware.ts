import User from "@lib/User";
import { NextResponse, type NextRequest } from "next/server";

let check = 0;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
  } 
}
