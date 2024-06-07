"use client";
import { useDiscussionById } from "@/app/api/discussion/discussion.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { BackButton } from "@/components/custom/buttons/back-button";
import { SideNav } from "./_components/side-nav";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { DiscussedDetail } from "./_components/discussed-detail";
import { Comment } from "./_components/commet";

interface DiscussedDetailPageProps {
  params: {
    slug: string;
  };
}

const DiscussedDetailPage = ({ params }: DiscussedDetailPageProps) => {
  const user = useCurrentUser();
  const { data, isLoading, error } = useDiscussionById(
    params.slug,
    user?.token!
  );

  if (!data) return;
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

export default DiscussedDetailPage;
