import { Metadata } from "next";

import ResetForm from "@/components/forms/reset-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ResetPage = () => {
  return <ResetForm />;
};

export default ResetPage;
