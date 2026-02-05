"use client";

import { DialogPayment } from "@/components/dialog/dialog-payment";
import { SpinnerCustom } from "@/components/loading";
import OrderCard from "@/components/orderCard";
import { GetOrderToDay } from "@/services/orderService";
import { OrderType } from "@/types/orderType";
import { useEffect, useState } from "react";

const OrderToDay = () => {
  const [loadingMain, setLoadingMain] = useState<boolean>(false);
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [dataOrderToDay, setDataOrderToDay] = useState<OrderType[]>([]);

  const fetchOrderToDay = async () => {
    setLoadingMain(true);
    const res = await GetOrderToDay();
    if (res?.success) {
      setLoadingMain(false);
      setDataOrderToDay(res?.data);
    }
  };

  const handleForPay = (id: number) => {
    setIsPayment(true);
  };

  const handleClose = () => {
    setIsPayment(false);
  };

  const handleConfirmPay = async (isPay: boolean) => {};

  useEffect(() => {
    fetchOrderToDay();
  }, []);
  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <div className="flex flex-row gap-2 w-full h-15 items-center justify-start">
          <p className="text-[22px] font-bold">ออเดอร์</p>
          <p className="text-[16px] text-gray-400">(12 ออเดอร์)</p>
        </div>
        <div className="w-full h-0.5 bg-[#6F4E37]" />
        {loadingMain ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <SpinnerCustom />
            <p className="text-sm text-muted-foreground animate-pulse">
              กำลังโหลดข้อมูล...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataOrderToDay.map((item) => (
                <OrderCard
                  key={item.id}
                  dataOrderToDay={item}
                  handleForPay={() => handleForPay(item.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <DialogPayment
        isOpen={isPayment}
        loadingPayment={false}
        totalAmount={10}
        menuForOrder={[]}
        handleClose={handleClose}
        handleConfirm={(isPay: boolean) => handleConfirmPay(isPay)}
        readyPay={true}
      />
    </>
  );
};

export default OrderToDay;
