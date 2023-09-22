import axios, { AxiosError } from "axios";

export const singup = async ({
  userName,
  password,
  reEnterPassword,
  userEmail,
  active,
  role,
}: signupInterface) => {
  try {
    const response = await axios.post("http://localhost:3000/signup", {
      userName,
      password,
      reEnterPassword,
      userEmail,
      active,
      role,
    });
    if (response) {
      return response?.data;
    }
  } catch (e) {
    const errors = e as Error | AxiosError;
    if (!axios.isAxiosError(e)) {
      console.log("axios error");
      // do whatever you want with native error
    }
  }
};
