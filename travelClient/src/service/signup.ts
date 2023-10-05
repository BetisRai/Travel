import axios, { AxiosError } from "axios";

export const singup = async ({
  userName,
  password,
  reEnterPassword,
  userEmail,
  active,
  role,
  number,
  address,
}: signupInterface) => {
  try {
    const response = await axios.post("http://localhost:3000/signup", {
      userName,
      password,
      reEnterPassword,
      userEmail,
      active,
      role,
      number,
      address,
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
