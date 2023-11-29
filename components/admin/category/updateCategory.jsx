import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { getDocument } from "@/functions/firebase/getData";
import { useAuth } from "@/functions/context";
import CategoryForm from "./categoryForm";
import { message } from "antd";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/functions/firebase";
import AdminLayout from "../AdminLayout";

import { uploadImages, deleteImage } from "@/functions/firebase/getData";
const UpdateCategorytMain = ({ category }) => {
  const { query, replace } = useRouter();
  const { id } = query;
  //const [product, setProduct] = useState(null);
  const [file, setFile] = useState("");

  const isupdate = true;
  const { setPageLoading, pageLoading } = useAuth();

  const initialValues = category;

  console.log("?????-?????-" + initialValues);

  const onFinish = async (values) => {
    try {
      setPageLoading(true);

      // delete image
      console.log("delete image", values);

      if ( !file && !values.image )
      {
        message.error("images not found and No files Selected")
        return 
      }

      if (file) {
        message.error("delete image old" )
      await deleteImage(initialValues.image);
         values.image = await uploadImages(file, true, "cats");
      //  return
      }



      await updateDoc(doc(db, "cats", id), values);

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
      <CategoryForm
        {...{ initialValues, file, setFile, isupdate, onFinish }}
      />
    </AdminLayout>
  );
};

export default UpdateCategorytMain;

// import React, { useEffect, useState } from "react";
// import AdminLayout from "../AdminLayout";
// import { useRouter } from "next/router";
// import { getDocument } from "@/functions/firebase/getData";
// import { useAuth } from "@/functions/context";
// import CategoryForm from "./categoryForm";
// import { toast } from "react-toastify";
// import { updateDoc, doc } from "firebase/firestore";
// import { db } from "@/functions/firebase";

// //  update category page will be same states will  send to categoryForm
// const UpdateCategoryMain = () => {
//   const { query, replace } = useRouter();
//   const { id } = query;

//   // same in
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState({ url: "", name: "" });

//   const isupdate = true;
//   const { setPageLoading, pageLoading } = useAuth();

//   useEffect(() => {
//     const getData = async () => {
//       //   col , id will change every time data change  cats ,id
//       const singledoc = await getDocument("cats", id);

//       console.log("single-->", singledoc);

//       setTitle(singledoc?.title);
//       setImage(singledoc?.image);
//     };

//     if (id) getData();
//   }, [id]);

//   //

//   const handleClick = async (e) => {
//     console.log("Update");
//     e.preventDefault();
//     setPageLoading(true);

//     const data = {
//       title: title,
//       image: image,
//     };

//     try {
//       await updateDoc(doc(db, "cats", id), data);
//       toast.success("Hero updated successfully");
//     } catch (error) {
//       setPageLoading(false);
//       toast.error(error?.message);
//     }
//     setPageLoading(false);
//   };

//   return (
//     <AdminLayout>
//       <CategoryForm
//         {...{ title, setTitle, image, setImage, handleClick, isupdate }}
//       />
//     </AdminLayout>
//   );
// };

// export default UpdateCategoryMain;
