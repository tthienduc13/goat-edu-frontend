"use client";

import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "../hint";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface SocialProps {
  isPending: boolean;
}

export const Social = ({ isPending }: SocialProps) => {
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex  items-center w-full flex-col gap-y-4">
      <Hint side="bottom" sideOffset={10} label="Login with Google">
        <Button
          disabled={isPending}
          size="lg"
          className="w-full flex items-center"
          variant="custom"
          onClick={() => onClick("google")}
        >
          {isPending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          <FcGoogle className="h-5 w-5" />
        </Button>
      </Hint>
      <Hint label="Login with Facebook" side="bottom" sideOffset={10}>
        <Button
          disabled={isPending}
          size="lg"
          className="w-full flex items-center"
          variant="custom"
          onClick={() => onClick("facebook")}
        >
          {isPending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          <FaFacebookF className="h-5 w-5 text-[#1877f2]" />
        </Button>
      </Hint>
    </div>
  );
};
