"use client";
import axiosWithConfig from "@/lib/apis/axiosWithConfig";

export const getBooks = async () => {
  try {
    const response = await axiosWithConfig.get(`/data`);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const getDetailBooks = async (id) => {
  try {
    const response = await axiosWithConfig.get(`/data/${id}`);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const createBook = async (data) => {
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.post("/data", newData);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const updateBook = async (data) => {
  const { id } = data;
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.put(`/data/${id}`, newData);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const deleteBook = async (book_id) => {
  try {
    const response = await axiosWithConfig.delete(`/data/${book_id}`);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
