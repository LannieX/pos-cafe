import { ApiServices } from "./api.service";

export const CreateOrder = async (body: any) => {
  try {
    const res = await ApiServices("POST", "/order", body);
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetOrderToDay = async () => {
  try {
    const res = await ApiServices("GET", "/order/today");
    return res;
  } catch (error) {
    throw error;
  }
};
