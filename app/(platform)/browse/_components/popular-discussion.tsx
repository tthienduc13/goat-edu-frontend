import { useCurrentUser } from "@/hooks/use-current-user";
import { EmptyCard } from "./empty-card";
import { useQuery } from "@tanstack/react-query";
import { useDiscussions } from "@/app/api/discussion/discussion.query";
import { Status } from "@/types/discussion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const PopularDiscussion = () => {
  const user = useCurrentUser();
  const { data, isLoading, error } = useQuery(
    useDiscussions({
      token: user?.token!,
      pageNumber: 1,
      pageSize: 3,
      sort: "significant",
      status: Status.Approved,
    })
  );

  if (isLoading) {
    return <EmptyCard />;
  }

  if (!data || data.length === 0) {
    return;
  }

  if (error) {
    return;
  }
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-xl">Popular questions</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {data.map((data) => (
          <div
            key={data.id}
            className="w-full p-4 flex flex-col gap-y-5 border-[1px] shadow-lg rounded-2xl "
          >
            <div className="text-sm bg-secondary px-2 py-1 rounded-lg w-fit">
              {data.userAndSubject.subjectName}
            </div>
            <div className="text-sm text-muted-foreground line-clamp-2">
              {data.discussionName}
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <Avatar>
                <AvatarImage
                  src={data.userAndSubject.userImage}
                  alt="user image"
                ></AvatarImage>
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <div className="text-sm font-semibold">
                {data.userAndSubject.fullName}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
