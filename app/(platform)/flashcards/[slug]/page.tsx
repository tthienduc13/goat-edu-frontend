import { currentUser } from "@/lib/auth";
import { Wrapper } from "./_components/wrapper";
import Flashcard from "./_components/flashcard";
import Terms from "./_components/terms";

const FlashcardPage = async () => {
  const user = await currentUser();
  return (
    <Wrapper headerTitle="SE_Kỳ 4_PRJ321(PRJ301) (Java Web)" headerStar={4.6}>
      <div className="max-w-[900px] mx-auto flex flex-col gap-y-10">
        <Flashcard />
        <Terms />
      </div>
    </Wrapper>
  );
};

export default FlashcardPage;
