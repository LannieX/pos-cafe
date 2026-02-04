import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DialogType,
  FormType,
  ProductDataType,
  ProductGroupType,
} from "@/types/productType";
import { SpinnerCustom } from "../loading";
import { CreateProduct, UpdateProduct } from "@/services/productService";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

interface ProductDialog {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  dialogType: DialogType | null;
  ProductTypeOption: ProductGroupType[];
  data?: ProductDataType;
  fetchData: () => void;
}

export function ProductDialog({
  isOpen,
  onClose,
  loading,
  dialogType,
  ProductTypeOption,
  data,
  fetchData,
}: ProductDialog) {
  const [formData, setFormData] = useState<FormType>();
  const [loadingCE, setLoadingCE] = useState<boolean>(false);

  const initialFormState: FormType = {
    image: "",
    name: "",
    type: 0,
    price: 0,
    isActive: true,
  };

  const handleClose = () => {
    setFormData(initialFormState);
    onClose();
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev: any) => ({
      ...prev,
      image: previewUrl,
    }));
  };

  const uploadImageToCloudinary = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "pos_product_preset");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadData },
    );

    const data = await response.json();
    if (!response.ok) throw new Error("Upload failed");
    return data.secure_url;
  };

  const handleCreate = async () => {
    setLoadingCE(true);

    try {
      let finalImageUrl = formData?.image || "";

      if (selectedFile) {
        try {
          finalImageUrl = await uploadImageToCloudinary(selectedFile);
        } catch (error) {
          toast.error("อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่");
          setLoadingCE(false);
          return;
        }
      }
      const body = {
        image: finalImageUrl,
        name: formData?.name || "",
        type: formData?.type || 1,
        price: Number(formData?.price) || 0,
        isActive: formData?.isActive ?? true,
      };
      console.log("body ready to save:", body);

      if (!body.name || !body.type || body.price <= 0) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน!");
        setLoadingCE(false);
        return;
      }

      let res;

      if (dialogType === "create") {
        res = await CreateProduct(body);
      } else {
        if (!data?.id) {
          toast.error("ไม่พบรหัสสินค้า (ID)");
          setLoadingCE(false);
          return;
        }
        res = await UpdateProduct(data.id, body);
      }

      if (res?.success) {
        fetchData();
        handleClose();
        setSelectedFile(null);
        toast.success(
          dialogType === "create"
            ? "เพิ่มข้อมูลสินค้าสำเร็จ!"
            : "แก้ไขข้อมูลสินค้าสำเร็จ!",
        );
      } else {
        toast.error(res?.message || "ทำรายการไม่สำเร็จ");
      }
    } catch (error) {
      console.error(error);
      toast.error("เกิดปัญหาในการบันทึกข้อมูล!");
    } finally {
      setLoadingCE(false);
    }
  };

  useEffect(() => {
    if (data?.id) {
      setFormData({
        name: data?.name,
        image: data?.image || "",
        type: data?.type,
        price: data?.price || 0,
        isActive: data?.isActive ?? true,
      });
    }
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px] min-h-[60vh] overflow-y-auto">
        {loading ? (
          <div className="max-w-[500px] min-h-[60vh] flex items-center justify-center">
            <SpinnerCustom />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {dialogType === "create"
                  ? "เพิ่มข้อมูลสินค้า"
                  : dialogType === "edit"
                    ? "แก้ไขข้อมูลสินค้า"
                    : "รายละเอียดข้อมูลสินค้า"}
              </DialogTitle>
              <DialogDescription>
                {dialogType === "view"
                  ? "รายละเอียดสินค้าทั้งหมด"
                  : "กรอกข้อมูลสินค้าให้ครบถ้วนแล้วกดบันทึก"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="flex flex-col items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                {formData?.image ? (
                  <div className="relative w-40 h-40 border rounded-lg overflow-hidden group">
                    <img
                      src={formData?.image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                    {dialogType !== "view" && (
                      <button
                        onClick={() => {
                          setFormData((prev: any) =>
                            prev ? { ...prev, image: "" } : prev,
                          );
                          setSelectedFile(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="ลบรูปภาพ"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ) : dialogType !== "view" ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-40 h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-[#6F4E37] hover:text-[#6F4E37] transition-colors"
                  >
                    <ImagePlus size={32} />
                    <span className="text-xs mt-2">เลือกรูปภาพ</span>
                  </div>
                ) : (
                  <div className="w-40 h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                    <span className="text-xs">ไม่มีรูปภาพ</span>
                  </div>
                )}
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    <p>
                      ชื่อสินค้า<span className="text-red-500">*</span>
                    </p>
                  </Label>
                  <Input
                    id="name"
                    value={formData?.name}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    disabled={dialogType === "view"}
                    placeholder="เช่น ลาเต้เย็น"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">
                    <p>
                      หมวดหมู่สินค้า<span className="text-red-500">*</span>
                    </p>
                  </Label>
                  <Select
                    disabled={dialogType === "view"}
                    value={formData?.type ? String(formData.type) : undefined}
                    onValueChange={(value) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        type: Number(value),
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {ProductTypeOption?.map((x) => (
                        <SelectItem key={x.id} value={String(x.id)}>
                          {x.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">
                    <p>
                      ราคา (บาท)<span className="text-red-500">*</span>
                    </p>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData?.price || ""}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    disabled={dialogType === "view"}
                    placeholder="0.00"
                  />
                </div>
                {dialogType !== "create" && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is-active"
                      checked={formData?.isActive ?? true}
                      onCheckedChange={(value) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          isActive: value,
                        }))
                      }
                      disabled={dialogType === "view"}
                    />
                    <Label htmlFor="is-active">เปิดใช้งาน</Label>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {dialogType !== "view" && (
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={loadingCE}>
              ยกเลิก
            </Button>

            <Button
              type="submit"
              className="bg-[#6F4E37] hover:bg-[#5c412e] min-w-[85px]"
              onClick={handleCreate}
              disabled={loadingCE}
            >
              {loadingCE ? (
                <Spinner />
              ) : (
                <>{dialogType === "create" ? "เพิ่มสินค้า" : "บันทึกแก้ไข"}</>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
