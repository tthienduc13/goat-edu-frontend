"use client";

import { useDiscussionById } from "@/app/api/discussion/discussion.query";
import { BackButton } from "@/components/custom/buttons/back-button";
import { useQuery } from "@tanstack/react-query";
import { DiscussedDetail } from "./[slug]/_components/discussed-detail";
import { Comment } from "./[slug]/_components/comment/comment";
import { SideNav } from "./[slug]/_components/side-nav";
import Error from "@/app/error";
import { CommentList } from "./[slug]/_components/comment/comment-list";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useConnectionStore } from "@/stores/useConnectionStore";

interface DiscussionProps {
  token: string;
  id: string;
}

export const Discussion = ({ token, id }: DiscussionProps) => {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const { data, isLoading, error } = useQuery(
    useDiscussionById({ token: token, id: id })
  );

  const { connection } = useConnectionStore();

  console.log(connection);

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
          <BackButton />
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
