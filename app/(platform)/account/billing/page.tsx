import { Wrapper } from "../_components/wrapper";
import { CurrentSubscription } from "./_components/current-subcription";
import { Transactions } from "./_components/transactions";

const BillingSubciptionPage = () => {
  return (
    <Wrapper title="Billing & Subcription">
      <div className="flex pb-10 flex-col gap-y-10 w-full">
        <CurrentSubscription />
        <Transactions />
      </div>
    </Wrapper>
  );
};

export default BillingSubciptionPage;
