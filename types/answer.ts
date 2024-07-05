export type Answer = {
  id: string;
  answerName: string;
  answerBody: string;
  answerBodyHtml: string;
  answerImage: string;
  answerVote: number;
  createdAt: Date;
  userInformation: {
    userId: string;
    fullName: string;
    userImage: string;
  };
  isUserVoted: boolean;
};
