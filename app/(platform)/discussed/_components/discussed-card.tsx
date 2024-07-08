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
import { Discussion } from "@/types/discussion";
import { cn } from "@/lib/utils";
import { UpvoteButton } from "./upvote-button";
import { LatexRenderer } from "@/lib/latext-render";

interface DiscussedCardProps {
  data: Discussion;
}

export const DiscussedCard = ({ data }: DiscussedCardProps) => {
  return (
    <Card
      className={cn(
        "border-none shadow-none hover:bg-secondary/80  dark:hover:bg-secondary/40"
      )}
    >
      <CardHeader>
        <div className="flex h-10 flex-row items-center gap-x-2">
          <Avatar className="h-10 w-10  rounded-md">
            <AvatarImage
              src={data.userAndSubject?.userImage}
              className="object-cover"
            />
            <AvatarFallback className="w-full text-sm h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
              GE
            </AvatarFallback>
          </Avatar>
          <div className="h-full flex flex-col justify-between flex-1">
            <div className="font-bold">
              {data.userAndSubject?.fullName ?? "No name"}
            </div>
            <span className="text-xs text-muted-foreground">
              @{data.userAndSubject?.userName ?? "No username"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <Link
          className="font-semibold text-base sm:text-xl"
          href={`/discussed/${data.id}`}
        >
          {data.discussionName}
        </Link>
        <Link
          className="sm:text-base text-sm h-full overflow-hidden line-clamp-5"
          href={`/discussed/${data.id}`}
        >
          <LatexRenderer latex={data.discussionBodyHtml} />
        </Link>
      </CardContent>
      {/* <CardFooter className="flex flex-row gap-x-4">
        <UpvoteButton
          id={data.id}
          isUserVoted={data.isUserVoted}
          voteCount={data.discussionVote}
        />
        <div className="flex items-center gap-x-1 flex-row">
          <Button variant="ghost" size="icon" className="hover:bg-cyan-400/70">
            <CommentIcon />
          </Button>
          <span>1</span>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-destructive/70">
          <FlagIcon />
        </Button>
      </CardFooter> */}
    </Card>
  );
};
