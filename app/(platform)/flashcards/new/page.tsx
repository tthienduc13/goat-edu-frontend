import { CreateForm } from "./_components/create-form";
import { FlashcardArray } from "./_components/flashcard-array";

const CreateFlashcardPage = () => {
  return (
    <div className="flex w-full  flex-col gap-y-10 p-8 min-h-[calc(100vh-64px)]">
      <CreateForm />
      <FlashcardArray />
    </div>
  );
};

export default CreateFlashcardPage;
