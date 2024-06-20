import { Header } from "@/app/(platform)/account/_components/header";

export const Transactions = () => {
  return (
    <div className="flex flex-col w-full gap-y-6">
      <div className="flex flex-col">
        <Header title="Transactions" label="Your history is shown below here" />
      </div>
    </div>
  );
};
