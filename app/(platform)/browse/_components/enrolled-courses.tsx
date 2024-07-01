import { useUserEnroll } from "@/app/api/user/user.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";
import { EmptyCard } from "./empty-card";
import { SubjectCard } from "../../subjects/_components/subject-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const EnrollCourses = () => {
  const user = useCurrentUser();

  const { data, isLoading, error } = useQuery(
    useUserEnroll({ token: user?.token!, pageNumber: 1, pageSize: 3 })
  );

  if (isLoading) {
    return <EmptyCard />;
  }

  if (!data || error || data.length === 0) {
    return;
  }
  return (
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
        {data.map((data) => (
          <SubjectCard type="continue" data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
};
