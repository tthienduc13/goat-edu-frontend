"use client";

import { useDiscussionById } from "@/app/api/discussion/discussion.query";
import Error from "@/app/error";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";
import { DiscussedStatus } from "../_components/discussed-status";
import { Button } from "@/components/ui/button";
import { LatexRenderer } from "@/lib/latext-render";
import { formatTimeAgo } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const PreviewDiscussionPage = () => {
  const user = useCurrentUser();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, error } = useQuery(
    useDiscussionById({ token: user?.token!, id: id! })
  );

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-[calc(100vh-80px-64px)] gap-y-5">
        <Skeleton className="h-[100px]" />
        <div className="flex-1 w-full">
          <Skeleton className="h-full" />
        </div>
      </div>
    );
  }

  if (!id) {
    notFound();
  }

  if (!data || error || !user) {
    Error();
  }

  if (data?.userAndSubject.userId !== user?.id) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px-64px)] gap-y-5">
      <div className="left-0 px-5 py-4 rounded-lg border-[2px] shadow-lg w-full justify-between flex items-center">
        <div className="flex flex-col gap-y-1">
          <div className="w-full flex flex-row items-center gap-x-2">
            <h1 className="text-2xl font-semibold">{data?.discussionName}</h1>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            {data?.tags.map((tag) => (
              <Button
                key={tag.id}
                variant={"secondary"}
                className="text-sm px-2 py-1 rounded-lg"
              >
                #{tag.tagName}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-x-2">
          <DiscussedStatus status={data?.status!} />
          <Button variant={"ghost"} size={"icon"}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <h3>Preview Content</h3>
        <div className="text-sm">{formatTimeAgo(data?.createdAt!)}</div>
      </div>
      <div className="flex-1 flex flex-col gap-y-2  border-[2px] rounded-lg shadow-lg px-5 py-4">
        <LatexRenderer latex={data?.discussionBodyHtml!} />
      </div>
    </div>
  );
};

export default PreviewDiscussionPage;
