import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { getDocument } from "@/functions/firebase/getData";
import { useAuth } from "@/functions/context";
import ProductForm from "./productForm";
import { message } from "antd";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/functions/firebase";
import AdminLayout from "../AdminLayout";

import { uploadImages, deleteImages } from "@/functions/firebase/getData";
const UpdateProductMain = ({ product, cats, subcats }) => {
  const { query, replace } = useRouter();
  const { id } = query;
  //const [product, setProduct] = useState(null);
  const [files, setFiles] = useState([]);

  const isupdate = true;
  const { setPageLoading, pageLoading } = useAuth();

  const initialValues = product;

  console.log("?????-?????-" + initialValues);

  const onFinish = async (values) => {
    try {
      setPageLoading(true);

      // delete images
      const imagesToDelete = product.images.filter(
        (image) => !values.images.includes(image)
      );
      await deleteImages(imagesToDelete);
      const newImagesUploaded = await uploadImages(files);
      values.images = [...values.images, ...newImagesUploaded];
      await updateDoc(doc(db, "products", id), values);

      message.success("Product Updated Successfully");
      // router.push("/admin?tab=1");
    } catch (error) {
      message.error(error.message);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <AdminLayout>
      <ProductForm
        {...{
          initialValues,
          cats,
          subcats,
          files,
          setFiles,
          isupdate,
          onFinish,
        }}
      />
    </AdminLayout>
  );
};

export default UpdateProductMain;
