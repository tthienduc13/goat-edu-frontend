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
  createdAt: Date;
  userAndSubject: UserAndSubject;
  isUserVoted: boolean;
};

export enum Status {
  Approved = "Approved",
  Unapproved = "Unapproved",
  Vac = "VAC",
}

type UserAndSubject = {
  userId: string;
  userName: string;
  fullName: string;
  userImage: string;
  subjectId: string;
  subjectName: string;
};
