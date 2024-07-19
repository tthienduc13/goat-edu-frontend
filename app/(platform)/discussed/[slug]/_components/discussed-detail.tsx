"use client";
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
import { UpvoteButton } from "../../_components/upvote-button";
import { LatexRenderer } from "@/lib/latext-render";
import Image from "next/image";

interface DiscussedCardProps {
  data: Discussion;
}

export const DiscussedDetail = ({ data }: DiscussedCardProps) => {
  return (
    <Card className={cn("border-none shadow-none")}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex h-10 flex-row items-center gap-x-2">
            <Avatar className="h-10 w-10  rounded-md">
              <AvatarImage
                className="object-cover"
                src={data.userAndSubject?.userImage ?? ""}
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
          <div className="flex flex-row gap-x-3">
            {data.tags.map((tag) => (
              <div
                key={tag.id}
                className="text-sm bg-secondary px-3 py-1 rounded-lg"
              >
                #{tag.tagName}
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="font-semibold text-base sm:text-xl">
          {data.discussionName}
        </div>
        {data.discussionImage && (
          <div className=" w-full h-[300px]  sm:h-[400px] rounded-md overflow-hidden relative">
            <Image
              src={data.discussionImage}
              objectFit="contain"
              alt="discussionImage"
              fill
            />
          </div>
        )}
        <div className="text-xs sm:text-base h-full overflow-hidden">
          <LatexRenderer latex={data.discussionBodyHtml} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between items-center">
        <div className="w-full flex items-center flex-row gap-x-4">
          <UpvoteButton
            id={data.id}
            voteCount={data.discussionVote}
            isUserVoted={data.isUserVoted}
          />
          <div className="flex items-center gap-x-1 flex-row">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-cyan-400/70"
            >
              <CommentIcon />
            </Button>
            <span>{data.commentCount}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive/70"
          >
            <FlagIcon />
          </Button>
        </div>
        <div className="text-xs block">
          {new Date(data?.createdAt).toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};
