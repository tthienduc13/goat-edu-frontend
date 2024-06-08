"use client";
import {
  useSubjectByClasses,
  useSubjects,
} from "@/app/api/subject/subject.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Subject } from "@/types/subject";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubjectLoading } from "./_components/subject-loading";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SubjectByClass } from "./_components/subject-by-class";

const SubjectPage = () => {
  const user = useCurrentUser();
  // const { data, isLoading, error } = useSubjects(token);
  // const [subject, setSubject] = useState<Subject[]>([]);
  const classes = {
    class10: "Class 1",
    class11: "Class 2",
    class12: "Class 3",
  };
  const {
    data: data10,
    isLoading: isLoading10,
    error: error10,
  } = useSubjectByClasses(classes.class10, user?.token!);
  const {
    data: data11,
    isLoading: isLoading11,
    error: error11,
  } = useSubjectByClasses(classes.class11, user?.token!);
  const {
    data: data12,
    isLoading: isLoading12,
    error: error12,
  } = useSubjectByClasses(classes.class12, user?.token!);
  console.log(data10);
  if (isLoading10 || isLoading11 || isLoading12) {
    return (
      <div className="flex flex-col w-full gap-y-8">
        <SubjectLoading />
        <SubjectLoading />
        <SubjectLoading />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full gap-y-8">
      <div className="class-10">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Class 10
        </h2>
        <div className="w-full grid gap-y-4 grid-cols-4">
          {data10?.map((data) => (
            <div key={data.id} className="w-[280px] p-4 shadow-xl rounded-2xl">
              <SubjectByClass data={data} />
            </div>
          ))}
        </div>
      </div>
      <div className="class-11">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Class 11
        </h2>
        <div className="w-full grid gap-y-4 grid-cols-4">
          {data11?.map((data) => (
            <div key={data.id} className="w-[280px] p-4 shadow-xl rounded-2xl">
              <SubjectByClass data={data} />
            </div>
          ))}
        </div>
      </div>
      <div className="class-12">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Class 12
        </h2>
        <div className="w-full grid gap-y-4 grid-cols-4">
          {data12?.map((data) => (
            <div key={data.id} className="w-[280px] p-4 shadow-xl rounded-2xl">
              <SubjectByClass data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
{
  /* <h2 className="scroll-m-20 my-4 text-3xl font-semibold tracking-tight first:mt-0">
          Class 10
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {data10?.map((data) => (
            <div key={data.id} className="flex flex-col ">
              <img
                src={data.image}
                width={280}
                height={150}
                alt="Subject Image"
                className="rounded-2xl"
              />
              <h4 className="scroll-m-20 mt-2 text-xl font-semibold tracking-tight">
                {data.subjectName}
              </h4>
            </div>
          ))}
        </div>
        <h2 className="scroll-m-20  my-4 text-3xl font-semibold tracking-tight first:mt-0">
          Class 11
        </h2>
        <div className="grid grid-cols-4 ">
          {data11?.map((data) => (
            <div key={data.id} className="flex flex-col  ">
              <Link key={data.id} href={`/subject/${data.id}`}>
                <img
                  src={data.image}
                  width={250}
                  height={150}
                  alt="Subject Image"
                  className="rounded-2xl"
                />
              </Link>
              <Link key={data.id} href={`/subject/${data.id}`}>
                <h4 className="scroll-m-20 mt-2 text-xl font-semibold tracking-tight">
                  {data.subjectName}
                </h4>
              </Link>
            </div>
          ))}
        </div>
        <h2 className="scroll-m-20 my-4 text-3xl font-semibold tracking-tight first:mt-0">
          Class 12
        </h2>
        <div className="grid grid-cols-4 ">
          {data12?.map((data) => (
            <div key={data.id} className="flex flex-col  ">
              <img
                src={data.image}
                width={250}
                height={150}
                alt="Subject Image"
                className="rounded-2xl"
              />
              <h4 className="scroll-m-20 mt-2 text-xl font-semibold tracking-tight">
                {data.subjectName}
              </h4>
            </div>
          ))}
        </div> */
}
