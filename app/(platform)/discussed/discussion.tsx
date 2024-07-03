"use client";

import { useDiscussionById } from "@/app/api/discussion/discussion.query";
import { BackButton } from "@/components/custom/buttons/back-button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useQuery } from "@tanstack/react-query";
import { DiscussedDetail } from "./[slug]/_components/discussed-detail";
import { Comment } from "./[slug]/_components/comment/comment";
import { SideNav } from "./[slug]/_components/side-nav";
import Error from "@/app/error";

interface DiscussionProps {
  token: string;
  id: string;
}

export const Discussion = ({ token, id }: DiscussionProps) => {
  const { data, isLoading, error } = useQuery(
    useDiscussionById({ token: token, id: id })
  );

  if (!data || error) {
    Error();
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-full h-fit ">
      <TracingBeam>
        <div className="w-full flex flex-row items-start gap-x-5">
          <div className="flex-1 px-5  ">
            <BackButton />
            <DiscussedDetail data={data!} />
            <Comment id={id} />
          </div>
          <SideNav />
        </div>
      </TracingBeam>
    </div>
  );
};
