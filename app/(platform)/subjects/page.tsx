"use client";
import { useSubjectByClasses } from "@/app/api/subject/subject.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SubjectLoading } from "./_components/subject-loading";
import { SubjectCard } from "./_components/subject-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Subject } from "@/types/subject";

interface ClassData {
  className: "Class 1" | "Class 2" | "Class 3";
  title: string;
  data: Subject[];
}

const SubjectPage = () => {
  const user = useCurrentUser();

  const className = {
    class10: "Class 1",
    class11: "Class 2",
    class12: "Class 3",
  };
  const {
    data: data10 = [],
    isLoading: isLoading10,
    error: error10,
  } = useSubjectByClasses(className.class10, user?.token!);
  const {
    data: data11 = [],
    isLoading: isLoading11,
    error: error11,
  } = useSubjectByClasses(className.class11, user?.token!);
  const {
    data: data12 = [],
    isLoading: isLoading12,
    error: error12,
  } = useSubjectByClasses(className.class12, user?.token!);

  const [showAll, setShowAll] = useState<{
    [key in ClassData["className"]]: boolean;
  }>({
    "Class 1": false,
    "Class 2": false,
    "Class 3": false,
  });
  const handleViewMore = (className: ClassData["className"]) => {
    setShowAll((prev) => ({ ...prev, [className]: !prev[className] }));
  };

  const classes: ClassData[] = [
    { className: "Class 1", title: "Class 10", data: data10 },
    { className: "Class 2", title: "Class 11", data: data11 },
    { className: "Class 3", title: "Class 12", data: data12 },
  ];

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
      {classes.map(({ className, title, data }) => (
        <div key={className} className="flex flex-col gap-y-10">
          <div className="w-full flex flex-row justify-between items-center">
            <h2 className=" text-3xl font-bold ">{title}</h2>
            <Button variant={"link"} onClick={() => handleViewMore(className)}>
              {showAll[className] ? "View less" : "View more"}
            </Button>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(showAll[className] ? data! : data!.slice(0, 3)).map((data) => (
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
