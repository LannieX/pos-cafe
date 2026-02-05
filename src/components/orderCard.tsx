import React from "react";
import { ChevronRight, CheckCircle, AlertCircle } from "lucide-react";
import { OrderType } from "@/types/orderType";


interface OrderCardProps {
  dataOrderToDay: OrderType;
  handleForPay: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  dataOrderToDay,
  handleForPay,
}) => {
  const theme = dataOrderToDay.isPay
    ? {
        bg: "bg-gray-50",
        border: "border-gray-200",
        textMain: "text-gray-400",
        badgeBg: "bg-gray-200",
        badgeText: "text-gray-600",
        icon: <CheckCircle size={14} />,
        statusLabel: "จ่ายเงินแล้ว",
        barColor: "bg-gray-400",
        avatarColor: "bg-gray-400",
      }
    : {
        bg: "bg-red-50",
        border: "border-red-200",
        textMain: "text-gray-800",
        badgeBg: "bg-red-100",
        badgeText: "text-red-600",
        icon: <AlertCircle size={14} />,
        statusLabel: "ยังไม่จ่าย",
        barColor: "bg-red-500",
        avatarColor: "bg-red-500",
      };

  const itemsList = dataOrderToDay.items
    .map((item) => `${item.product.name} (${item.quantity})`)
    .join(", ");

  const dateObj = new Date(dataOrderToDay.createdAt);
  const timeString = dateObj.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
  const dateString = dateObj.toLocaleDateString("th-TH", { day: "numeric", month: "short" });

  return (
    <div
      className={`relative p-5 rounded-xl border-2 shadow-sm flex flex-col gap-4 min-w-[300px] h-auto transition-all duration-300
      ${theme.bg} ${theme.border}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className={`text-xl font-bold ${dataOrderToDay.isPay ? "text-gray-400" : "text-gray-800"}`}>
            {dataOrderToDay.queueNumber}
          </span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${theme.badgeBg} ${theme.badgeText}`}>
            {theme.icon}
            <span>{theme.statusLabel}</span>
          </div>
        </div>
        <span className="font-bold text-gray-700 text-lg">฿{dataOrderToDay.totalPrice}</span>
      </div>
      <div className="min-h-[3rem]">
        <p className={`font-medium leading-tight text-sm line-clamp-2 ${theme.textMain}`}>
          {itemsList}
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400 font-medium">
          <span>{dateString}, {timeString}</span>
          <span>{dataOrderToDay.paymentMethod}</span>
        </div>
        <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full w-full ${theme.barColor}`}
          />
        </div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${theme.avatarColor}`}>
            {dataOrderToDay.queueNumber.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Customer</h4>
            <p className="text-xs text-gray-500">Queue: {dataOrderToDay.queueNumber}</p>
          </div>
        </div>
        {!dataOrderToDay.isPay && (
          <button
            onClick={handleForPay}
            className="group w-10 h-10 bg-black rounded-full flex items-center justify-center text-white cursor-pointer shadow-md
            transition-all duration-300 ease-out
            hover:scale-110 hover:bg-gray-900 hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]
            active:scale-90 active:duration-100"
          >
            <ChevronRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;