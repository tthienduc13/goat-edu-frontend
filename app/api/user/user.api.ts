import * as z from "zod";

import axiosClient, { axiosClientUpload } from "@/lib/axiosClient";
import { ChangePasswordSchema } from "@/schemas/account";
import { Subject } from "@/types/subject";

export const END_POINT = {
  PATCH_NEW_USER: "/user/new_user",
  PATCH_PROFILE: "/user/profile",
  PATCH_PASSWORD: "/user/password",
  GET_USER_ENROLL: "/user/enroll",
  ENROLL_COURSE: "/user/subject",
};

export type UserEnrollmentResponse = {
  subjectEnrollment: Subject[];
  numberOfSubjectEnroll: number;
};

export const patchNewUser = async ({ token }: { token: string }) => {
  try {
    const response = await axiosClient.patch(
      `${END_POINT.PATCH_NEW_USER}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error patching note:", error);
    throw error;
  }
};

export const patchUserProfile = async ({
  token,
  fullName,
  phoneNumber,
  imageFile,
  password,
}: {
  token: string;
  fullName?: string;
  phoneNumber?: string;
  imageFile?: File | null;
  password?: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("FullName", fullName ?? "");
    formData.append("PhoneNumber", phoneNumber ?? "");
    formData.append("Image", imageFile ?? "");
    formData.append("password", password ?? "");

    const response = await axiosClientUpload.patch(
      END_POINT.PATCH_PROFILE,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error patching user profile with image:", error);
    throw error;
  }
};

export const patchPassword = async ({
  token,
  values,
}: {
  token: string;
  values: z.infer<typeof ChangePasswordSchema>;
}) => {
  try {
    const response = await axiosClient.patch(
      `${END_POINT.PATCH_PASSWORD}`,
      { old_password: values.oldPassword, new_password: values.newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error changing password", error);
  }
};

export const getUserSubjects = async ({
  token,
  search,
  pageNumber,
  pageSize,
}: {
  token: string;
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<UserEnrollmentResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (search) {
      queryParams.append("search", search);
    }
    if (pageSize) {
      queryParams.append("page_size", pageSize.toString());
    }
    if (pageNumber) {
      queryParams.append("page_number", pageNumber.toString());
    }

    const response = await axiosClient.get(
      `${END_POINT.GET_USER_ENROLL}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled subjects:", error);
    throw error;
  }
};

export const enrollCourses = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  try {
    const response = await axiosClient.post(
      `${END_POINT.ENROLL_COURSE}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Something went wrong with enrolling course");
  }
};
