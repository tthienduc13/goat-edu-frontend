import { Feature } from "@/types/features";
import RichText from "@/public/images/featrures/rich-text.svg";
import Result from "@/public/images/featrures/result.svg";
import GlobalSearch from "@/public/images/featrures/global-search.svg";

export const FeaturesData: Feature[] = [
  {
    id: 1,
    name: "More powerful search",
    des: "Find flashcards on any subject you need to learn, discuss about",
    image: GlobalSearch,
    backgroundColor: "70C3FF",
  },
  {
    id: 2,
    name: "Rich text support",
    des: "Bold, underline, italicize, and highlight text in different discussions",
    image: RichText,
    backgroundColor: "FF837B",
  },
  {
    id: 3,
    name: "Improve your results with quiz",
    des: "Learn with improved questions, challenge yourself, more controls and hints",
    image: Result,
    backgroundColor: "FFE9C8",
  },
];
