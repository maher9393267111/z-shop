
import React from "react";
import CategoryForm from "./categoryForm";
import { toast } from "react-toastify";
import { useAuth } from "@/functions/context";
import { useState } from "react";
import { db } from "@/functions/firebase";
import { addDoc, collection } from "firebase/firestore";
import { uploadImages } from "@/functions/firebase/getData";
import { message } from "antd";
import AdminLayout from "../AdminLayout";

const AddCategoryMain = ({ products }) => {
  const [file, setFile] = useState("");
  const { setPageLoading, pageLoading } = useAuth();
  const isupdate = true;

  const onFinish = async (values) => {
    console.log("values-->", values);
    console.log("filess", file);

    ////urls [array of images]

    if(!file) {
      message.error("Please select images")
      return;
    }

    else {
    values.image = await uploadImages(file ,true ,'cats');
message.success(values.image)
    await addDoc(collection(db, "cats"), values);

    message.success(`Category Uploaded Successfully`);
    }
  };

  return (
    <AdminLayout>
      <CategoryForm {...{ onFinish, file, setFile }} />
    </AdminLayout>
  );
};

export default AddCategoryMain;














// import React from 'react';
// import AdminLayout from '../AdminLayout';
// import CategoryForm from './categoryForm';
// import { useState } from 'react';
// import { db } from '@/functions/firebase';
// import { addDoc ,collection } from 'firebase/firestore';
// import { toast } from 'react-toastify';
// import { useAuth } from '@/functions/context';

// const AddCategoryMain = () => {

// const [title,setTitle] = useState("");
// const [image , setImage] = useState({url:'' , name:''})
// const {setPageLoading,pageLoading} = useAuth();

// const handleClick = async (e)=> {
//     e.preventDefault();
//     setPageLoading(true)

//     const data = {title:title , image:image}

// await addDoc(collection(db, 'cats'), data)

//     setPageLoading(false)
//     toast.success('Category Uploaded Successfully')
//     setTitle('')
//     setImage({name:"", url:""})

// }


//     return (
//         <AdminLayout>

//         <CategoryForm
//        {...{title , setTitle , image , setImage, handleClick}}
       
//         />

//         </AdminLayout>
//     );
// }

// export default AddCategoryMain;
