import { useFlashcardContentById } from "@/app/api/flashcard-content/flascard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";
import { currentUser } from "@/lib/auth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Flashcard } from "./flashcard";

interface FlashcardPageProps {
  params: { slug: string };
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

  // const {
  //   data: flashcardContentData,
  //   isLoading: flashcardContentLoading,
  //   error: flashcardContentError,
  // } = useFlashcardContentById(slug as string, user?.token!);

  // const {
  //   data: flashcardData,
  //   isLoading: flashcardLoading,
  //   error: flashcardError,
  // } = useFlashcardById(slug as string, user?.token!);

  // if (flashcardContentLoading) {
  //   return;
  // }

  // if (!flashcardContentData) {
  //   return;
  // }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Flashcard token={user?.token!} id={params.slug} />
    </HydrationBoundary>
  );
}
