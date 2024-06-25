import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useSaveStatusStore from "@/stores/useSaveStatusStore";

export const EditFlashcardForm = () => {
  const { saveStatus } = useSaveStatusStore();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full flex flex-col gap-y-5">
        <div className="rounded-xl  overflow-hidden flex flex-row items-center px-4">
          <Input
            value={" abc"}
            className="flex h-16 shadow-none border-none outline-none focus-visible:ring-0 flex-col w-full text-5xl font-bold "
          />
        </div>
        <div className="w-full flex flex-row gap-x-5">
          <div className=" w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
            <Textarea
              value={"def"}
              className="flex border-none outline-none focus-visible:ring-0 flex-col w-full text-base text-muted-foreground"
            />
          </div>
          <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
            <div className="flex flex-col w-full text-muted-foreground cursor-none">
              {/* {flashcardData?.subjectName} */}
              agg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
