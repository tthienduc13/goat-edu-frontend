"use client";
import { useDiscussionById } from "@/app/api/discussion/discussion.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DiscussedCard } from "../_components/discussed-card";
import { BackButton } from "@/components/custom/buttons/back-button";

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
    <div className="w-full">
      <BackButton />
      <DiscussedCard isDetail={true} data={data} />
    </div>
  );
};

export default DiscussedDetailPage;
