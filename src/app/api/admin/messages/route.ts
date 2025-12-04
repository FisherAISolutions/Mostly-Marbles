import { NextRequest, NextResponse } from "next/server";

let messages: { id: string; userEmail: string; message: string; createdAt: string }[] = [];

export async function GET() {
  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = String(body.message ?? "").slice(0, 1000);

  if (!message.trim()) {
    return NextResponse.json({ messages }, { status: 400 });
  }

  const fakeUserEmail = "admin@example.com"; // TODO: replace with real authenticated user email

  messages = [
    ...messages,
    {
      id: crypto.randomUUID(),
      userEmail: fakeUserEmail,
      message,
      createdAt: new Date().toISOString()
    }
  ];

  return NextResponse.json({ messages });
}
