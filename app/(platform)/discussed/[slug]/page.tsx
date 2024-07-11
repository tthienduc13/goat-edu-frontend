import { useDiscussionById } from "@/app/api/discussion/discussion.query";
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

  if (!user) {
    return;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Discussion userId={user?.id!} token={user?.token!} id={params.slug} />
    </HydrationBoundary>
  );
}
