export type Discussion = {
  id: string;
  discussionName: string;
  userName: string;
  discussionVote: number;
  status: "Unapproved";
  subjectId: string;
  isSolved: boolean;
};
