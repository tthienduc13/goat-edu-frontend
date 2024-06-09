"use client";
import { useSubjectByClasses } from "@/app/api/subject/subject.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SubjectLoading } from "./_components/subject-loading";
import { SubjectCard } from "./_components/subject-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SubjectPage = () => {
  const user = useCurrentUser();

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
      {[
        { className: "Class 1", title: "Class 10", data: data10 },
        { className: "Class 2", title: "Class 11", data: data11 },
        { className: "Class 3", title: "Class 12", data: data12 },
      ].map(({ className, title, data }) => (
        <div key={className} className="flex flex-col gap-y-10">
          <div className="w-full flex flex-row justify-between items-center">
            <h2 className=" text-3xl font-bold ">{title}</h2>
            <Link href={`/subject/${className}`}>
              <Button variant={"link"}>View more</Button>
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.map((data) => (
              <div key={data.id}>
                <SubjectCard data={data} />
              </div>
            ))}
          </div>
        </div>
      ))}
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
