import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex p-3 border border-slate-600 border-l-4 border-l-destructive flex-row items-center rounded-[16px]">
      <ExclamationTriangleIcon className="h-6 w-6 mr-2 text-destructive" />
      <div className="flex-1  ">{message}</div>
    </div>
  );
};
