import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { CommentIcon } from "@/components/custom-icons/comment-icon";
import { FlagIcon } from "@/components/custom-icons/flag-icon";
import { UpvoteIcon } from "@/components/custom-icons/upvote-icon";
import { Discussion } from "@/types/discussion";

interface DiscussedCardProps {
  data: Discussion;
}

export const DiscussedCard = ({ data }: DiscussedCardProps) => {
  return (
    <Card className="border-none shadow-none hover:bg-secondary/80  dark:hover:bg-secondary/40 ">
      <CardHeader>
        <div className="flex h-10 flex-row items-center gap-x-2">
          <Avatar className="h-10 w-10  rounded-md">
            <AvatarImage src={data.userAndSubject.userImage ?? ""} />
            <AvatarFallback className="w-full text-sm h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
              GE
            </AvatarFallback>
          </Avatar>
          <div className="h-full flex flex-col justify-between flex-1">
            <div className="font-bold">{data.userAndSubject.fullName}</div>
            <span className="text-xs text-muted-foreground">
              @{data.userAndSubject.userName}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <Link
          className="font-semibold text-base"
          href={`/discussed/${data.id}`}
        >
          {data.discussionName}
        </Link>
        <Link
          className="max-h-24 text-sm h-full overflow-hidden"
          href={`/discussed/${data.id}`}
        >
          {data.discussionBody}
        </Link>
      </CardContent>
      <CardFooter className="flex flex-row gap-x-4">
        <div className="flex items-center gap-x-1 flex-row">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-emerald-500/70 "
          >
            <UpvoteIcon />
          </Button>
          <span>{data.discussionVote}</span>
        </div>
        <div className="flex items-center gap-x-1 flex-row">
          <Button variant="ghost" size="icon" className="hover:bg-cyan-400/70">
            <CommentIcon />
          </Button>
          <span>1</span>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-destructive/70">
          <FlagIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};
