import { Tag } from "./tag";

export type Discussion = {
  id: string;
  discussionName: string;
  discussionBody: string;
  discussionImage: string;
  discussionVote: number;
  isSolved: boolean;
  status: Status;
  tags: Tag[];
  userAndSubject: UserAndSubject;
};

enum Status {
  "Unapproved",
  "Approved",
  "Vac",
}

type UserAndSubject = {
  userId: string;
  userName: string;
  fullName: string;
  userImage: string;
  subjectId: string;
  subjectName: string;
};
