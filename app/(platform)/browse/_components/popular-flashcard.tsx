import { useFlashcards } from "@/app/api/flashcard/flashcard.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card } from "../../flashcards/_components/card";

export const PopularFlashcard = () => {
  const user = useCurrentUser();
  const {
    data: flashcardsData,
    isLoading: flashcardsLoading,
    error: flascardsError,
  } = useFlashcards(1, user?.token!);
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-xl">Popular flashcard</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {flashcardsData?.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};
