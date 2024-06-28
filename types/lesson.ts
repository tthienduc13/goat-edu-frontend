export type Lesson = {
  id: string;
  lessonName: string;
  chapterId: string;
  createdAt: Date;
  displayOrder: number;
};

export type LessonByChapter = {
  chapterid: string;
  lessonList: Lesson[];
  lessonCount: number;
};
