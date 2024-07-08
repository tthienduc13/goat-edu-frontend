import { EmptyCard } from "./empty-card";

export const PageLoading = () => {
  return (
    <div className="w-full flex flex-col gap-y-12">
      {Array.from({ length: 3 }).map((_, index) => (
        <EmptyCard key={index} />
      ))}
    </div>
  );
};
