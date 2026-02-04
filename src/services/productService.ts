import { FormType } from "@/types/productType";
import { ApiServices } from "./api.service";

export const getProductDataTable = async (page?: number, itemPerPage?: number, searchQuery?: string) => {
  try {
    const params = {
      page,
      itemPerPage,
      searchQuery
    };
    const res = await ApiServices("GET", "/product", params);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    const res = await ApiServices("GET", "/product/all");
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetOneProduct = async (id: number) => {
  try {
    const res = await ApiServices("GET", `/product/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const CreateProduct = async (body: FormType) => {
  try {
    const res = await ApiServices("POST", '/product', body);
    return res;
  } catch (error) {
    throw error;
  }
};

export const UpdateProduct = async (id: number, body: FormType) => {
  try {
    const res = await ApiServices("PATCH", `/product/${id}`, body);
    return res;
  } catch (error) {
    throw error;
  }
};