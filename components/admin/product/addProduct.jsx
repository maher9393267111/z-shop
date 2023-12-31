import React from "react";
import ProductForm from "./productForm";
import { message } from "antd";
import { useAuth } from "@/functions/context";
import { useState } from "react";
import { db } from "@/functions/firebase";
import { addDoc, collection , serverTimestamp } from "firebase/firestore";
import { uploadImages, deleteImages } from "@/functions/firebase/getData";
import AdminLayout from "../AdminLayout";
const AddProductMain = ({ cats, subcats }) => {
  const { setPageLoading, pageLoading } = useAuth();
  const [files, setFiles] = useState([]);
  const [videoFile, setVideoFile] = useState("");

  const onFinish = async (values) => {
    try {
      setPageLoading(true);
      console.log("datra--->", values);

      values.images = await uploadImages(files);

      if (videoFile) {
        values.video = await uploadImages(videoFile, true);
        message.success("video uploaded successfully");
      }

      values.timestamp =  serverTimestamp();
      await addDoc(collection(db, "products"), values);
      message.success("Product Added Successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      setPageLoading(false);
      // dispatch(SetLoading(false));
    }
  };

  return (
    <AdminLayout>
      <ProductForm
        {...{
          onFinish,
          subcats,
          cats,
          files,
          setFiles,
          videoFile,
          setVideoFile,
        }}
      />
    </AdminLayout>
  );
};

export default AddProductMain;
