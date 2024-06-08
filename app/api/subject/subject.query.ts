import { queries } from "@/queries/index";
import { useQuery } from "@tanstack/react-query";
import { getAllSubject } from "./subject.api";

export const useSubjectById = (id: string, token: string) => {
  return useQuery(queries.subject.id(id, token));
};

export const useSubjects = (token: string) => {
  return useQuery(queries.subject.all(token));
};

export const useSubjectByClasses = (classes: string, token: string) => {
  return useQuery(queries.subject.classes(classes, token));
};
