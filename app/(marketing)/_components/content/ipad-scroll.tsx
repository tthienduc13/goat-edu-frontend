import { ContainerScroll } from "@/components/ui/container-scroll-animation";

import Image from "next/image";
import ScreenShot from "@/public/images/screenshot.jpeg";

export const IpadScroll = () => {
  return (
    <div className="flex flex-col gap-y-10 overflow-hidden">
      <ContainerScroll>
        <Image
          src={ScreenShot}
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
