export type Subject = {
  id: string;
  subjectName: string;
  image: string;
  subjectCode: string;
  information: string;
  class: string;
  creatAt: Date;
  chapters: {
    id: string;
    chapterName: string;
    chapterLevel: number;
  };
  numberOfChapters: number;
};
