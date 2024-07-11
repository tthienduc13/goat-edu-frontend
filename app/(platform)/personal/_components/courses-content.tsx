import { useUserEnroll } from "@/app/api/user/user.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { SubjectCard } from "../../subjects/_components/subject-card";
import EmptyCourse from "@/public/icons/empty/empty-course.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/enhanced-button";

export const CoursesContent = () => {
  const user = useCurrentUser();
  const { data, isLoading, error } = useQuery(
    useUserEnroll({ token: user?.token!, pageNumber: 1, pageSize: 100 })
  );

  if (isLoading) {
    <div className="h-[500px] flex flex-col justify-center items-center gap-y-10">
      <LoaderCircle className="h-10 w-10 animate-spin" />
      <div>Loading discussions</div>
    </div>;
  }

  if (!data?.subjectEnrollment || data.numberOfSubjectEnroll === 0) {
    return (
      <div className="h-[500px] flex flex-col justify-center items-center gap-y-10">
        <Image src={EmptyCourse} alt="No courses" width={350} />
        <Link href="/subject">
          <Button variant={"gooeyLeft"} size="lg">
            Discover courses
          </Button>
        </Link>
      </div>
    );
  }

  if (error || !data) {
    return;
  }
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
      {data.subjectEnrollment.map((data) => (
        <SubjectCard data={data} key={data.id} />
      ))}
    </div>
  );
};
