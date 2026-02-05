import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CartItemType } from "@/types/productType";
import { Button } from "../ui/button";
import { SpinnerCustom } from "../loading";

export function DialogPayment({
  isOpen,
  loadingPayment,
  totalAmount,
  handleConfirm,
  handleClose,
  menuForOrder,
  readyPay
}: {
  isOpen: boolean;
  loadingPayment: boolean;
  totalAmount: number;
  handleConfirm: (isPay: boolean) => void;
  handleClose: () => void;
  menuForOrder: CartItemType[];
  readyPay: boolean
}) {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px] min-h-[50vh] [&>button]:hidden">
        {loadingPayment ? (
          <div className="w-full h-full flex items-center justify-center">
            <SpinnerCustom />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-6 h-full">
              <div className="flex flex-col flex-1 h-[400px] w-[55%]">
                <p className="font-semibold mb-2 text-slate-700">
                  รายการออเดอร์
                </p>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[300px]">
                  {menuForOrder.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start border-b border-slate-100 py-1 last:border-0"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-slate-800 leading-tight">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.quantity} x {item.price.toLocaleString()} ฿
                        </span>
                      </div>
                      <span className="text-[12px] font-bold">
                        {(item.price * item.quantity).toLocaleString()} ฿
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-[16px] font-bold text-slate-800">
                    รวมทั้งหมด
                  </span>
                  <span className="text-[16px] font-bold">
                    {totalAmount.toLocaleString()} ฿
                  </span>
                </div>
              </div>
              <div className="w-[45%] flex flex-col items-center justify-center p-4">
                <img src="/PromptPay.jpg" />
                <img
                  src={`https://promptpay.io/0935386680/${totalAmount}.png`}
                  className="w-full object-contain mix-blend-multiply"
                  alt="QR Code"
                />
              </div>
            </div>
            <div className="flex gap-3 w-full">
              {!readyPay && (
              <Button
                variant="outline"
                className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 active:scale-95"
                onClick={() => handleConfirm(false)}
              >
                ชำระภายหลัง
              </Button>
              )}
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-all duration-200 active:scale-95 border-transparent shadow-md"
                onClick={() => handleConfirm(true)}
              >
                ชำระเงินแล้ว
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
