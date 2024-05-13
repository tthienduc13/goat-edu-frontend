"use client";

import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Hint } from "../hint";

export const Social = () => {
  return (
    <div className="flex items-center w-full flex-col gap-y-4">
      <Hint side="bottom" sideOffset={10} label="Login with Google">
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => {}}
        >
          <FcGoogle className="h-5 w-5" />
        </Button>
      </Hint>
      <Hint label="Login with Facebook" side="bottom" sideOffset={10}>
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => {}}
        >
          <FaFacebookF className="h-5 w-5 text-[#1877f2]" />
        </Button>
      </Hint>
    </div>
  );
};
