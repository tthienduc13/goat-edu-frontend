import Link from "next/link";
import Image from "next/image";

import { Subject } from "@/types/subject";
import { UseQueryResult } from "@tanstack/react-query";

interface SubjectResultProps {
  result: UseQueryResult<Subject[], Error>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
// TODO: Unlock Image

export const SubjectResult = ({ result, setValue }: SubjectResultProps) => {
  if (!result.data || result.data.length === 0) {
    return;
  }
  return (
    <div className="w-full flex flex-col gap-y-3">
      <div className="w-full px-4">
        <h3 className="relative text-lg w-fit ">
          Courses
          <div className="absolute b-0 left-0 w-[50%] h-1 bg-violet-500" />
        </h3>
      </div>
      <div className="flex flex-col gap-y-3">
        {result.data?.map((subject) => (
          <Link
            href={
              subject.isEnroll
                ? `/study/${subject.id}`
                : `/subjects/${subject.id}`
            }
            onClick={() => setValue("")}
            key={subject.id}
            className="flex px-5 py-1 flex-col gap-y-1 hover:bg-secondary"
          >
            <div className="flex flex-row w-full justify-between items-center">
              <div className="text-base cursor-pointer font-medium">
                {subject.subjectName}
              </div>
              <span className="text-muted-foreground text-[10px]">
                {subject.subjectCode}
              </span>
            </div>
            <div className="">
              <div className="text-sm text-muted-foreground line-clamp-2">
                {subject.information}
              </div>

              {/* <div className="w-[20%] relative h-[100px]">
                <Image
                  src={subject.image ?? ""}
                  fill
                  alt="subject image"
                  className="object-contain"
                />
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
