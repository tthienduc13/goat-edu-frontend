"use server";

import { DiscussedCard } from "./_components/discussed-card";

const DiscussedPage = () => {
  return (
    <div className="w-[1000px] h-full grid grid-cols-1 divide-y-[1px] border-y-[1px] mx-auto">
      <DiscussedCard />
    </div>
  );
};

export default DiscussedPage;
