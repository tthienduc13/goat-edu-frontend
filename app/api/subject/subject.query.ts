import { queries } from "@/queries/index";
import { useQuery } from "@tanstack/react-query";
import { getAllSubjects } from "./subject.api";

export const useSubjects = ({
  token,
  sort,
  search,
  pageNumber,
  pageSize,
}: {
  token: string;
  sort: string;
  search: string;
  pageNumber: number;
  pageSize: number;
}) => {
  const queryKey = ["subject", sort, search, pageNumber, pageSize];
  const queryFn = async () => {
    return getAllSubjects({
      token: token,
      sort: sort,
      search: search,
      pageNumber: pageNumber,
      pageSize: pageSize,
    });
  };

  return { queryKey, queryFn };
};

export const useSearchSubject = ({
  token,
  search,
  pageNumber,
  pageSize,
}: {
  token: string;
  search: string;
  pageNumber: number;
  pageSize: number;
}) => {
  const queryKey = ["subject", search, pageNumber, pageSize];
  const queryFn = async () => {
    return getAllSubjects({
      token: token,
      search: search,
      pageNumber: pageNumber,
      pageSize: pageSize,
    });
  };
  const enabled = !!search;

  return { queryKey, queryFn, enabled };
};
export const useSubjectById = (id: string, token: string) => {
  return useQuery(queries.subject.id(id, token));
};

export const useSubjectByClasses = (
  classes: string,
  token: string,
  pageSize: number,
  pageNumber: number
) => {
  return useQuery(
    queries.subject.classes(classes, token, pageSize, pageNumber)
  );
};
