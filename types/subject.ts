import { Chapter } from "./chapter";

export type Subject = {
  id: string;
  subjectName: string;
  image: string;
  subjectCode: string;
  information: string;
  class: string;
  creatAt: Date;
  chapters: Chapter[];
  numberOfChapters: number;
};
