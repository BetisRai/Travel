import axios, { AxiosError } from "axios";

export const salesdata = async () => {
  try {
    const response = await axios.get("http://localhost:3000/salesdata");
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

export const getUserdata = async (id: string) => {
  try {
    const response = await axios.post("http://localhost:3000/getuser", {
      id: id,
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
