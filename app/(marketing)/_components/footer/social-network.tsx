import {
  FaTiktok,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import { Logo } from "@/components/custom/logo";

export const SocialNetwork = () => {
  return (
    <div className="w-full flex flex-row justify-between border-t-[1px] items-center py-4 ">
      <div className="flex flex-col">
        <div>
          <Button asChild size="icon" variant="ghost" className="rounded-full">
            <Link href="">
              <FaTiktok />
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost" className="rounded-full">
            <Link href="">
              <FaTwitter />
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost" className="rounded-full">
            <Link href="">
              <FaFacebook />
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost" className="rounded-full">
            <Link href="">
              <FaInstagram />
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost" className="rounded-full">
            <Link href="">
              <FaYoutube />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col">
          <p className="text-base">@2024 Goat.edu, Inc.</p>
          <p className="text-xs text-muted-foreground">
            Built and operated by{" "}
            <Link
              className="hover:underline"
              href="https://github.com/tthienduc13"
            >
              Duc Nguyen
            </Link>
            ,{" "}
            <Link
              className="hover:underline"
              href="https://github.com/huscongao1692003"
            >
              Thanh Nguyen
            </Link>
            ,{" "}
            <Link className="hover:underline" href="https://github.com/Kiamng">
              Lam Nguyen
            </Link>
            ,{" "}
            <Link className="hover:underline" href="https://github.com/b3os">
              Khang Bui
            </Link>
          </p>
        </div>
      </div>
      <div className="items-center flex">
        <Logo size="lg" />
      </div>
    </div>
  );
};
