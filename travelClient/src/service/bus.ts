import axios, { AxiosError } from "axios";

export const addbus = async ({
  busname,
  busno,
  seats,
}: {
  busname: string;
  busno: string;
  seats: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3000/addbus", {
      busname,
      busno,
      seats,
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

export const deletebus = async ({ id }: { id: string }) => {
  try {
    const response = await axios.post("http://localhost:3000/deletebus", {
      id,
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

export const getallbus = async () => {
  try {
    const response = await axios.get("http://localhost:3000/getallbus");
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

export const getbusbyid = async (id: string) => {
  try {
    const response = await axios.post("http://localhost:3000/getbusbyid", {
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

export const addbusbyid = async ({
  busname,
  busno,
  seats,
  id,
}: {
  busname: string;
  busno: string;
  seats: string;
  id: string;
}) => {
  try {
    const response = await axios.post("http://localhost:3000/addbusbyid", {
      busname,
      busno,
      seats,
      id,
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
