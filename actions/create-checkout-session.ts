// app/actions/createCheckoutSession.ts

import { NextResponse } from "next/server";

export async function CreateCheckoutSession(token: string) {
  try {
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

    const sessionUrl = response.headers.get("Location");

    if (!sessionUrl) {
      return NextResponse.json(
        { error: "No session URL found" },
        { status: 500 }
      );
    }

    return NextResponse.redirect(sessionUrl, 303);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
