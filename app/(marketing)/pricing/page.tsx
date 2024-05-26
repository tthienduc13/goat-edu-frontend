"use client";

import { Introduction } from "./_components/introduction";
import { Plans } from "./_components/plans";

const PricingPage = () => {
  return (
    <main className="w-full max-w-[1200px]">
      <Introduction />
      <Plans />
    </main>
  );
};

export default PricingPage;
