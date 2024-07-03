import { Lesson } from "@/types/lesson";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface SideLessonListProps {
  lesson: Lesson;
  handleOnClick: (value: string, id: string, name: string) => void;
  source: {
    theory: string;
    theoryFlashcard: string;
    quiz: string;
  };
}

const SideLessonList = ({
  lesson,
  handleOnClick,
  source,
}: SideLessonListProps) => {
  return (
    <Accordion key={lesson.id} type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-left">
          {lesson.lessonName}
        </AccordionTrigger>
        <AccordionContent>
          <Button
            onClick={() =>
              handleOnClick(source.theory, lesson.id, lesson.lessonName)
            }
            variant={"link"}
          >
            Theory
          </Button>
        </AccordionContent>
        <AccordionContent>
          <Button
            onClick={() =>
              handleOnClick(
                source.theoryFlashcard,
                lesson.id,
                lesson.lessonName
              )
            }
            variant={"link"}
          >
            Flashcard
          </Button>
        </AccordionContent>
        <AccordionContent>
          <Button
            onClick={() =>
              handleOnClick(source.quiz, lesson.id, lesson.lessonName)
            }
            variant={"link"}
          >
            Quiz
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default SideLessonList;
