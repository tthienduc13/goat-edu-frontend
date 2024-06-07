import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Discussion } from "@/types/discussion";
import Link from "next/link";

interface RelatedCardProps {
  data: Discussion;
}

export const RelatedCard = () => {
  return (
    <Link
      href={`/discussed`}
      className="flex flex-col gap-y-2 px-2 py-3 hover:rounded-lg hover:bg-secondary/80  dark:hover:bg-secondary/40"
    >
      <div className="flex flex-row items-center gap-x-1">
        <Avatar className="h-4 w-4  rounded-md">
          {/* <AvatarImage src={data.userAndSubject?.userImage ?? ""} /> */}
          <AvatarFallback className=" h-4 w-4 text-xs flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]"></AvatarFallback>
        </Avatar>
        <span className="text-xs">tthienduc</span>
      </div>
      <div className="text-sm font-semibold text-muted-foreground">
        How high and fast could air-breathing engines fly?
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <div className="text-muted-foreground text-xs">55 upvotes</div>
        <div className="text-muted-foreground text-xs">68 comments</div>
      </div>
    </Link>
  );
};
