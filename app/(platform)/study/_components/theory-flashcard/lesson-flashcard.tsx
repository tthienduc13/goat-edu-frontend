import { ArrayFlashcard } from "@/app/(platform)/flashcards/[slug]/_components/array-flashcard/array-flashcard";
import { useTheoryFlashCardContentByTheory } from "@/app/api/theory-flashcard-content/theory-flashcard-content.query";
import { useTheoryByLesson } from "@/app/api/theory/theory.query";
import { FlashcardContent } from "@/types/flashcard";
import FlashcardLoading from "./flashcard-loading";
import Empty from "../empty-state";

interface LessonFlashCardProps {
  lessonName: string;
  lessonId: string;
  token: string;
}

const LessonFlashCard = ({
  lessonName,
  lessonId,
  token,
}: LessonFlashCardProps) => {
  const {
    data: theoryData,
    isLoading: theoryLoading,
    error: theoryError,
  } = useTheoryByLesson(lessonId, token);
  const {
    data: flashcardContentData,
    isLoading: flashcardLoading,
    error: flashcardError,
  } = useTheoryFlashCardContentByTheory(theoryData?.id as string, token);

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
      <h1 className="text-3xl font-semibold">{lessonName}</h1>
      <div className="w-[800px] h-[500px] ">
        <ArrayFlashcard data={data} />
      </div>
    </div>
  );
};

export default LessonFlashCard;
