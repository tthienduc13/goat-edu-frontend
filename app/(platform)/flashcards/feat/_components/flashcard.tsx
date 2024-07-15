import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Hint } from "@/components/custom/hint";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ArrayFlashcard } from "../../[slug]/_components/array-flashcard/array-flashcard";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useFlashcardContentById } from "@/app/api/flashcard-content/flashcard-content.query";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";
import { PageLoading } from "./page-loading";
import Error from "@/app/error";

interface FlashcardProps {
  id: string;
}

export const Flashcard = ({ id }: FlashcardProps) => {
  const router = useRouter();
  const user = useCurrentUser();

  const queriesResult = useQueries({
    queries: [
      useFlashcardById({ token: user?.token!, id: id }),
      useFlashcardContentById({ token: user?.token!, id: id }),
    ],
  });

  const isLoading = queriesResult.some((query) => query.isLoading);
  const isError = queriesResult.some((query) => query.error);

  const handleLeave = () => {
    router.back();
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return Error();
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px-64px)] mx-auto gap-y-6">
      <div className="flex flex-row justify-between items-center">
        <Button size={"lg"} variant={"secondary"}>
          Flashcard
        </Button>
        <div className="text-lg font-bold">
          {queriesResult[0].data?.flashcardName}
        </div>
        <Hint label="Go back" side="bottom" sideOffset={10}>
          <Button onClick={handleLeave} size={"icon"} variant={"ghost"}>
            <X className="h-4 w-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex-1 h-full w-full flex px-10 flex-col gap-y-4">
        <ArrayFlashcard data={queriesResult[1].data} />
      </div>
    </div>
  );
};
