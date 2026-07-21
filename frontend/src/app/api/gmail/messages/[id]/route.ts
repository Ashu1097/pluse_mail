import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getMessage, toEmailItem } from "@/lib/gmail";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const message = await getMessage(session.accessToken, id);
    return NextResponse.json({ email: toEmailItem(message) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Gmail request failed" },
      { status: 502 }
    );
  }
}
