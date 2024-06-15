import { Header } from "../_components/header";
import { Wrapper } from "../_components/wrapper";
import { CurrentSubcription } from "./_components/current-subcription";
import { PaymentMethods } from "./_components/payment-methods";

const BillingSubciptionPage = () => {
  return (
    <Wrapper title="Billing & Subcription">
      <div className="flex pb-10 flex-col gap-y-10 w-full">
        <CurrentSubcription />
        <PaymentMethods />
      </div>
    </Wrapper>
  );
};

export default BillingSubciptionPage;
