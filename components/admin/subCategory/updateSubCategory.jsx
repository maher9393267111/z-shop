import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useRouter } from "next/router";
import { getDocument } from "@/functions/firebase/getData";
import { useAuth } from "@/functions/context";
import SubCategoryForm from "./subCategoryForm";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/functions/firebase";


//  update category page will be same states will  send to categoryForm
const UpdateSubCategoryMain = ({cats}) => {
  const { query, replace } = useRouter();
  const { id } = query;


  // same in
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({ url: "", name: "" });
  const [category ,setCategory] = useState("")




  const isupdate = true;
  const { setPageLoading, pageLoading } = useAuth();


  useEffect(() => {
    const getData = async () => {
      //   col , id will change every time data change  cats ,id
      const singledoc = await getDocument("subcats", id);


      console.log("single-->", singledoc);


      setTitle(singledoc?.title);
      setImage(singledoc?.image);
      setCategory(singledoc?.category)
    };


    if (id) getData();
  }, [id]);


  //


  const handleClick = async (e) => {
    console.log("Update");
    e.preventDefault();
    setPageLoading(true);


    const data = {
      title: title,
      image: image,
      category:category
    };


    try {
      await updateDoc(doc(db, "subcats", id), data);
      toast.success("SubCategory updated successfully");
    } catch (error) {
      setPageLoading(false);
      toast.error(error?.message);
    }
    setPageLoading(false);
  };


  return (
    <AdminLayout>
      <SubCategoryForm
        {...{ title, setTitle, image, setImage, handleClick, isupdate , category ,setCategory , cats ,isupdate}}
      />
    </AdminLayout>
  );
};


export default UpdateSubCategoryMain;
