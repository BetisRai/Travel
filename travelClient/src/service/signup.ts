import axios from "axios";

export const singup = async (val: signupInterface) => {
  try {
    const response = await axios.post("http://localhost:3000/signup", {
      val,
    });
    if (response) {
      return response?.data;
    }
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};
