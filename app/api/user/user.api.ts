import axiosClient, { axiosClientUpload } from "@/lib/axiosClient";

export const END_POINT = {
  PATCH_NEW_USER: "/user/new_user",
  PATCH_PROFILE: "/user/profile",
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

// export const patchUserProfile = async ({
//   token,
//   fullName,
//   phoneNumber,
//   imageFile,
//   password,
// }: {
//   token: string;
//   fullName?: string;
//   phoneNumber?: string;
//   imageFile?: File | null;
//   password?: string;
// }) => {
//   try {
//     const formData = new FormData();
//     formData.append("FullName", fullName ?? "");
//     formData.append("PhoneNumber", phoneNumber ?? "");
//     if (imageFile) {
//       formData.append("Image", imageFile);
//     } else {
//       formData.append("Image", "");
//     }
//     formData.append("password", password ?? "");

//     const response = await fetch(
//       "https://goateduaspbackend.azurewebsites.net/api/user/profile",
//       {
//         method: "PATCH",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error("Error patching user profile with image:", error);
//     throw error;
//   }
// };

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

    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error patching user profile with image:", error);
    throw error;
  }
};
