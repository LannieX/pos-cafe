export interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: DialogType | null;
  data?: any;
}

export interface ProductDataType {
  id: number;
  name: string;
  image: string;
  type: number;
  price: number;
  index: number;
  soldOutDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  productType: ProductGroupType;
}

export interface FormType {
  image: string;
  name: string;
  type: number;
  price: number;
  isActive: boolean;
}

export interface ProductGroupType {
  id: number;
  name: string;
}

export type DialogType = "create" | "edit" | "view";

export interface CartItemType extends ProductDataType {
  quantity: number;
}
