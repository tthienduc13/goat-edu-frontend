import {
  FaTiktok,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import { Logo } from "@/components/logo";

export const SocialNetwork = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-slate-400 block w-[1220px] h-[1px] my-2"></div>
      <div className="w-[1220px] flex flex-row py-8 justify-between">
        <div className="flex flex-col">
          {/* <div>
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Link href="">
                <FaTiktok />
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Link href="">
                <FaTwitter />
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Link href="">
                <FaFacebook />
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Link href="">
                <FaInstagram />
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Link href="">
                <FaYoutube />
              </Link>
            </Button>
          </div> */}
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            @2024 Goat.edu, Inc.
          </p>
        </div>
        <div className="items-center flex">
          <Logo size="lg" />
        </div>
      </div>
    </div>
  );
};
