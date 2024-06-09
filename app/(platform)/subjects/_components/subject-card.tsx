import sampleImage from "@/assets/sample2.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Subject } from "@/types/subject";
import Image from "next/image";
import Link from "next/link";

interface SubjectCardProps {
  data: Subject;
}

export const SubjectCard = ({ data }: SubjectCardProps) => {
  const colors = [
    "#DC2626",
    "#D97706",
    "#059669",
    "#7C3AED",
    "#7F9CF5",
    "#FBBF24",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  const backgroundOpacity = 0.2;
  const randomColorWithOpacity = `${randomColor}${Math.round(
    backgroundOpacity * 255
  )
    .toString(16)
    .toUpperCase()}`;
  return (
    <div className="max-w-lg h-full">
      <div className="relative  overflow-hidden shadow-lg h-full rounded-2xl transition duration-200 group bg-background hover:shadow-xl border border-zinc-100 dark:border-accent ">
        <div className=" w-full h-[180px] bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden  relative">
          <Image
            src={sampleImage}
            alt="thumbnail"
            fill
            sizes="100vw 100vh"
            priority={true}
            className={`group-hover:scale-95 h-full group-hover:rounded-2xl transform object-cover transition duration-200 `}
          />
        </div>
        <div className=" p-4 flex flex-col gap-4">
          <div className="w-full flex flex-row justify-between items-center">
            <h2 className="font-bold text-lg  ">{data.subjectName}</h2>
            <div className="flex flex-row items-center gap-x-4">
              <div className="text-sm text-muted-foreground">
                {data.numberOfChapters}{" "}
                {data.numberOfChapters > 1 ? "chapters" : "chapter"}
              </div>
              <Button
                style={{
                  color: randomColor,
                  backgroundColor: randomColorWithOpacity,
                  fontSize: 12,
                }}
                size={"code"}
              >
                {data.subjectCode}
              </Button>
            </div>
          </div>
          <h2 className="font-normal text-sm text-muted-foreground">
            {data.information}
          </h2>
          <div className="flex flex-row justify-between items-center ">
            <span className="text-sm text-muted-foreground">
              {new Date(data.creatAt).toLocaleDateString()}
            </span>
            <Link href={`/subjects/${data.id}`}>
              <Button className="font-semibold">Enroll now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
