import { ProductDataType } from "@/types/productType";

interface ProductCardProps {
  product: ProductDataType;
  onClick: (product: ProductDataType) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={() => onClick(product)}
      className="
    group relative flex flex-col 
    bg-white rounded-xl shadow-sm border border-slate-100
    cursor-pointer overflow-hidden 
    transition-all duration-300 
    hover:-translate-y-1
    hover:shadow-[0_10px_30px_-10px_rgba(111,78,55,0.4)] 
    hover:border-[#6F4E37]/30
    active:scale-95 active:shadow-inner
  "
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
        <img
          src={
            product.image
              ? product?.image
              : "https://res.cloudinary.com/dyc6epcdk/image/upload/v1770176114/nlvknhunf5azzkapc5kk.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <h2 className="font-medium text-slate-700 text-sm line-clamp-2 leading-tight min-h-[2rem]">
          {product.name}
        </h2>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-slate-900">
            {product.price.toLocaleString()} ฿
          </span>
          <div className="w-10 h-10 text-[20px] rounded-full bg-[#6F4E37] text-white flex items-center justify-center transition-opacity">
            +
          </div>
        </div>
      </div>
    </div>
  );
}
