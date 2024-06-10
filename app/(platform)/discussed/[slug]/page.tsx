import { useDiscussionById } from "@/app/api/discussion/discussion.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { BackButton } from "@/components/custom/buttons/back-button";
import { SideNav } from "./_components/side-nav";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { DiscussedDetail } from "./_components/discussed-detail";
import { Comment } from "./_components/comment";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Discussion } from "../discussion";
import { currentUser } from "@/lib/auth";

interface DiscussedDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function DiscussedDetailPage({
  params,
}: DiscussedDetailPageProps) {
  const queryClient = new QueryClient();

  const user = await currentUser();

  await queryClient.prefetchQuery(
    useDiscussionById({ token: user?.token!, id: params.slug })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Discussion token={user?.token!} id={params.slug} />
    </HydrationBoundary>
  );
}
