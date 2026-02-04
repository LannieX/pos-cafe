'use client';

import { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary';

const Productpage2 = () => {

    const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  return (
    <div className="p-4 border rounded-lg">
      
      <CldUploadWidget 
        uploadPreset="pos_product_preset"
        onSuccess={(result: any) => {
          console.log("Upload Success:", result.info);
          
          setImageUrl(result.info.secure_url); 
          setPublicId(result.info.public_id);
        }}
      >
        {({ open }) => {
          return (
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => open()}
            >
              Upload Product Image
            </button>
          );
        }}
      </CldUploadWidget>
      {imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-600 mb-2">อัปโหลดสำเร็จ! URL คือ:</p>
          <code className="block bg-gray-100 p-2 text-xs break-all mb-2">
            {imageUrl}
          </code>
          <img 
            src={imageUrl} 
            alt="Uploaded Product" 
            className="w-32 h-32 object-cover rounded shadow"
          />
        </div>
      )}

    </div>
  );
}

export default Productpage2