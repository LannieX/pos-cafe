"use client";
import { ProductDialog } from "@/components/dialog/dialog-product";
import { SpinnerCustom } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateOrder } from "@/services/orderService";
import {
  GetOneProduct,
  getProductDataTable,
} from "@/services/productService";
import { getProductTypeDropdown } from "@/services/productTypeService";
import {
  DialogType,
  ProductDataType,
  ProductGroupType,
} from "@/types/productType";
import { EditIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";


const Productpage = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [typeDialog, setTypeDialog] = useState<DialogType | null>(null);
  const [dataTable, setDataTable] = useState<ProductDataType[]>([]);
  const [dataGetOne, setDataGetOne] = useState<ProductDataType | null>(null);
  const [loadingGetOne, setLoadingGetOne] = useState<boolean>(false);
  const [loadingMain, setLoadingMain] = useState<boolean>(false);
  const [ProductTypeOption, setProductTypeOption] = useState<
    ProductGroupType[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleOpenDialog = (type: DialogType, id?: number) => {
    if (id && type !== "create") {
      fetchGetOne(id);
    }
    setOpenDialog(true);
    setTypeDialog(type);
  };

  const handlePageChange = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setTypeDialog(null);
    setDataGetOne(null);
  };

  const handleSearch = () => {
    fetchGetData();
  };

  const fetchGetOne = async (id: number) => {
    try {
      setLoadingGetOne(true);
      const res = await GetOneProduct(id);
      setDataGetOne(res?.data);
    } catch (error) {
      throw error;
    } finally {
      setLoadingGetOne(false);
    }
  };

  const fetchGetData = async () => {
    try {
      setLoadingMain(true);
      const res = await getProductDataTable(page, itemPerPage, searchQuery);
      setDataTable(res?.data?.items);
      setItemPerPage(res?.data?.pagination?.limit);
      setTotalPages(res?.data?.pagination?.totalPages);
    } catch (error) {
      throw error;
    } finally {
      setLoadingMain(false);
    }
  };

  const fetchGetProductTypeDropdown = async () => {
    try {
      const res = await getProductTypeDropdown();
      setProductTypeOption(res?.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchGetData();
    fetchGetProductTypeDropdown();
  }, []);
  return (
    <>
    <div className="flex flex-col  gap-5 w-full h-screen">
      <p className="text-[22px] font-bold">ข้อมูลสินค้า</p>
      <div className="flex flex-row w-full p-1">
        <div className="flex flex-row gap-5 w-[50%]">
          <Input
            placeholder="พิมพ์เพื่อค้นหา"
            className="w-[70%]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="outline"
            className="bg-[#6F4E37] hover:bg-[#5c412e] hover:text-white text-white cursor-pointer transition-all duration-200 active:scale-95"
            onClick={handleSearch}
          >
            ค้นหา
          </Button>
        </div>
        <div className="w-[50%] flex justify-end">
          <Button
            variant="outline"
            className="bg-[#6F4E37] hover:bg-[#5c412e] hover:text-white text-white cursor-pointer transition-all duration-200 active:scale-95"
            onClick={() => handleOpenDialog("create")}
          >
            เพิ่มข้อมูลสินค้า
          </Button>
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto max-h-[700px] w-full max-w-full relative">
        <Table noWrapper className="min-w-[700px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="w-[10%] text-white bg-[#755844] first:rounded-tl-md text-center sticky top-0 z-20">
                Action
              </TableHead>
              <TableHead className="w-[20%] text-white bg-[#755844] sticky top-0 z-20 pl-14">
                ภาพสินค้า
              </TableHead>
              <TableHead className="w-[20%] text-white bg-[#755844] sticky top-0 z-20 pl-10">
                ชื่อสินค้า
              </TableHead>
              <TableHead className="w-[20%] text-white bg-[#755844] sticky top-0 z-20">
                ประเภทสินค้า
              </TableHead>
              <TableHead className="w-[15%] text-white bg-[#755844] sticky top-0 z-20 last:rounded-tr-md">
                ราคา
              </TableHead>
              <TableHead className="w-[15%] text-white bg-[#755844] sticky top-0 z-20 last:rounded-tr-md">
                การใช้งาน
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingMain ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <SpinnerCustom />
                    <p className="text-sm text-muted-foreground animate-pulse">
                      กำลังโหลดข้อมูล...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : dataTable && dataTable.length > 0 ? (
              dataTable.map((x) => (
                <TableRow key={x?.id}>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleOpenDialog("view", x?.id)}
                      >
                        <EyeIcon size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleOpenDialog("edit", x?.id)}
                      >
                        <EditIcon size={18} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <img
                      src={x?.image ? x?.image : "https://res.cloudinary.com/dyc6epcdk/image/upload/v1770176114/nlvknhunf5azzkapc5kk.jpg"}
                      className="w-[160px] h-[120px] object-cover rounded-md"
                      alt={x?.name}
                    />
                  </TableCell>
                  <TableCell className="pl-10">{x?.name || "-"}</TableCell>
                  <TableCell>{x?.productType?.name || "-"}</TableCell>
                  <TableCell>{x?.price || "0"}</TableCell>
                  <TableCell>
                    <div
                      className={`px-2 py-1 rounded-md text-xs font-medium w-fit ${
                        x?.isActive
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {x?.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    ไม่พบข้อมูลสินค้า
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page - 1);
                }}
                className={
                  page <= 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => {
                const isEdgePage =
                  pageNumber === 1 || pageNumber === totalPages;
                const isNearCurrent = Math.abs(pageNumber - page) <= 1;
                const showPage = totalPages <= 7 || isEdgePage || isNearCurrent;
                const showEllipsisStart =
                  pageNumber === 2 && page > 4 && totalPages > 7;
                const showEllipsisEnd =
                  pageNumber === totalPages - 1 &&
                  page < totalPages - 3 &&
                  totalPages > 7;

                if (showEllipsisStart || showEllipsisEnd) {
                  return (
                    <PaginationItem key={`ellipsis-${pageNumber}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                if (showPage) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={page === pageNumber}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                return null;
              },
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page + 1);
                }}
                className={
                  page >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <ProductDialog
        isOpen={openDialog}
        onClose={handleClose}
        loading={loadingGetOne}
        dialogType={typeDialog}
        ProductTypeOption={ProductTypeOption}
        data={dataGetOne || undefined}
        fetchData={fetchGetData}
      />
    </div>
    </>
  );
};

export default Productpage;
