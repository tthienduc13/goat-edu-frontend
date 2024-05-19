import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const stickyRollContent = [
  {
    title: "Knowledge summary system",
    description:
      "Our comprehensive knowledge summary system offers a structured and organized approach to accessing information. It involves meticulous categorization based on subject matter, followed by the division of content into chapters and further subcategorization into specific topics. This hierarchical arrangement ensures that knowledge is easily navigable, allowing users to efficiently explore and grasp relevant information within a well-defined framework.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Post a question and participate in the discussion",
    description:
      "At Goat.edu, we foster a collaborative learning environment where you not only have the opportunity to obtain answers to your specific questions from other students, but also to actively contribute and share your own knowledge by providing answers to questions posed by fellow students and everyone has the chance to both seek and offer valuable insights.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Integrated with advanced AI models",
    description:
      "Our top priority is to promptly respond to your inquiries with utmost efficiency and brevity. We recognize the value of your time and strive to provide swift, concise, and accurate answers to your questions, ensuring a seamless and satisfying experience as we address your inquiries promptly and with utmost clarity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Flashcards for studying help you remember quickly",
    description:
      "With Goat.edu's comprehensive multi-platform support, we empower learners to embark on their educational journey anytime and anywhere, ensuring the flexibility and convenience necessary for seamless learning across various devices and locations.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];
export const Stickyscroll = () => {
  return <StickyScroll content={stickyRollContent} />;
};
