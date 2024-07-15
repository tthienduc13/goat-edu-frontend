"use client";

import {
  useDeleteDiscussion,
  useDiscussionById,
} from "@/app/api/discussion/discussion.query";
import { BackButton } from "@/components/custom/buttons/back-button";
import { useQuery } from "@tanstack/react-query";
import { DiscussedDetail } from "./[slug]/_components/discussed-detail";
import { Comment } from "./[slug]/_components/comment/comment";
import { SideNav } from "./[slug]/_components/side-nav";
import { CommentList } from "./[slug]/_components/comment/comment-list";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";
import Error from "@/app/error";
import { useCurrentUser } from "@/hooks/use-current-user";

interface DiscussionProps {
  token: string;
  id: string;
  userId: string;
}

export const Discussion = ({ token, id, userId }: DiscussionProps) => {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const user = useCurrentUser();
  const router = useRouter();
  const { data, isLoading, error } = useQuery(
    useDiscussionById({ token: token, id: id })
  );

  const { mutate: deleteDiscussion, isSuccess } = useDeleteDiscussion({
    token: user?.token!,
  });

  if (isSuccess) {
    router.replace("/personal?tab=discussions");
  }

  if (!data || error) {
    Error();
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-full h-fit ">
      <div className="w-full flex flex-row items-start gap-x-5">
        <div className="flex-1  ">
          <div className="flex flex-row justify-between items-center">
            <BackButton />
            {data?.userAndSubject.userId === userId && (
              <div className="flex flex-row items-center gap-x-2">
                {/* <Hint label="Edit">
                  <Button
                    onClick={() => router.push(`/discussed/edit?id=${data.id}`)}
                    variant={"secondary"}
                    size={"icon"}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Hint> */}
                <Hint label="Delete">
                  <Button
                    onClick={() => deleteDiscussion({ id: id })}
                    variant={"secondary"}
                    size={"icon"}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </Hint>
              </div>
            )}
          </div>
          <DiscussedDetail data={data!} />
          <div className="flex flex-col gap-y-5">
            <Comment id={id} />
            <CommentList id={id} />
          </div>
        </div>
        {isTablet && <SideNav />}
      </div>
    </div>
  );
};
