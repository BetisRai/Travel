import axios, { AxiosError } from "axios";

export const sentPayment = async (paymentInfo: any) => {
  try {
    const response = await axios.post("http://localhost:3000/payment", {
      paymentInfo,
    });
    if (response) {
      return response?.data;
    }
  } catch (e) {
    const errors = e as Error | AxiosError;
    if (!axios.isAxiosError(e)) {
      throw errors;
    }
    throw errors;
  }
};
