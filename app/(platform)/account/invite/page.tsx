"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { ChevronRight, Users } from "lucide-react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaRedditAlien,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

import Link from "next/link";

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

const InviteFriend = () => {
  const shareUrl = "Goat.edu";

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

  return (
    <div className="flex flex-row mx-auto w-full">
      <div className="w-[300px] ml-[150px] flex flex-col px-6 pt-6 border-[0.8px] border-r-0">
        <Button variant="ghost" className="p-6 rounded-2xl justify-start">
          <Link className="w-full" href="/account/profile">
            <div className=" flex flex-row justify-between">
              <div className="flex flex-row space-x-2 items-center">
                <Avatar className="rounded-full h-6 w-6">
                  <AvatarImage
                  // src={user?.image!}
                  />
                  <AvatarFallback className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
                    GE
                  </AvatarFallback>
                </Avatar>
                <p className="ml-2">Profile</p>
              </div>
              <ChevronRight />
            </div>
          </Link>
        </Button>
        <Button variant="secondary" className="p-6 rounded-2xl justify-start">
          <Link className="w-full" href="/account/invite">
            <div className=" flex flex-row justify-between">
              <div className="flex flex-row space-x-2 items-center">
                <Users />
                <p className="ml-2">Invite friends</p>
              </div>
              <ChevronRight />
            </div>
          </Link>
        </Button>
      </div>
      <div className="edit-profile-form flex flex-col space-y-5 w-[700px] h-[700px] overflow-y-scroll px-10 py-10 border-[0.8px] ">
        <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">
          Invite friends
        </h3>
        <input className="w-full h-[46.4px]" value="link.123"></input>
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
    </div>
  );
};

export default InviteFriend;