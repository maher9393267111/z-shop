import React from "react";
import AdminLayout from "../AdminLayout";
import SubCategoryForm from "./subCategoryForm";
import { useState } from "react";
import { db } from "@/functions/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "@/functions/context";

const AddSubCategoryMain = ({ cats }) => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState({ url: "", name: "" });
    const [category, setCategory] = useState("");
  
  
    const { setPageLoading, pageLoading } = useAuth();
  
  
    const handleClick = async (e) => {
      e.preventDefault();
  
  
      setPageLoading(true);
  
  
      const data = { title: title, image: image, category: category };
  
  
      await addDoc(collection(db, "subcats"), data);
  
  
      setPageLoading(false);
      toast.success("SubCategory Uploaded Successfully");
      setTitle("");
      setImage({ name: "", url: "" });
      setCategory("");
    };
  
  
    return (
      <AdminLayout>
        {cats?.length}
        <SubCategoryForm
          {...{
            title,
            setTitle,
            image,
            setImage,
            handleClick,
            cats,
            category,
            setCategory,
          }}
        />
      </AdminLayout>
    );
  };
  
  
  export default AddSubCategoryMain;
  