import { useForm } from "react-hook-form";
import { Header } from "./header";

export const AccountInformation = () => {
  return (
    <div className="w-full flex flex-col gap-y-6">
      <Header title="Account Information" />
      <div>Avatar change here</div>
    </div>
  );
};
