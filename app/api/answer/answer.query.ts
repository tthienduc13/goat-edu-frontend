import { getAnswerByDiscussion } from "./answer.api";

export const useAnswerByDiscussion = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryKey = ["answer", "discussion", id];

  const queryFn = async () => {
    return getAnswerByDiscussion({ token: token, id: id });
  };

  return { queryKey, queryFn };
};
