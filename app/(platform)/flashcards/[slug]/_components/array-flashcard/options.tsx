import {
  Brain,
  ClipboardPenLine,
  Copy,
  GalleryHorizontalEnd,
  Lock,
} from "lucide-react";

import { Hint } from "@/components/custom/hint";
import Link from "next/link";
const OptionList = [
  {
    name: "Flashcard",
    icon: GalleryHorizontalEnd,
    isDeveloped: false,
    type: "flashcard",
  },
  { name: "Learn", icon: Brain, isDeveloped: true },
  { name: "Test", icon: ClipboardPenLine, isDeveloped: true },
  { name: "Match", icon: Copy, isDeveloped: true },
];

interface OptionsProps {
  id: string;
}

export const Options = ({ id }: OptionsProps) => {
  return (
    <div className="max-w-[160px] w-full flex flex-col gap-y-5">
      {OptionList.map((item, index) => (
        <div key={index}>
          {item.isDeveloped ? (
            <Hint label="Comming soon" side="bottom" sideOffset={10}>
              <div className="px-5 w-full  relative cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 hover:border-b-violet-500 hover:border-b-4 rounded-xl shadow-lg border-2 border-b-4 py-4 flex flex-row items-center gap-x-2 ">
                <item.icon className="h-5 w-5" />
                <div className="text-base font-medium">{item.name}</div>

                {item.isDeveloped && (
                  <div className="absolute border-[0.5px] bg-white dark:bg-[#a8b3cf14] -top-3 -left-3 shadow-2xl flex justify-center items-center h-8 w-8  rounded-full">
                    <Lock className="h-4 font-bold " />
                  </div>
                )}
              </div>
            </Hint>
          ) : (
            <Link href={`/flashcards/feat?type=${item.type}&id=${id}`}>
              <div className="px-5 w-full  relative cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 hover:border-b-violet-500 hover:border-b-4 rounded-xl shadow-lg border-2 border-b-4 py-4 flex flex-row items-center gap-x-2 ">
                <item.icon className="h-5 w-5" />
                <div className="text-base font-medium">{item.name}</div>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
