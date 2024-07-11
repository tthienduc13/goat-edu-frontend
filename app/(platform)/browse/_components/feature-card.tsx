import Image from "next/image";
import SampleImage from "@/assets/sample2.png";
import { Feature } from "@/types/features";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface FeatureCardProps {
  data: Feature;
}

export const FeatureCard = ({ data }: FeatureCardProps) => {
  return (
    <CardContainer className="inter-var max-w-lg w-full">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {data.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
        >
          {data.des}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={data.image}
            height="1000"
            width="1000"
            className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};
