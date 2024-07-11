"use client";

import { useEffect } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import NotFound from "@/app/not-found";
import { verifyEmail } from "@/app/api/auth/auth.api";

export const ComfirmationCard = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const id = searchParams.get("id");

  useEffect(() => {
    confetti({
      particleCount: 500,
      spread: 323,
      origin: { x: 0.5, y: 0.5 },
    });
  }, []);

  const handleVerify = async () => {
    const response = await verifyEmail({
      token: token!,
      userId: userId!,
      id: id!,
    });
    // Handle response if needed
  };

  useEffect(() => {
    if (userId && token && id) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token, id]);

  if (token === null || !userId || !id) {
    return <NotFound />;
  }

  return (
    <CardWrapper
      headerTitle="Congratulations!"
      headerLabel="Successfully verified your email. Start using GoatEdu"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonColor="white"
    >
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-row items-center bg-emerald-500/15 px-4 py-2 rounded-lg gap-x-2">
          <Check className="h-5 w-5 text-emerald-500" />
          <div className="text-emerald-500">Email verified!</div>
        </div>
      </div>
    </CardWrapper>
  );
};
