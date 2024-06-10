import { ContainerScroll } from "@/components/ui/container-scroll-animation";

import Image from "next/image";
import SampleImage from "@/assets/sample2.png";

export const IpadScroll = () => {
  return (
    <div className="flex flex-col gap-y-10 overflow-hidden">
      <ContainerScroll>
        <Image
          src={SampleImage}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};
