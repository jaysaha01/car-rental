import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND = "https://my-car-rental-backend.onrender.com";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join("/");
  const search = req.nextUrl.search;
  const url = `${BACKEND}/${pathStr}${search}`;

  // Next.js cookie থেকে token নাও
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const headers: Record<string, string> = {};

  // token কে mytoken হিসেবে Render-এ পাঠাও
  if (token) {
    headers["Cookie"] = `mytoken=${token}`;
  }

  let body: BodyInit | undefined = undefined;
  const contentType = req.headers.get("content-type") || "";

  if (req.method !== "GET" && req.method !== "DELETE") {
    if (contentType.includes("multipart/form-data")) {
      body = await req.formData();
    } else {
      headers["Content-Type"] = "application/json";
      body = await req.text();
    }
  }

  const res = await fetch(url, {
    method: req.method,
    headers,
    body,
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;