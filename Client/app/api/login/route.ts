import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    "https://my-car-rental-backend.onrender.com/auth/loginaccount",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  const response = NextResponse.json(data);

  // set cookie in Next.js domain
  response.cookies.set("role", data.data.usertype, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  response.cookies.set("token", data.token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return response;
}