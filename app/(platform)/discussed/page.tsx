"use client";

import { useCallback, useMemo, useRef } from "react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { DiscussedCard } from "./_components/discussed-card";
import {
  useDiscussions,
  useInifiniteDiscussion,
} from "@/app/api/discussion/discussion.query";
import { DiscussionLoading } from "./_components/discussed-loading";
import { Status } from "@/types/discussion";
import { LoaderCircle } from "lucide-react";
import { CheckIcon } from "@/components/custom-icons/check-icon";
import Error from "@/app/error";
import { RelatedCard } from "./[slug]/_components/related-card";
import { useQuery } from "@tanstack/react-query";

const DiscussedPage = () => {
  const user = useCurrentUser();

  const { data: topData } = useQuery(
    useDiscussions({
      token: user?.token!,
      search: "",
      pageNumber: 1,
      pageSize: 6,
      sort: "significant",
      status: Status.Approved,
    })
  );

  const observer = useRef<IntersectionObserver>();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInifiniteDiscussion({
      token: user?.token!,
      status: Status.Approved,
      pageSize: 6,
    });

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

  if (error) {
    Error();
  }

  return (
    <div className="flex flex-col w-full ">
      <div className="w-full flex flex-row justify-between">
        <div className=" w-full sm:w-[calc(70%-10px)] lg:w-[calc(75%-15px)] h-full grid grid-cols-1 divide-y-[1px]  ">
          {discussions &&
            discussions.map((discussion) => (
              <div
                ref={lastElementRef}
                key={discussion.id}
                className="py-1 w-full"
              >
                <DiscussedCard data={discussion} />
              </div>
            ))}
          {isFetching && (
            <div className="w-full flex items-center justify-center py-5">
              <LoaderCircle className=" h-6 w-6 animate-spin" />
            </div>
          )}
          {!hasNextPage && (
            <div className="w-full flex items-center justify-center py-5">
              <div className=" flex flex-row items-center gap-x-4">
                <CheckIcon />
              </div>
            </div>
          )}
        </div>
        <div className=" hidden sm:w-[calc(30%-10px)] lg:w-[calc(25%-15px)] sm:flex flex-col gap-y-4">
          <div className="font-medium">🔥 Trending discussions</div>
          <div className="flex flex-col divide-y-[1px] gap-2">
            {topData?.map((data) => (
              <div className="py-1" key={data.id}>
                <RelatedCard data={data} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussedPage;
