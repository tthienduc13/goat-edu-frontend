import { voteDiscussion } from "./vote.api";

export const useVote = ({ token, id }: { token: string; id: string }) => {
  const mutationKey = ["vote", "discussion", id];
  const mutationFn = () => voteDiscussion({ token: token, id: id });

  return { mutationKey, mutationFn };
};
