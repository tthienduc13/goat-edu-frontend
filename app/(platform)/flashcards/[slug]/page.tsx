import { useFlashcardContentById } from "@/app/api/flashcard-content/flashcard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";
import { currentUser } from "@/lib/auth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Flashcard } from "../flashcard";
import { Metadata } from "next";
import { getFlashcardById } from "@/app/api/flashcard/flashcard.api";

interface FlashcardPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: FlashcardPageProps): Promise<Metadata | undefined> {
  const user = await currentUser();
  const data = await getFlashcardById(user?.token!, params.slug);
  if (!data) return;

  return {
    title: data.flashcardName,
    description: data.flashcardDescription,
    openGraph: {
      title: data.flashcardName,
      description: data.flashcardDescription,
      type: "article",
      locale: "vi_VN",
      url: `${process.env.NEXT_PUBLIC_URL}/flashcards/${data.id}`,
      siteName: "GoatEdu",
    },
  };
}

export default async function FlashcardPage({ params }: FlashcardPageProps) {
  const queryClient = new QueryClient();

  const user = await currentUser();

  await queryClient.prefetchQuery(
    useFlashcardById({ token: user?.token!, id: params.slug })
  );

  await queryClient.prefetchQuery(
    useFlashcardContentById({ token: user?.token!, id: params.slug })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flashcard token={user?.token!} id={params.slug} />
    </HydrationBoundary>
  );
}
