import axiosClient, { axiosClientUpload } from "@/lib/axiosClient";
import { NewDiscussionSchema } from "@/schemas/discussion";
import { Discussion, Status } from "@/types/discussion";
import { z } from "zod";

export const END_POINT = {
  GET_BY_ID: "/discussion",
  GET_BY_USER: "/discussion/user",
  GET_ALL: "/discussion",
  CREATE: "/discussion",
  DELETE: "/discussion",
};

export const createDiscussion = async ({
  token,
  values,
}: {
  token: string;
  values: z.infer<typeof NewDiscussionSchema>;
}) => {
  try {
    const formData = new FormData();
    formData.append("DiscussionName", values.discussionName);
    formData.append("DiscussionBody", values.discussionBody);
    formData.append("DiscussionBodyHtml", values.discussionBodyHtml);
    formData.append("DiscussionImage", values.discussionImage ?? "");
    formData.append("Tags", JSON.stringify(values.tags));
    formData.append("SubjectId", values.subjectId);

    const response = await axiosClientUpload.post(END_POINT.CREATE, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating discussion:", error);
    throw error;
  }
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

export const getRelatedDiscussion = async ({
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

export const deleteDiscussion = async (token: string, id: string) => {
  try {
    const response = await axiosClient.delete(`${END_POINT.DELETE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting discussion:", error);
    throw error;
  }
};
