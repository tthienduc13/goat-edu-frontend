import axiosClient from "@/lib/axiosClient";

export const END_POINT = {
  GET_BY_USER: "/note/user",
  GET_BY_ID: "/note",
  CREATE: "/note",
  DELETE: "/note",
  PATCH: "/note",
};

// export const createNote = async (
//   token: string,
//   values: Omit<Note, "id" | "userId" | "createdAt">
// ) => {
//   try {
//     const response = await axiosClient.post(`${END_POINT.CREATE}`, values, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error creating note:", error);
//     throw error;
//   }
// };
