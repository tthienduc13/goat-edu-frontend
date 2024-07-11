import axiosClient from "@/lib/axiosClient";

const END_POINT = {
  CREATE_SESSION: "/payment/create-checkout-session",
};

export const createSessionCheckout = async ({ token }: { token: string }) => {
  try {
    const response = await axiosClient.post(
      END_POINT.CREATE_SESSION,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.headers.location;
  } catch (error) {
    console.error("Error creating session checkout:", error);
    return null;
  }
};
