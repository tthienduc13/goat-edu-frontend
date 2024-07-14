// app/api/create-checkout-session/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body.token;

    if (!token) {
      console.error("No token provided");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      "https://goateduaspbackend.azurewebsites.net/api/payment/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from external API:", errorData);
      return NextResponse.json(
        { error: "Failed to create checkout session", details: errorData },
        { status: 500 }
      );
    }

    const data = await response.json();
    const sessionUrl = data.url; // Adjust according to your API response

    return NextResponse.redirect(sessionUrl, 303);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
