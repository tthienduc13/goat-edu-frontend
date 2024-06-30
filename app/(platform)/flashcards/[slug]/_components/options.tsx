import {
  Brain,
  ClipboardPenLine,
  Copy,
  GalleryHorizontalEnd,
} from "lucide-react";

const OptionList = [
  { name: "Learn", icon: Brain },
  { name: "Flashcard", icon: GalleryHorizontalEnd },
  { name: "Test", icon: ClipboardPenLine },
  { name: "Match", icon: Copy },
];

export const Options = () => {
  return (
    <div className="max-w-[160px] w-full flex flex-col gap-y-4">
      {OptionList.map((item, index) => (
        <div
          key={index}
          className="px-5 w-full cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 hover:border-b-violet-500 hover:border-b-4 rounded-xl shadow-lg border-2 border-b-4 py-4 flex flex-row items-center gap-x-2 "
        >
          <item.icon className="h-5 w-5" />
          <div className="text-base font-medium">{item.name}</div>
        </div>
      ))}
    </div>
  );
};
