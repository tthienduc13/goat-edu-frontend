import { Highlight } from "@/components/ui/hero-highlight";
import { Boxes } from "../ui/background-boxes";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TextRevealCard } from "../ui/text-reveal-card";

const words = `2 lít, Okk ở quầy thu anh để lại 2 lít Thoải mái buôn dưa lê chẳng phải
lo khi NOKIA anh chai Hi bitch! Khi em chào anh`;

export const Banner = () => {
  return (
    <div className=" w-full h-[calc(100vh-64px)] relative overflow-hidden flex flex-col items-start justify-center">
      <Boxes />
      <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <h1 className=" ml-[100px] z-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-[560px] mb-4 leading-relaxed lg:leading-snug">
        <TextRevealCard
          text="Ghệ iu nhất hệ mặt trời."
          revealText="Ghệ iu nhất hệ mặt trăng."
        ></TextRevealCard>
        <Highlight className="text-black dark:text-white">
          Ghệ iu nhất hệ mặt trời.
        </Highlight>
      </h1>
      <h4 className="ml-[100px] mb-20 z-20 text-xl font-semibold tracking-tight w-[560px]">
        <TextGenerateEffect words={words} />
      </h4>
    </div>
  );
};
