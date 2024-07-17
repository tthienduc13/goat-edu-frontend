import { getQuizByType } from "./quiz.api";

export const useQuizByType = ({
  typeId,
  typeName,
  token,
}: {
  typeId: string;
  typeName: string;
  token: string;
}) => {
  const queryKey = ["quiz", typeName, typeId];

  const queryFn = async () => {
    return getQuizByType({ type: typeName, typeId: typeId, token: token });
  };

  const enabled = !!typeId;

  return {
    queryFn,
    queryKey,
    enabled,
  };
};
