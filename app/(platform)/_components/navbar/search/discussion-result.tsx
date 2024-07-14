import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LatexRenderer } from "@/lib/latext-render";
import { formatTimeAgo } from "@/lib/utils";
import { Discussion } from "@/types/discussion";
import { UseQueryResult } from "@tanstack/react-query";
import Link from "next/link";

interface DiscussionResultProps {
  result: UseQueryResult<Discussion[], Error>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const DiscussionResult = ({
  result,
  setValue,
}: DiscussionResultProps) => {
  if (!result.data || result.data.length === 0) {
    return;
  }
  return (
    <div className="w-full flex flex-col gap-y-3">
      <div className="w-full px-4">
        <h3 className="relative text-lg w-fit ">
          Discussions
          <div className="absolute b-0 left-0 w-[50%] h-1 bg-violet-500" />
        </h3>
      </div>
      <div className="flex flex-col gap-y-3">
        {result.data?.map((discussion) => (
          <Link
            href={`/discussed/${discussion.id}`}
            onClick={() => setValue("")}
            key={discussion.id}
            className="flex px-5 py-1 flex-col gap-y-1 hover:bg-secondary"
          >
            <div className="flex flex-row w-full justify-between items-center">
              <div className="text-base cursor-pointer font-medium">
                {discussion.discussionName}
              </div>
              <span className="text-muted-foreground text-[10px]">
                {formatTimeAgo(discussion.createdAt)}
              </span>
            </div>
            <div className="">
              <div className="text-sm text-muted-foreground line-clamp-1">
                <LatexRenderer latex={discussion.discussionBodyHtml} />
              </div>
            </div>
            <div className="w-full flex flex-row gap-x-2">
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={discussion.userAndSubject.userImage ?? ""}
                  className="object-cover"
                ></AvatarImage>
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <div className="flex flex-row items-center gap-x-1 text-muted-foreground text-sm">
                <p>{discussion.userAndSubject.fullName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
