import axios, { AxiosError } from "axios";

export const singin = async ({ useremail, password }: signinInterface) => {
  try {
    const response = await axios.post("http://localhost:3000/signin", {
      useremail,
      password,
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
