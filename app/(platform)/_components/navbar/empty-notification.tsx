import { CheckIcon } from "@/components/icons/check-icon";

export const EmptyNotification = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4 h-[250px]">
      <CheckIcon />
      <div className="text-sm">You&apos;re up to date!</div>
    </div>
  );
};
