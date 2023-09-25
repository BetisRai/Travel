import axios, { AxiosError } from "axios";

export const verifyOtp = async ({
  otp,
  useremail,
}: {
  otp: string;
  useremail: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3000/activate", {
      otp,
      useremail,
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
