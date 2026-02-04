"use client";
import { DialogPayment } from "@/components/dialog/dialog-payment";
import AppHeader from "@/components/header";
import { SpinnerCustom } from "@/components/loading";
import ProductCard from "@/components/productCard";
import CartItem from "@/components/productItem";
import { Button } from "@/components/ui/button";
import { CreateOrder } from "@/services/orderService";
import { getAllProduct } from "@/services/productService";
import { getProductTypeDropdown } from "@/services/productTypeService";
import { CartItemType, ProductDataType } from "@/types/productType";
import { Input, Segmented } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const OrderPage = () => {
  const [loadingMain, setLoadingMain] = useState<boolean>(false);
  const [loadingPayment, setLoadingPayment] = useState<boolean>(false);
  const [dataProductAll, setDataProductAll] = useState<ProductDataType[]>([]);
  const [dataProductShow, setDataProductAllShow] = useState<ProductDataType[]>(
    [],
  );
  const [productType, setProductType] = useState<string[]>(["ทั้งหมด"]);
  const [selected, setSelected] = useState<string>("ทั้งหมด");
  const [menuForOrder, setMenuForOrder] = useState<CartItemType[]>([]);
  const [isPayment, setIsPayment] = useState<boolean>(false);

  const totalAmount = menuForOrder.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleIncreaseQuantity = (id: number) => {
    setMenuForOrder((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setMenuForOrder((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemoveItem = (id: number) => {
    setMenuForOrder((prev) => prev.filter((item) => item.id !== id));
  };

  const handleConfirmOrder = async (isPay: boolean) => {
    setLoadingPayment(true);
    const formattedItems = menuForOrder.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
      sweetness: "100%",
      option: "ปกติ",
      note: "-",
    }));

    const payload = {
      totalPrice: totalAmount,
      paymentMethod: "โอนจ่าย",
      isPay: isPay,
      items: formattedItems,
    };

    console.log("Payload to send:", payload);

    try {
      const res = await CreateOrder(payload);
      if (res?.success) {
        setMenuForOrder([]);
        setIsPayment(false);
        setLoadingPayment(true);
      } else {
        setLoadingPayment(true);
        toast.error(res?.message || "เกิดข้อผิดพลาดในการสั่งซื้อ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductType = async () => {
    const res = await getProductTypeDropdown();
    const onlyName = res?.data.map((x: any) => x.name);
    setProductType(["ทั้งหมด", ...(onlyName ?? [])]);
  };

  const handleChange = (value: string) => {
    setSelected(value);
    if (value === "ทั้งหมด") {
      setDataProductAllShow(dataProductAll);
    } else {
      const filtered = dataProductAll.filter(
        (item) => item.productType?.name === value,
      );
      setDataProductAllShow(filtered);
    }
  };

  const fetchDataAll = async () => {
    try {
      setLoadingMain(true);
      const res = await getAllProduct();
      setDataProductAll(res?.data);
      setDataProductAllShow(res?.data);
    } catch (error) {
      throw error;
    } finally {
      setLoadingMain(false);
    }
  };

  useEffect(() => {
    fetchDataAll();
    fetchProductType();
  }, []);

  const handleAddToCart = (product: ProductDataType) => {
    setMenuForOrder((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <>
      <div className="w-full h-screen flex flex-row">
        <div className="w-[70%] flex flex-col gap-5">
          <div className="flex flex-row justify-between w-full p-5 h-[70px]">
            <p className="text-[22px] font-bold">ออเดอร์</p>
            <div className="flex flex-row gap-5 w-[60%]">
              <Input placeholder="พิมพ์เพื่อค้นหา" className="w-[50%]" />
              <Button
                disabled={loadingMain}
                variant="outline"
                className="bg-[#6F4E37] hover:bg-[#5c412e] hover:text-white text-white cursor-pointer transition-all duration-200 active:scale-95"
              >
                ค้นหา
              </Button>
            </div>
          </div>
          <div>
            <Segmented
              options={productType}
              value={selected}
              onChange={handleChange}
              size="large"
              block
              className="custom-segmented"
            />
          </div>
          <div className="flex justify-between">
            <p className="text-[18px] font-bold text-[#6F4E37]">
              เมนู {selected}
            </p>
            <p className="text-[18px] font-bold text-[#6F4E37]">
              ทั้งหมด {dataProductShow?.length} เมนู
            </p>
          </div>
          <div className="w-full h-[700px] bg-[#FAFAFA] overflow-y-auto p-4">
            {loadingMain ? (
              <div className="w-full h-[500px] flex items-center justify-center">
                <SpinnerCustom />
              </div>
            ) : (
              <>
                {!dataProductShow || dataProductShow.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <p>ไม่มีรายการสินค้า</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    {dataProductShow.map((item) => (
                      <ProductCard
                        key={item.id}
                        product={item}
                        onClick={(p) => handleAddToCart(p)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-[30%] h-[calc(100vh-40px)] flex flex-col bg-[#F5F5F5] m-5 rounded-2xl p-4">
          <div className="w-full flex justify-center mb-4">
            <p className="text-[18px] font-bold text-slate-800">
              รายการที่เลือก
            </p>
          </div>
          {menuForOrder.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              <p>ไม่มีรายการที่เลือก</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {menuForOrder.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={handleIncreaseQuantity}
                    onDecrease={handleDecreaseQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-lg font-bold">
                  <span>รวมทั้งหมด</span>
                  <span>{totalAmount ?? 0}฿</span>
                </div>
                <Button
                  className="w-full bg-[#6F4E37] hover:bg-[#5c412e] text-white rounded-xl h-12 text-lg font-bold transition-all duration-200 active:scale-95"
                  onClick={() => setIsPayment(true)}
                >
                  ชำระเงิน
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <DialogPayment
        isOpen={isPayment}
        loadingPayment={loadingPayment}
        totalAmount={totalAmount}
        menuForOrder={menuForOrder}
        handleConfirm={(isPay: boolean) => handleConfirmOrder(isPay)}
      />
    </>
  );
};

export default OrderPage;
