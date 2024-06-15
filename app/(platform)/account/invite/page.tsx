"use client";

import { Copy, Link } from "lucide-react";
import { Wrapper } from "../_components/wrapper";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/custom/hint";
import { toast } from "sonner";

const InviteFriendPage = () => {
  const shareUrl = process.env.NEXT_PUBLIC_URL as string;

  const socialLink = [
    {
      logo: (
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon className="h-12 w-12 p-0" borderRadius={14} />
        </TwitterShareButton>
      ),
      name: "x",
    },
    {
      logo: (
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon className="h-12 w-12 p-0 " borderRadius={14} />
        </WhatsappShareButton>
      ),
      name: "WhatsApp",
    },
    {
      logo: (
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon className="h-12 w-12 p-0 " borderRadius={14} />
        </FacebookShareButton>
      ),
      name: "Facebook",
    },
    {
      logo: (
        <RedditShareButton url={shareUrl}>
          <RedditIcon className="h-12 w-12 p-0 " borderRadius={14} />
        </RedditShareButton>
      ),
      name: "Reddit",
    },
    {
      logo: (
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon className="h-12 w-12 p-0 " borderRadius={14} />
        </LinkedinShareButton>
      ),
      name: "Linkedln",
    },
    {
      logo: (
        <TelegramShareButton url={shareUrl}>
          <TelegramIcon className="h-12 w-12 p-0 " borderRadius={14} />
        </TelegramShareButton>
      ),
      name: "Telegram",
    },
    {
      logo: (
        <EmailShareButton url={shareUrl}>
          <EmailIcon className="h-12 w-12 p-0 " borderRadius={14} />
        </EmailShareButton>
      ),
      name: "Email",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Url coppied to clipboard");
  };

  return (
    <Wrapper title="Invite friends">
      <div className="flex pb-10 flex-col gap-y-4">
        <div className="h-12  cursor-pointer rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
          <Link className={cn("h-5 w-5 mr-2 text-primary ")} />
          <div className="flex flex-col flex-1">
            <div
              onClick={handleCopy}
              className="border-none hover:opacity-80 px-3 outline-none text-primary shadow-none focus-visible:ring-0 "
            >
              {shareUrl}
            </div>
          </div>
          <Hint label="Copy to clipboard" side="bottom" sideOffset={10}>
            <Button onClick={handleCopy} size={"icon"} variant={"ghost"}>
              <Copy className="h-5 w-5" />
            </Button>
          </Hint>
        </div>
        <p className="font-semibold">or invite via</p>
        <div className="flex flex-row flex-wrap gap-2 gap-y-4">
          {socialLink?.map((data, index) => (
            <div key={index} className="flex flex-col w-16 items-center">
              <div className="overflow-hidden rounded-14">{data.logo}</div>
              <span className="mt-1.5 max-w-16 overflow-hidden overflow-ellipsis text-center text-[11px] text-text-tertiary cursor-pointer">
                {data.name}
              </span>
            </div>
          ))}
        </div>
        <p className="font-bold">Friends you brought abroad</p>
        <p>
          Meet the students who joined Goat.edu through your invite. They might
          just be your ticket to future rewards 😉
        </p>
      </div>
    </Wrapper>
  );
};

export default InviteFriendPage;
