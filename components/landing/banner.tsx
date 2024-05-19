import { Highlight } from "@/components/ui/hero-highlight";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

export const Banner = () => {
  return (
    <div className="banner w-full h-full py-[82px] px-[160px] justify-center">
      <div className="py-[100px]">
        <div className="Introduction p-12">
          <div className=" pb-12">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-[560px] mb-4 leading-relaxed lg:leading-snug">
              Ghệ iu nhất hệ mặt trời,{" "}
              <Highlight className="text-black dark:text-white">
                Ghệ iu nhất hệ mặt trời.
              </Highlight>
            </h1>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-[560px]">
              2 lít, Okk ở quầy thu anh để lại 2 lít Thoải mái buôn dưa lê chẳng
              phải lo khi NOKIA anh chai Hi bitch! Khi em chào anh
            </h4>
          </div>
          <Hint label="To register page">
            <Link href="/auth/register">
              <Button className="px-[30px] py-[30px] text-base bg-[#a8b3cf14]">
                Sign up now
              </Button>
            </Link>
          </Hint>
        </div>
      </div>
    </div>
  );
};
