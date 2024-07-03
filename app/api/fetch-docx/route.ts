import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching document: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: { "Content-Type": "application/octet-stream" },
    });
  } catch (error) {
    return NextResponse.json("erorr", { status: 500 });
  }
}
