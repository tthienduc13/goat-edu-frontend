import { queries } from "@/queries/index";
import { useQuery } from "@tanstack/react-query";
import { getAllSubjects, getSubjectById } from "./subject.api";

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

export const useSubjectById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryKey = ["subject", id];
  const queryFn = async () => {
    return getSubjectById({ token: token, id: id });
  };

  const enabled = !!id;

  return { queryKey, queryFn, enabled };
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
