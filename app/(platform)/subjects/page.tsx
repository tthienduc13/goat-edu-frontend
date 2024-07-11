"use client";
import { useSubjectByClasses } from "@/app/api/subject/subject.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SubjectLoading } from "./_components/subject-loading";
import { SubjectCard } from "./_components/subject-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Subject } from "@/types/subject";
import { useQueries } from "@tanstack/react-query";
import Error from "@/app/error";

interface ClassData {
  className: "Class 10" | "Class 11" | "Class 12";
  data: Subject[];
  isLoading: boolean;
}

const SubjectPage = () => {
  const user = useCurrentUser();
  const less = 3;
  const more = 100;
  const [showAll, setShowAll] = useState<{
    [key in ClassData["className"]]: number;
  }>({
    "Class 10": less,
    "Class 11": less,
    "Class 12": less,
  });

  const {
    data: data10 = [],
    isLoading: isLoading10,
    error: error10,
  } = useSubjectByClasses("Class 10", user?.token!, showAll["Class 10"], 1);
  const {
    data: data11 = [],
    isLoading: isLoading11,
    error: error11,
  } = useSubjectByClasses("Class 11", user?.token!, showAll["Class 11"], 1);
  const {
    data: data12 = [],
    isLoading: isLoading12,
    error: error12,
  } = useSubjectByClasses("Class 12", user?.token!, showAll["Class 12"], 1);

  const handleViewMore = (className: ClassData["className"], size: number) => {
    setShowAll((prevShowAll) => ({
      ...prevShowAll,
      [className]: size,
    }));
  };
  const classes: ClassData[] = [
    { className: "Class 10", data: data10, isLoading: isLoading10 },
    { className: "Class 11", data: data11, isLoading: isLoading11 },
    { className: "Class 12", data: data12, isLoading: isLoading12 },
  ];

  if (error10 || error12 || error11) {
    Error();
  }
  return (
    <div className="flex flex-col w-full gap-y-8">
      {classes.map(({ className, data, isLoading }) => {
        if (isLoading) {
          return <SubjectLoading key={className} />;
        }
        return (
          <div key={className} className="flex flex-col gap-y-10">
            <div className="w-full flex flex-row justify-between items-center">
              <h2 className=" text-3xl font-bold ">{className}</h2>
              <Button
                variant={"link"}
                onClick={() => {
                  showAll[className] == less
                    ? handleViewMore(className, more)
                    : handleViewMore(className, less);
                }}
              >
                {showAll[className] == less ? "View more" : "View less"}
              </Button>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data!.map((data) => (
                <div key={data.id}>
                  <SubjectCard data={data} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectPage;
