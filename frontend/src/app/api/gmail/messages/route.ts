import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getMessages, listMessageIds, toEmailItem } from "@/lib/gmail";
import { ALL_EMAILS_FETCH_CAP } from "@/constants/config";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const requested = Number(searchParams.get("maxResults") ?? 25);
  const maxResults = Math.min(
    Number.isFinite(requested) && requested > 0 ? requested : 25,
    ALL_EMAILS_FETCH_CAP
  );

  try {
    const ids = await listMessageIds(session.accessToken, maxResults);
    const messages = await getMessages(session.accessToken, ids);
    const emails = messages
      .map(toEmailItem)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ emails });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Gmail request failed" },
      { status: 502 }
    );
  }
}
