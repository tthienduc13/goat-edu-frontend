import { useTheoryFlashCardContentByTheory } from "@/app/api/theory-flashcard-content/theory-flashcard-content.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQueries, useQuery } from "@tanstack/react-query";
import Empty from "../empty-state";
import FlashcardLoading from "./flashcard-loading";
import { FlashcardContent } from "@/types/flashcard";
import { ArrayFlashcard } from "@/app/(platform)/flashcards/[slug]/_components/array-flashcard/array-flashcard";
import { useTheoryByLesson } from "@/app/api/theory/theory.query";

interface LessonFlashcardProps {
  lessonId: string;
}

export const LessonFlashcard = ({ lessonId }: LessonFlashcardProps) => {
  const user = useCurrentUser();

  const {
    data: theoryData,
    isLoading: theoryLoading,
    error: theoryError,
  } = useQuery(useTheoryByLesson({ token: user?.token!, lessonId: lessonId }));
  const {
    data: flashcardContentData,
    isLoading: flashcardLoading,
    error: flashcardError,
  } = useQuery(
    useTheoryFlashCardContentByTheory({
      token: user?.token!,
      theoryId: theoryData?.id!,
    })
  );

  if (theoryLoading || flashcardLoading) {
    return <FlashcardLoading />;
  }
  if (
    !flashcardContentData ||
    !Array.isArray(flashcardContentData) ||
    flashcardContentData.length === 0
  ) {
    return <Empty />;
  }

  const data: FlashcardContent[] = flashcardContentData.map((flashcard) => ({
    id: flashcard.id,
    frontHTML: flashcard.question,
    backHTML: flashcard.answer,
  }));

  return (
    <div className="w-full space-y-4">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-[500px] ">
          <ArrayFlashcard data={data} />
        </div>
      </div>
    </div>
  );
};
