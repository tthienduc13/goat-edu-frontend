import Link from "next/link";

import { SubjectCard } from "../../subjects/_components/subject-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { UserEnrollmentResponse } from "@/app/api/user/user.api";

interface EnrollCoursesPops {
  data?: UserEnrollmentResponse;
}

export const EnrollCourses = ({ data }: EnrollCoursesPops) => {
  if (!data || data.numberOfSubjectEnroll === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl">On going courses</h1>
          <Link href={"/personal?tab=courses"}>
            <Button className="group x" variant={"link"}>
              View all
              <ArrowRight className="h-4 group-hover:translate-x-2 transition-all duration-300" />
            </Button>
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.subjectEnrollment.map((data) => (
            <SubjectCard data={data} key={data.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
