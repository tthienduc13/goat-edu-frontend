import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Hint } from "@/components/custom/hint";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ArrayFlashcard } from "../../[slug]/_components/array-flashcard/array-flashcard";
import { useQuery } from "@tanstack/react-query";
import { useFlashcardContentById } from "@/app/api/flashcard-content/flascard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";
import { Skeleton } from "@/components/ui/skeleton";

interface FlashcardProps {
  id: string;
}

export const Flashcard = ({ id }: FlashcardProps) => {
  const router = useRouter();
  const user = useCurrentUser();

  const {
    data: flashcardContentData,
    isLoading: flashcardContentLoading,
    error: flashcardContentError,
  } = useQuery(useFlashcardContentById({ token: user?.token!, id: id }));

  const {
    data: flashcardData,
    isLoading: flashcardLoading,
    error: flashcardError,
  } = useQuery(useFlashcardById({ token: user?.token!, id: id }));

  const handleLeave = () => {
    router.back();
  };

  if (!flashcardContentData || !flashcardData) {
    return null;
  }

  return (
    <div className="flex flex-col w-full mx-auto gap-y-6">
      {flashcardLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <div className="flex flex-row justify-between items-center">
          <Button size={"lg"} variant={"secondary"}>
            Flashcard
          </Button>
          <div className="text-lg font-bold">{flashcardData.flashcardName}</div>
          <Hint label="Go back" side="bottom" sideOffset={10}>
            <Button onClick={handleLeave} size={"icon"} variant={"ghost"}>
              <X className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex-1 h-full w-full flex px-10 flex-col gap-y-4">
        {flashcardContentLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ArrayFlashcard data={flashcardContentData} />
        )}
      </div>
    </div>
  );
};
