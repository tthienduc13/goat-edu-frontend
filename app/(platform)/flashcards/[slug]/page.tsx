"use client";
import { Wrapper } from "./_components/wrapper";
import Flashcard from "./_components/flashcard";
import Terms from "./_components/terms";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useFlashcardContentById } from "@/app/api/flashcard-content/flascard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";

interface FlashcardPageProps {
  params: { slug: string };
}

const FlashcardPage = ({ params: { slug } }: FlashcardPageProps) => {
  const user = useCurrentUser();

  const {
    data: flashcardContentData,
    isLoading: flashcardContentLoading,
    error: flashcardContentError,
  } = useFlashcardContentById(slug as string, user?.token!);

  const {
    data: flashcardData,
    isLoading: flashcardLoading,
    error: flashcardError,
  } = useFlashcardById(slug as string, user?.token!);

  if (flashcardContentLoading) {
    return;
  }

  if (!flashcardContentData) {
    return;
  }

  return (
    <Wrapper
      headerTitle={flashcardData?.flashcardName!}
      headerDes={flashcardData?.flashcardDescription!}
      headerStar={flashcardData?.star!}
    >
      <div className="max-w-[900px] mx-auto flex flex-col gap-y-10">
        <Flashcard data={flashcardContentData} />
        <Terms data={flashcardContentData} />
      </div>
    </Wrapper>
  );
};

export default FlashcardPage;
