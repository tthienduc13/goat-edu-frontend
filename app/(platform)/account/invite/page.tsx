"use client";

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

const InviteFriendPage = () => {
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
    <>
      <Wrapper title="Invite friends">
        <div className="flex flex-col gap-y-4">
          <input className="w-full h-[46.4px]" placeholder="link here"></input>
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
            Meet the students who joined Goat.edu through your invite. They
            might just be your ticket to future rewards 😉
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default InviteFriendPage;
