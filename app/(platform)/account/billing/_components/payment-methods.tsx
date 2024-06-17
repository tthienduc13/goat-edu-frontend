import { Header } from "@/app/(platform)/account/_components/header";

export const PaymentMethods = () => {
  return (
    <div className="flex flex-col w-full gap-y-6">
      <div className="flex flex-col">
        <Header
          title="Payment methods"
          label="Your bills will be sent from default method shown below"
        />
      </div>
    </div>
  );
};
