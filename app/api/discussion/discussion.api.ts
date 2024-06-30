import axiosClient from "@/lib/axiosClient";
import { Discussion, Status } from "@/types/discussion";

export const END_POINT = {
  GET_BY_ID: "/discussion",
  GET_BY_USER: "/discussion/user",
  GET_ALL: "/discussion",
};

export const getAllDiscussionSitemap = async (
  status: Status
): Promise<Discussion[]> => {
  try {
    const queryParams = new URLSearchParams({
      status,
    });
    const response = await axiosClient.get(
      `${END_POINT.GET_ALL}?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching discussions:", error);
    throw error;
  }
};

export const getAllDiscussion = async ({
  token,
  sort,
  search,
  status,
  pageNumber,
  pageSize,
}: {
  token: string;
  sort?: string;
  search?: string;
  status?: Status;
  pageNumber?: number;
  pageSize?: number;
}): Promise<Discussion[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (sort) {
      queryParams.append("sort", sort);
    }
    if (search) {
      queryParams.append("search", search);
    }
    if (status) {
      queryParams.append("status", status);
    }
    if (pageSize) {
      queryParams.append("page_size", pageSize.toString());
    }
    if (pageNumber) {
      queryParams.append("page_number", pageNumber.toString());
    }

    const response = await axiosClient.get(
      `${END_POINT.GET_ALL}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching discussions:", error);
    throw error;
  }
};

// export const getAllDiscussion = async (
//   status: Status,
//   pageNumber: number,
//   token: string
// ): Promise<Discussion[]> => {
//   try {
//     const queryParams = new URLSearchParams({
//       status,
//       page_size: "6",
//       page_number: pageNumber.toString(),
//     });
//     const response = await axiosClient.get(
//       `${END_POINT.GET_ALL}?${queryParams.toString()}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching discussions:", error);
//     throw error;
//   }
// };

export const getAllUserDisscusion = async ({
  token,
  pageNumber,
}: {
  token: string;
  pageNumber: number;
}): Promise<Discussion[]> => {
  try {
    const queryParams = new URLSearchParams({
      page_size: "10",
      page_number: pageNumber?.toString() ?? "",
    });
    const response = await axiosClient.get(
      `${END_POINT.GET_BY_USER}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching discussions:", error);
    throw error;
  }
};

export const getDiscussionById = async (
  token: string,
  id: string
): Promise<Discussion> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
