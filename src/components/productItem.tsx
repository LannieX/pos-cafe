import { ProductDataType } from "@/types/productType";

interface CartItemProps {
  item: ProductDataType & { quantity: number };
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  return (
    <div className="group flex w-full items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-2 transition-all hover:shadow-md">
      <div className="w-14 h-14 shrink-0 bg-slate-100 rounded-lg overflow-hidden relative">
        <img
          src={item.image ? item.image : "https://res.cloudinary.com/dyc6epcdk/image/upload/v1770176114/nlvknhunf5azzkapc5kk.jpg"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <span className="text-sm font-bold text-slate-800 truncate leading-tight">
          {item.name}
        </span>
        <span className="text-xs text-slate-500">
          {item.price.toLocaleString()} ฿ / ชิ้น
        </span>
        <span className="text-sm font-bold text-[#6F4E37]">
          {(item.price * item.quantity).toLocaleString()} ฿
        </span>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => onRemove(item.id)}
          className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
          title="ลบรายการ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-200">
          <button
            onClick={() => onDecrease(item.id)}
            disabled={item.quantity <= 1}
            className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:bg-slate-100 hover:text-[#6F4E37] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
          >
            -
          </button>
          
          <span className="w-4 text-center text-sm font-semibold text-slate-700 select-none">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item.id)}
            className="w-6 h-6 flex items-center justify-center bg-[#6F4E37] rounded shadow-sm text-white hover:bg-[#5c412e] transition-all active:scale-95 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}