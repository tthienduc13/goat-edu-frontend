import { useUserEnroll } from "@/app/api/user/user.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { SubjectCard } from "../../subjects/_components/subject-card";

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

  if (error || !data) {
    return;
  }
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
      {data.subjectEnrollMent.map((data) => (
        <SubjectCard type="continue" data={data} key={data.id} />
      ))}
    </div>
  );
};
