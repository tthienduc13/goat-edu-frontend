import Link from "next/link";
import Image from "next/image";
import EmptyDiscussion from "@/public/icons/empty/empty-discussion.svg";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useUserDiscussions } from "@/app/api/discussion/discussion.query";
import { useQuery } from "@tanstack/react-query";
import { Filter, LoaderCircle } from "lucide-react";
import { Discussion, Status } from "@/types/discussion";
import { isToday, isYesterday } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LatexRenderer } from "@/lib/latext-render";

const groupDiscussions = (discussions: Discussion[]) => {
  const today: Discussion[] = [];
  const yesterday: Discussion[] = [];
  const longTimeAgo: Discussion[] = [];

  discussions.forEach((discussion) => {
    const updatedAt = new Date(discussion.createdAt);
    if (isToday(updatedAt)) {
      today.push(discussion);
    } else if (isYesterday(updatedAt)) {
      yesterday.push(discussion);
    } else {
      longTimeAgo.push(discussion);
    }
  });

  return { today, yesterday, longTimeAgo };
};

type FilterType = "approved" | "unapproved" | "vac" | "all";

export const DiscussionsContent = () => {
  const user = useCurrentUser();
  const [filter, setFilter] = useState<FilterType>("all");

  const { queryFn, queryKey } = useUserDiscussions({
    token: user?.token!,
    pageNumber: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
    refetchOnMount: true,
  });

  if (isLoading) {
    return (
      <div className="h-[500px] flex flex-col justify-center items-center gap-y-10">
        <LoaderCircle className="h-10 w-10 animate-spin" />
        <div>Loading discussions</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[500px] flex flex-col justify-center items-center gap-y-10">
        <Image src={EmptyDiscussion} alt="No discussions" width={350} />
        <Link href="/create-discussion">
          <Button size="lg">Create your first discussion</Button>
        </Link>
      </div>
    );
  }

  const filteredData =
    filter === "all"
      ? data
      : data.filter((discussion) => discussion.status.toLowerCase() === filter);

  const { today, yesterday, longTimeAgo } = groupDiscussions(filteredData);

  const renderDiscussion = (discussions: Discussion[], label: string) => (
    <>
      {discussions.length > 0 && (
        <>
          <div className="flex flex-row items-center gap-x-5">
            <div className="text-2xl inline-block font-bold">{label}</div>
            <div className="h-[1px] bg-primary w-full"></div>
          </div>
          <div className="flex flex-col gap-y-5">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className={cn(
                  "relative w-full transition-all duration-300 transform hover:-translate-y-2 rounded-xl shadow-lg border-2 px-5 py-4 flex flex-col gap-y-2",
                  discussion.status === Status.Approved &&
                    "hover:border-b-emerald-500",
                  discussion.status === Status.Vac &&
                    "hover:border-b-destructive",
                  discussion.status === Status.Unapproved &&
                    "hover:border-b-yellow-500"
                )}
              >
                <div className="flex flex-row justify-between items-center">
                  <Link
                    href={`/discussed/${discussion.id}`}
                    className="text-lg font-semibold w-4/5"
                  >
                    {discussion.discussionName}
                  </Link>
                  <div
                    className={cn(
                      "font-semibold rounded-md px-3 py-2 text-sm",
                      discussion.status === Status.Approved &&
                        "text-emerald-500 bg-emerald-500/15",
                      discussion.status === Status.Vac &&
                        "text-destructive bg-destructive/15",
                      discussion.status === Status.Unapproved &&
                        "text-yellow-500 bg-yellow-500/15"
                    )}
                  >
                    {discussion.status}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-sm w-full font-light text-muted-foreground line-clamp-4">
                    <LatexRenderer latex={discussion.discussionBodyHtml} />
                  </div>
                  {discussion.discussionImage && (
                    <div className="relative w-[calc(20%-30px)]">
                      <Image
                        src={discussion.discussionImage}
                        alt="Discussion"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="w-full flex flex-col gap-y-3">
      <div className="w-full flex justify-end">
        <Select
          value={filter}
          onValueChange={(value: FilterType) => setFilter(value)}
        >
          <SelectTrigger className="w-fit h-fit px-4 py-2 shadow-none focus-visible:ring-0">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue
              className="text-sm"
              placeholder={filter.charAt(0).toUpperCase() + filter.slice(1)}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="unapproved">Unapproved</SelectItem>
              <SelectItem value="vac">VAC</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-y-10">
        {renderDiscussion(today, "Today")}
        {renderDiscussion(yesterday, "Yesterday")}
        {renderDiscussion(longTimeAgo, "Longtime")}
      </div>
    </div>
  );
};
