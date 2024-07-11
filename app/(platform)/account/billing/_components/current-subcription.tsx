"use client";

import { useState } from "react";
import { Header } from "@/app/(platform)/account/_components/header";
import { createSessionCheckout } from "@/app/api/payment/payment.api";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export const CurrentSubcription = () => {
  const [loading, setLoading] = useState(false);
  const user = useCurrentUser();

  const handleEditPlan = async () => {
    if (!user?.token!) return;

    setLoading(true);
    try {
      const headers = await createSessionCheckout({ token: user?.token! });
      const checkoutUrl = headers?.location || headers?.Location; // Check both lower and uppercase
      if (typeof checkoutUrl === "string") {
        window.location.href = checkoutUrl;
      } else {
        console.error(
          "Checkout URL not found in headers or not a string",
          headers
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-6">
      <Header
        title="Current subcription"
        label="Information about your current plan and your next billing method"
      />
      <div className="w-full border-[2px] px-6 py-4 rounded-xl flex flex-row items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <div className="text-muted-foreground text-sm">Your plan</div>
          <div className="font-semibold">Free</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-muted-foreground text-sm">Cycle</div>
          <div className="font-semibold">Monthly</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-muted-foreground text-sm">Next billing date</div>
          <div className="font-semibold">Mon, Jan 19 2024</div>
        </div>
        <Button onClick={handleEditPlan} className="w-fit" disabled={loading}>
          {loading ? "Processing..." : "Edit plan"}
        </Button>
      </div>
    </div>
  );
};
