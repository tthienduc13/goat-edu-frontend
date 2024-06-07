import { Wrapper } from "./wrapper";

const sampleCardData: Array<{ frontSide: string; backSide: string }> = [
  {
    frontSide: "What is the biggest contry",
    backSide: "Paris",
  },
  {
    frontSide: "What is the largest ocean in the world?",
    backSide: "Pacific Ocean",
  },
  {
    frontSide: 'Who is the author of "To Kill a Mockingbird"?',
    backSide: "Harper Lee",
  },
  {
    frontSide: "What is the formula for the area of a circle? adsfasdfasf",
    backSide: "A = π * r^2",
  },
  {
    frontSide: "What is the tallest mountain in the world?",
    backSide: "Mount Everest",
  },
];

const Terms = () => {
  return (
    <Wrapper headerTitle="Terms in this sets">
      <div className="flex flex-col gap-y-2">
        {sampleCardData.map((card) => (
          <div
            key={card.frontSide}
            className="py-4 flex flex-row rouded-lg divide-x-[1px] bg-secondary/40"
          >
            <div className="w-[60%] px-4">{card.frontSide}</div>
            <div className="w-[40%] px-4">{card.backSide}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Terms;
