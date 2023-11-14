import React, { useState, useEffect } from "react";
import {
  getDocuments,
  antdFieldValidation,
} from "@/functions/firebase/getData";
import {
  Button,
  Form,
  Upload,
  message,
  Input,
  Select,
  Switch,
  InputNumber,
} from "antd";
const { TextArea } = Input;

import Image from "next/image";

const CategoryForm = ({
  onFinish,
  initialValues,
  files,
  setFiles,
  isupdate = false,
}) => {
  const [images, setImages] = useState(initialValues?.images || "");

  return (
    <div className=" w-[80%] mx-auto ">
      <div className=" w-full md:w-1/2 border-2 py-6 px-6">
        <Form
          layout="vertical"
          // onFinish same as submit normal form
          onFinish={(values) =>
            // name of our function
            onFinish({
              ...values,
              images,
            })
          }
          initialValues={{
            title: initialValues?.title || "",
            images: initialValues?.images || "",
          }}
        >
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>

          <div className=" grid gap-3 md:grid-cols-4 grid-cols-1"></div>

          {/* -----images upload----- */}

          <div>
            <Upload
              accept="image/*"
              maxCount={1}
              // file is data of image will be uploaded to firebase/storage
              beforeUpload={(file) => {
                setFiles(file);
                // setFiles((prev) => [...prev, file]);
                return false;
              }}
              listType="picture-card"
              // onChange={(e) => {
              //   setFiles("");
                
              //   //form.setFieldsValue({ linkupload: "" });
              // }}
              onRemove={()=>{setFiles("")
              console.log('Removed files')
            }            
            
            }
            >
              Upload Image
            </Upload>
          </div>

          {/* -----show product images {update product} ---- */}

          {/* <div className="flex flex-wrap gap-3 mt-2 ">
            {images?.map((data, index) => (
              <div key={index}>
                <img src={data} className="w-20 h-20 rounded-full " />
                <h1
                  onClick={() => {
                    // prev all previous images
                    setImages((prev) => {
                      // all images put into new array
                      const temp = [...prev];
                      // delete  image with clicked index
                      temp.splice(index, 1);
                      // return this new array after delete clicked image
                      return temp;
                    });
                  }}
                  className="text-center cursor-pointer text-red-600"
                >
                  remove
                </h1>
              </div>
            ))}
          </div> */}


{images &&
<div className="  w-24 md:w-24 relative">
<img className=" w-24 h-24  rounded-lg" src={images} alt="" />

<p
onClick={()=>setImages("")}
className= "  !text-red-500 cursor-pointer text-white font-semibold text-center">Remove</p>


</div>

}
        
      

          <div className=" ">
            <Button
              className=" mt-4  block w-1/3 bg-blue-500 mx-auto"
              type="primary"
              htmlType="submit"
            >
              Publish
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CategoryForm;

// import React from "react";
// import { useState } from "react";
// import { uploadFile } from "@/functions/firebase/addImage";
// import { toast } from "react-toastify";
// import { handleDeleteImage } from "@/functions/firebase/addImage";
// const CategoryForm = ({
//   title,
//   setTitle,
//   image,
//   setImage,
//   handleClick,
//   isupdate = false,
// }) => {
//   const [file, setFile] = useState("");

//   const uploadImage = async (e) => {
//     console.log("file-->", file);

//     e.preventDefault();

//     if (!file) {
//       // return with nothing will stop function and  all logic will came after it
//       toast.error("file is Empty you have to add some files before upload");
//       return;
//     }

//     // if you select same image again dont delete or add any thing

//     if (file.name === image.name) {
//       toast.error("sorry you select same image again");
//       return;
//     }

//     const filePath = `cats/${file?.name}`;

//     // from updateCategory page this image is not empty
//     // if image came from updatecategory page
//     //  delete it then add new image
//     //&& image?.name !== file.name
//     if (isupdate && image?.name) {
//       // (from ,img)  from is folder of image  , image is object  have url and name to delete it
//       await handleDeleteImage("cats", image);
//       toast.success("old image deleted success");
//     }

//     try {
//       // upload file data and folder path to uploadFile Function
//       // if this function success will return  image url {link}

//       const url = await uploadFile(file, filePath);

//       setImage({ name: file.name, url: url });

//       toast.success("Image Uploaded Successfully");
//       setFile({});

//       console.log("url in form", url);
//     } catch (error) {
//       toast.error("something wrong");
//     }
//   };

//   //

//   return (
//     <div>
//       <div className="w-full  p-4">
//         <div className="w-[70%] md:!w-[40%] ">
//           <div className="    ">
//             <div className=" text-center mb-4 text-orange-400  font-semibold text-2xl ">
//               {isupdate ? "Update Category Form" : "Add Category Form"}
//             </div>

//             {file?.name}
//             <p className=" mb-2 text-center  font-semibold">Category title</p>
//             <input
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border-2 text-black font-medium rounded-md border-teal-400 py-3 px-6"
//               type="text"
//               placeholder="title"
//               value={title}
//             />
//           </div>

//           <div className=" my-4">
//             <div className="w-full flex">
//               <input
//                 type="file"
//                 id="file"
//                 name=""
//                 className="text-black font-medium rounded-md border-teal-400 py-3 px-6 border-2 border-r-0 rounded-r-none"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               <button
//                 onClick={uploadImage}
//                 type="button"
//                 className="rounded-l-none   inline-block shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:text-teal-700  focus:outline-none focus:ring active:text-teal-500 "
//                 //   onClick={uploadImage}
//               >
//                 Upload Image
//               </button>
//             </div>

//             <div className="text-xl font-cutiveMono text-center py-2">or</div>
//             <div className="w-full">
//               <input
//                 className="w-full border-2 text-black font-medium rounded-md border-teal-400 py-3 px-6"
//                 type="text"
//                 placeholder="Image url"
//                 onChange={(e) => setImage({ ...image, url: e.target.value })}
//                 value={image?.url}
//               />
//             </div>
//           </div>

//           {/* --------show image   in updateCategory page ---- */}

//           {isupdate && (
//             <div>
//               <img
//                 className=" rounded-sm object-cover object-center my-4 w-[200px] h-[200px] mx-auto"
//                 src={image?.url}
//                 alt=""
//               />
//             </div>
//           )}

//           <div className="w-full md:w-full text-center">
//             <button
//               onClick={handleClick}
//               className=" block   w-[40%] m-auto shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition   focus:outline-none focus:ring active:text-teal-500 "
//             >
//               Publish
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryForm;
