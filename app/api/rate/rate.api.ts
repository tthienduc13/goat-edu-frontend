import axiosClient from "@/lib/axiosClient";

const END_POINT = {
  RATE: "/rate",
  GET_RATE_BOOLEAN: "/rate/user",
};

export const RateFlashcard = async ({
  token,
  flashcardId,
  rate,
}: {
  token: string;
  flashcardId: string;
  rate: number;
}) => {
  try {
    const response = await axiosClient.post(
      `${END_POINT.RATE}/${flashcardId}/${rate}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error rating api function", error);
  }
};

export const getUserRateBoolean = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  try {
    const response = await axiosClient.get(
      `${END_POINT.GET_RATE_BOOLEAN}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error getting user rate boolean api", error);
  }
};
