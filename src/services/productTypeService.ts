import { ApiServices } from "./api.service";

export const getProductTypeDropdown = async () => {
  try {
    const res = await ApiServices("GET", "/product-type");
    return res;
  } catch (error) {
    throw error;
  }
};