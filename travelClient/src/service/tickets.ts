import axios, { AxiosError } from "axios";

interface props {
  routesid: string;
  price: string;
  seatcount: string;
  totalamount: string;
  seats: string;
  fromplace: string;
  toplace: string;
}

export const buyTickets = async ({
  price,
  routesid,
  seatcount,
  totalamount,
  seats,
  fromplace,
  toplace,
}: props) => {
  try {
    const response = await axios.post("http://localhost:3000/ticket", {
      price,
      routesid,
      seatcount,
      totalamount,
      seats,
      fromplace,
      toplace,
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

export const allTickets = async () => {
  try {
    const response = await axios.post("http://localhost:3000/alltickets");
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
