"use client";

import { useDiscussionById } from "@/app/api/discussion/discussion.query";
import { BackButton } from "@/components/custom/buttons/back-button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useQuery } from "@tanstack/react-query";
import { DiscussedDetail } from "./[slug]/_components/discussed-detail";
import { Comment } from "./[slug]/_components/comment";
import { SideNav } from "./[slug]/_components/side-nav";

interface DiscussionProps {
  token: string;
  id: string;
}

export const Discussion = ({ token, id }: DiscussionProps) => {
  const { data, isLoading, error } = useQuery(
    useDiscussionById({ token: token, id: id })
  );

  if (!data) {
    return null;
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px-64px)] ">
      <TracingBeam>
        <div className="w-full flex flex-row items-start gap-x-5">
          <div className="flex-1 border-r-[1px] min-h-[calc(100vh-80px-64px)]">
            <BackButton />
            <DiscussedDetail data={data} />
            <Comment />
          </div>
          <SideNav />
        </div>
      </TracingBeam>
    </div>
  );
};
