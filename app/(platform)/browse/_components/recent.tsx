import { Flashcard } from "@/types/flashcard";
import { Card } from "../../flashcards/_components/card";

interface RecentViewProps {
  data?: Flashcard[];
}

export const RecentView = ({ data }: RecentViewProps) => {
  if (!data) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-xl">Recent</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {data.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};
