import axiosClient from "@/lib/axiosClient";

export const END_POINT = {
  VOTE_DISCUSSION: "/vote",
};

export const voteDiscussion = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  try {
    const response = await axiosClient.post(
      `${END_POINT.VOTE_DISCUSSION}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Something went wrong with vote", voteDiscussion);
  }
};
