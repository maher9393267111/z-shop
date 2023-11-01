import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useRouter } from "next/router";
import { getDocument } from "@/functions/firebase/getData";
import { useAuth } from "@/functions/context";
import CategoryForm from "./categoryForm";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/functions/firebase";


//  update category page will be same states will  send to categoryForm
const UpdateCategoryMain = () => {
  const { query, replace } = useRouter();
  const { id } = query;


  // same in
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({ url: "", name: "" });


  const isupdate = true;
  const { setPageLoading, pageLoading } = useAuth();


  useEffect(() => {
    const getData = async () => {
      //   col , id will change every time data change  cats ,id
      const singledoc = await getDocument("cats", id);


      console.log("single-->", singledoc);


      setTitle(singledoc?.title);
      setImage(singledoc?.image);
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
    };


    try {
      await updateDoc(doc(db, "cats", id), data);
      toast.success("Hero updated successfully");
    } catch (error) {
      setPageLoading(false);
      toast.error(error?.message);
    }
    setPageLoading(false);
  };


  return (
    <AdminLayout>
      <CategoryForm
        {...{ title, setTitle, image, setImage, handleClick, isupdate }}
      />
    </AdminLayout>
  );
};


export default UpdateCategoryMain;
