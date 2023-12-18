

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


const ProductForm = ({
  onFinish,
  initialValues,
  files,
  setFiles,
  cats,
  subcats,
  isupdate = false,
  videoFile,
  setVideoFile,
}) => {
  const [images, setImages] = useState(initialValues?.images || []);
  const [video, setVideo] = useState(initialValues?.video || "");
  const [offerToggle, setOfferToggle] = useState(initialValues?.isoffer ||false);




  const onChange = (checked) => {
    setOfferToggle(checked);
   
};


  return (
    <div className=" w-[80%] mx-auto ">
      <div className=" w-full md:w-[70%] border-2 py-6 px-6">
        <Form
          layout="vertical"
          // onFinish same as submit normal form
          onFinish={(values) =>
            // name of our function
            onFinish({
              ...values,
              images,
              video,
            })
          }
          initialValues={{
            title: initialValues?.title || "",
            category: initialValues?.category || "",
            subcategory: initialValues?.subcategory || "",
            price: initialValues?.price || 0,
            desc: initialValues?.desc || "",
            instock: initialValues?.instock || true,
            images: initialValues?.images || [],
            video: initialValues?.video || "",
            isoffer: initialValues?.isoffer || false,
            discount: initialValues?.discount || 0,
            offerdesc: initialValues?.offerdesc || "",


          }}
        >
          <Form.Item name="title" label="Add Product - Title">
            <Input />
          </Form.Item>


          <Form.Item name="desc" label="Description">
            <TextArea rows={4} />
          </Form.Item>


          <div className=" grid gap-3 md:grid-cols-3 lg:grid-cols-4 grid-cols-1">
            {/* -----category--- */}
            <Form.Item name="category" label="category">
              <Select placeholder="Select Category">
                {cats?.map((category) => {
                  return (
                    <Select.Option key={category?.id} value={category?.title}>
                      {category?.title}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>


            {/* -----subcategory--- */}
            <Form.Item name="subcategory" label="subcategory">
              <Select placeholder="Select SubCategory">
                {subcats?.map((subcat) => {
                  return (
                    <Select.Option key={subcat?.id} value={subcat?.title}>
                      {subcat?.title}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>


            <div className=" flex  md:col-span-2 gap-2 items-center justify-center md:justify-start">
              {/* ----Price--- */}


              <Form.Item name="price" label="Price">
                <InputNumber min={0} />
              </Form.Item>


              {/* ----InStock----- */}


              <Form.Item name="instock" label="InStock">
                <Switch
                  // checked="true"
                  defaultChecked
                  className=" bg-red-400 "
                />
              </Form.Item>


                            {/* ----isoffer----- */}


                            <Form.Item name="isoffer" label="IsOffer">
                <Switch
                  checked={offerToggle}
                  // defaultChecked
                  className=" bg-red-400 "
                  onChange={onChange}
                />
              </Form.Item>




            </div>
          </div>
                {offerToggle ?


                <div className="flex-col flex md:flex-row md:gap-12 ">
                          {/* ----offerDesciption--- */}


                <Form.Item  className="md:w-[70%]" name="offerdesc" label="OfferDesc">
                <TextArea rows={2} />
                </Form.Item>


                              {/* ----Discount--- */}


              <Form.Item name="discount" label="Discount">
                <InputNumber min={0} />
              </Form.Item>


                </div>
                 : null }


          {/* -----images upload----- */}


          <div>
            <Upload
              accept="image/*"
              multiple
              // files is data of images will be uploaded to firebase/storage
              beforeUpload={(file) => {
                setFiles((prev) => [...prev, file]);
                return false;
              }}
              listType="picture-card"
              onRemove={(file) => {
                console.log("fileDATA", file);
                setFiles((prev) => {
                  const index = prev.indexOf(file);
                  const newFileList = prev.slice();
                  newFileList.splice(index, 1);
                  return newFileList;
                });


                console.log("files", files);
              }}
            >
              Upload Images {files?.length}
            </Upload>
          </div>


          {/* -----show product images {update product} ---- */}


          <div className="flex flex-wrap gap-3 mt-2 ">
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
          </div>


          {/* -----Video upload----- */}


          <div>
            <Upload
              accept="video/*"
              maxCount={1}
              // file is data of image will be uploaded to firebase/storage
              beforeUpload={(file) => {
                setVideoFile(file);
                // setFiles((prev) => [...prev, file]);
                return false;
              }}
              listType="picture-card"
              onRemove={() => setVideoFile("")}
            >
              Upload Video
            </Upload>
          </div>


          {/* -----Video delete----- */}


          <div className="flex flex-wrap gap-3 mt-2 ">
            {video ? (
              <div>
                <img
                  src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlkZW8lMjBpY29ufGVufDB8fDB8fHww"
                  className="w-20 h-20 rounded-full "
                />
                <h1
                  onClick={() => {
                    setVideo("");
                  }}
                  className="text-center cursor-pointer text-red-600"
                >
                  remove
                </h1>
              </div>
            ) : (
              false
            )}
          </div>


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


export default ProductForm;












// import React, { useState, useEffect } from "react";
// import {
//   getDocuments,
//   antdFieldValidation,
// } from "@/functions/firebase/getData";
// import {
//   Button,
//   Form,
//   Upload,
//   message,
//   Input,
//   Select,
//   InputNumber,
//   Switch,
// } from "antd";
// const { TextArea } = Input;

// import Image from "next/image";

// const ProductForm = ({
//   onFinish,
//   initialValues,
//   files,
//   setFiles,
//   cats,
//   subcats,
//   isupdate = false,
//   videoFile,
//   setVideoFile,
// }) => {
//   const [images = [], setImages] = useState(initialValues?.images || []);
//   const [video, setVideo] = useState(initialValues?.video || "");
//   const [ishotstate, setIsHotState] = useState(false);

//   const onChange = (value) => {
//     console.log("value--> ", value);
//     setIsHotState(value);
//   };

//   return (
//     <div className=" border-2 ml-2  p-6 w-[90%] md:w-1/2">
//       <Form
//         layout="vertical"
//         onFinish={(values) =>
//           onFinish({
//             ...values,
//             images,
//             video,
//           })
//         }
//         initialValues={{
//           title: initialValues?.title || "",
//           images: initialValues?.images || [],
//           category: initialValues?.category || "",
//           subcategory: initialValues?.subcategory || "",
//           desc: initialValues?.desc || "",
//           instock: initialValues?.instock || "",
//           price: initialValues?.price || "",
//           video: initialValues?.price || "",
//         }}
//       >
//         <div className="">
//           <Form.Item label="title" name="title" rules={antdFieldValidation}>
//             <Input type="text" name="title" />
//             {/* <Input /> */}
//           </Form.Item>
//         </div>

//         <Form.Item name="desc" label="Desc">
//           <TextArea rows={4} />
//         </Form.Item>

//         <div className="grid gap-4  grid-cols-1 lg:grid-cols-4 md:grid-cols-3">
//           <Form.Item name="category" label="Select">
//             <Select>
//               <Select.Option value="">Select Category</Select.Option>
//               {cats.map((cat, index) => {
//                 return (
//                   <Select.Option key={index} value={cat?.title}>
//                     {cat?.title}
//                   </Select.Option>
//                 );
//               })}
//             </Select>
//           </Form.Item>

//           <Form.Item name="subcategory" label="Select">
//             <Select>
//               <Select.Option value="">Select SubCategory</Select.Option>
//               {subcats.map((subcat, index) => {
//                 return (
//                   <Select.Option key={index} value={subcat?.title}>
//                     {subcat?.title}
//                   </Select.Option>
//                 );
//               })}
//             </Select>
//           </Form.Item>

//           <Form.Item name="price" label="price">
//             <InputNumber />
//           </Form.Item>

//           <Form.Item name="instock" label="Switch" valuePropName="checked">
//             <Switch />
//           </Form.Item>

//           {/* onChange={onChange */}

//           <Form.Item name="inhot" label="isHot">
//             <Switch checked={ishotstate} onChange={(e) => onChange(e)} />
//           </Form.Item>

//           {ishotstate ? "true" : "false"}
//         </div>





//         <div className="">
//           <Upload
//             accept="image/*"
//             multiple
//             beforeUpload={(file) => {
//               setFiles((prev) => [...prev, file]);
//               return false;
//             }}
//             listType="picture-card"
//             onRemove={(file) => {
//               console.log("fileDATA", file);
//               setFiles((prev) => {
//                 const index = prev.indexOf(file);
//                 const newFileList = prev.slice();
//                 newFileList.splice(index, 1);
//                 return newFileList;
//               });

//               console.log("files", files);
//             }}
//           >
//             Upload Images
//           </Upload>
//         </div>

//         <div className="  my-5 gap-5">
//           <div className=" my-2 flex-grow flex-wrap  flex   gap-5 col-span-9 ">
//             {images?.map((image, index) => (
//               <div
//                 key={index}
//                 className="p-5 border-solid w-1/4 border border-gray-300 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2"
//               >
//                 <img
//                   className="w-20 h-20 object-cover"
//                   src={image}
//                   alt={image}
//                   // width={80}
//                   // height={80}
//                 />

//                 <span
//                   className="underline  cursor-pointer text-red-600"
//                   onClick={() => {
//                     setImages((prev) => {
//                       const temp = [...prev];
//                       temp.splice(index, 1);
//                       return temp;
//                     });
//                   }}
//                 >
//                   Remove
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <Upload
//             accept="video/*"
//             maxCount={1}
//             // file is data of image will be uploaded to firebase/storage
//             beforeUpload={(file) => {
//               setVideoFile(file);
//               // setFiles((prev) => [...prev, file]);
//               return false;
//             }}
//             listType="picture-card"
//             onRemove={() => setVideoFile("")}
//           >
//             Upload Video
//           </Upload>
//         </div>

//         <div className="  flex justify-center">
//           <Button
//             htmlType="submit"
//             className="!bg-blue-500 text-white"
//             type="primary"
//           >
//             Save
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default ProductForm;
