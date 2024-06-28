"use client";

import { useCallback, useMemo, useRef } from "react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { DiscussedCard } from "./_components/discussed-card";
import { useDiscussion } from "@/app/api/discussion/discussion.query";
import { DiscussionLoading } from "./_components/discussed-loading";
import { Status } from "@/types/discussion";

const DiscussedPage = () => {
  const user = useCurrentUser();

  const observer = useRef<IntersectionObserver>();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useDiscussion(user?.token!, Status.Approved);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const discussions = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-[1000px] h-full grid grid-cols-1 divide-y-[1px] border-t-[1px] mx-auto">
        <DiscussionLoading />
        <DiscussionLoading />
        <DiscussionLoading />
      </div>
    );
  }
  return (
    <div className="w-[1000px] h-full grid grid-cols-1 divide-y-[1px] border-y-[1px] mx-auto">
      {discussions &&
        discussions.map((discussion) => (
          <div ref={lastElementRef} key={discussion.id} className="py-1">
            <DiscussedCard data={discussion} />
          </div>
        ))}
    </div>
  );
};

export default DiscussedPage;
