import { useFlashcards } from "@/app/api/flashcard/flashcard.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card } from "../../flashcards/_components/card";
import { FeatureCard } from "./feature-card";

export const Features = () => {
  const user = useCurrentUser();
  const {
    data: flashcardsData,
    isLoading: flashcardsLoading,
    error: flascardsError,
  } = useFlashcards(1, user?.token!);
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-xl">Try these updated features</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-5">
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
      </div>
    </div>
  );
};
