import Image from "next/image";
import SampleImage from "@/assets/sample2.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FeatureCard = () => {
  return (
    <div className="max-w-lg h-full">
      <div className="relative  overflow-hidden shadow-lg h-full rounded-2xl transition duration-200 group bg-background hover:shadow-xl border border-zinc-100 dark:border-accent ">
        <div className=" w-full h-[150px] bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden  relative">
          <Image
            src={SampleImage}
            alt="thumbnail"
            fill
            sizes="100vw 100vh"
            priority={true}
            className={`group-hover:scale-95 h-full group-hover:rounded-2xl transform object-cover transition duration-200 `}
          />
        </div>
        <div className=" p-4 flex flex-col gap-4">
          <div className="w-full flex flex-row justify-between items-center">
            <h2 className="font-bold text-lg">Name</h2>
          </div>
          <h2 className="font-normal text-sm text-muted-foreground">
            asdfasfas
          </h2>
          <div className="flex flex-row justify-between items-center ">
            <Link href={`/subjects/`}>
              <div className=" group text-blue-500 flex flex-row items-center text-sm">
                Try it now{" "}
                <ArrowRight className="h-4 cursor-pointer group-hover:translate-x-2 transition duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
