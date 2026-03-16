import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://my-car-rental-backend.onrender.com";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathStr = path.join("/");
    const search = req.nextUrl.search;
    const url = `${BACKEND}/${pathStr}${search}`;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const headers: Record<string, string> = {};

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
        const text = await req.text();
        body = text || undefined;  // ✅ খালি body হলে undefined
      }
    }

    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    // ✅ JSON না হলেও crash করবে না
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text || "Success" };
    }

    return NextResponse.json(data, { status: res.status });

  } catch (err: any) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      { message: "Proxy error", error: err.message },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;