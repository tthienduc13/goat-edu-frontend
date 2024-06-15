import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  title?: string;
  label?: string;
}

export const Header = ({ title, label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <h1 className={cn("text-lg font-bold", font.className)}>{title}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
