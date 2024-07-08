import Link from "next/link";

import { Discussion } from "@/types/discussion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PopularDiscussionProps {
  data?: Discussion[];
}

export const PopularDiscussion = ({ data }: PopularDiscussionProps) => {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-xl">Popular questions</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {data.map((data) => (
          <div
            key={data.id}
            className="w-full p-4 flex flex-col gap-y-5 border-[1px] shadow-lg rounded-2xl "
          >
            <div className="text-sm bg-secondary px-2 py-1 rounded-lg w-fit">
              {data.userAndSubject.subjectName}
            </div>
            <Link
              href={`/discussed/${data.id}`}
              className="text-sm text-muted-foreground line-clamp-2"
            >
              {data.discussionName}
            </Link>
            <div className="flex flex-row items-center gap-x-2">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src={data.userAndSubject.userImage}
                  alt="user image"
                ></AvatarImage>
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <div className="text-sm font-semibold">
                {data.userAndSubject.fullName}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
