import { CreateFlashcardContentForm } from "./_components/create-flashcard-content-form";

const CreateFlashcardPage = () => {
  return (
    <div className="flex w-full  flex-col gap-y-10 p-8 min-h-[calc(100vh-64px)]">
      <CreateFlashcardContentForm />
    </div>
  );
};

export default CreateFlashcardPage;
