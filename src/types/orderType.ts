import { ProductDataType } from "./productType";

export interface OrderType {
  id: number;
  queueNumber: string;
  totalPrice: number;
  isPay: boolean;
  paymentMethod: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  items: OrderItemType[];
}

export interface OrderItemType {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  sweetness: string;
  option: string;
  note: string;
  product: ProductDataType;
}

