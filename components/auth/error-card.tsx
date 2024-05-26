import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops...Something went wrong :'("
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonColor="white"
      isPending={false}
    >
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />
      </div>
    </CardWrapper>
  );
};
