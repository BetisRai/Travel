import axios, { AxiosError } from "axios";

interface props {
  routesid: string;
  price: string;
  seatcount: string;
  totalamount: string;
  seats: string;
  fromplace: string;
  toplace: string;
  userid: string;
}

export const buyTickets = async ({
  price,
  routesid,
  seatcount,
  totalamount,
  seats,
  fromplace,
  toplace,
  userid,
}: props) => {
  try {
    const response = await axios.post("http://localhost:3000/ticket", {
      routesid,
      price,
      seatcount,
      totalamount,
      fromplace,
      toplace,
      seats,
      userid,
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

export const cancelTickets = async ({
  ticketid,
  userid,
}: {
  userid: string;
  ticketid: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3000/cancel", {
      ticketid,
      userid,
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

export const verifyCancelTickets = async ({
  ticketid,
  otp,
}: {
  otp: string;
  ticketid: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3000/verifycancel", {
      ticketid,
      otp,
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

export const getTicketsByid = async ({ userid }: { userid: string }) => {
  try {
    const response = await axios.post("http://localhost:3000/ticketsbyid", {
      userid,
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
