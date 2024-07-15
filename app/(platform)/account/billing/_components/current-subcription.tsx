"use client";

import axios from "axios";
import { Header } from "@/app/(platform)/account/_components/header";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { Console } from "console";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

export const CurrentSubscription = () => {
  const { update } = useSession();

  const currentDate = new Date();
  const billingDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + 1)
  );

  const user = useCurrentUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (user) {
      setToken(user.token);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/create-checkout-session`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const redirectUrl = response.data;
      await update({
        user: { subscription: true },
      });
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.error("No redirect URL found in the response headers.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };
  return (
    <div className="flex flex-col w-full gap-y-6">
      <Header
        title="Current Subscription"
        label="Information about your current plan and your next billing method"
      />
      <form onSubmit={handleSubmit}>
        <div className="w-full border-[2px] px-6 py-4 rounded-xl flex flex-row items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <div className="text-muted-foreground text-sm">Your plan</div>
            <div className="font-semibold">
              {user?.subscription ? "Pro" : "Free"}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="text-muted-foreground text-sm">Cycle</div>
            <div className="font-semibold">Monthly</div>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="text-muted-foreground text-sm">
              Next billing date
            </div>
            <div className="font-semibold">
              {user?.subscription
                ? format(billingDate, "EEE, MMM d yyyy")
                : format(currentDate, "EEE, MMM d yyyy")}
            </div>
          </div>
          <Button type="submit" className="w-fit">
            Edit plan
          </Button>
        </div>
      </form>
    </div>
  );
};
