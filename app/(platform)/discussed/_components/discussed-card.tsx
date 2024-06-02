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

export const DiscussedCard = () => {
  return (
    <div className="py-1 ">
      <Card className="border-none shadow-none hover:bg-secondary/80  dark:hover:bg-secondary/40 ">
        <CardHeader>
          <div className="flex h-10 flex-row items-center gap-x-2">
            <Avatar className="h-10 w-10  rounded-md">
              <AvatarImage src="" />
              <AvatarFallback className="w-full text-sm h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
                GE
              </AvatarFallback>
            </Avatar>
            <div className="h-full flex flex-col justify-between flex-1">
              <div className="font-bold">Nguyen Le Thien Duc</div>
              <span className="text-xs text-muted-foreground">@tthienduc</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          <Link className="font-semibold text-base" href={`/discussed/`}>
            Tuyển dụng ngành game có phân biệt giới tính?
          </Link>
          <Link
            className="max-h-24 text-sm h-full overflow-hidden"
            href={`/discussed/`}
          >
            Em cũng chưa đi làm nhưng đôi khi lo xa một chút, là các vị trí như
            game artist, game designer hay coder ngưòi ta có ưu tiên nam hơn nữ
            không ạ. Artist thì em nghĩ là không ( hoặc có em không chắc :) )
            nhưng 2 cái còn lại em nghĩ là có. Em hơi doubt không biết nữ làm
            mảng này có thuận lợi không, có bị phân biệt không tại nhìn đâu cũng
            thấy nam Em cũng chưa đi làm nhưng đôi khi lo xa một chút, là các vị
            trí như game artist, game designer hay coder ngưòi ta có ưu tiên nam
            hơn nữ không ạ. Artist thì em nghĩ là không ( hoặc có em không chắc
            :) ) nhưng 2 cái còn lại em nghĩ là có. Em hơi doubt không biết nữ
            làm mảng này có thuận lợi không, có bị phân biệt không tại nhìn đâu
            cũng thấy nam
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
            <span>1</span>
          </div>
          <div className="flex items-center gap-x-1 flex-row">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-cyan-400/70"
            >
              <CommentIcon />
            </Button>
            <span>1</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive/70"
          >
            <FlagIcon />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
