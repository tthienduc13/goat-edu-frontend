import { queries } from "@/queries/index";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllSubjects } from "./subject.api";

export const useSubjects = ({
  search = "",
  pageNumber,
  pageSize,
}: {
  search?: string;
  pageSize?: number;
  pageNumber?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["discussion", status],
    initialPageParam: pageNumber ?? 1,
    queryFn: ({ pageParam }) => getAllSubjects(search, pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    enabled: !!search,
  });
};

export const useSubjectById = (id: string, token: string) => {
  return useQuery(queries.subject.id(id, token));
};

export const useSubjectByClasses = (classes: string, token: string) => {
  return useQuery(queries.subject.classes(classes, token));
};
