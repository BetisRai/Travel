import axios, { AxiosError } from "axios";

export const addRoutes = async ({
  busid,
  date,
  fromplace,
  toplace,
  time,
  price,
  arrival,
}: {
  busid: string;
  fromplace: string;
  toplace: string;
  date: string;
  time: string;
  price: string;
  arrival: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3000/addroutes", {
      busid,
      date,
      fromplace,
      toplace,
      time,
      price,
      arrival,
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

export const getallroutes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/getallroutes");
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

export const searchRoutes = async ({
  date,
  fromplace,
  toplace,
}: {
  fromplace: string;
  toplace: string;
  date: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3000/searchroutes", {
      date,
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

export const getRoutesById = async (id: string) => {
  try {
    const response = await axios.post("http://localhost:3000/routesbyid", {
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
