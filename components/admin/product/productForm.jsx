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
  InputNumber,
  Switch,
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
  const [images = [], setImages] = useState(initialValues?.images || []);
  const [video, setVideo] = useState(initialValues?.video || "");
  const [ishotstate, setIsHotState] = useState(false);

  const onChange = (value) => {
    console.log("value--> ", value);
    setIsHotState(value);
  };

  return (
    <div className=" border-2 ml-2  p-6 w-[90%] md:w-1/2">
      <Form
        layout="vertical"
        onFinish={(values) =>
          onFinish({
            ...values,
            images,
            video,
          })
        }
        initialValues={{
          title: initialValues?.title || "",
          images: initialValues?.images || [],
          category: initialValues?.category || "",
          subcategory: initialValues?.subcategory || "",
          desc: initialValues?.desc || "",
          instock: initialValues?.instock || "",
          price: initialValues?.price || "",
          video: initialValues?.price || "",
        }}
      >
        <div className="">
          <Form.Item label="title" name="title" rules={antdFieldValidation}>
            <Input type="text" name="title" />
            {/* <Input /> */}
          </Form.Item>
        </div>

        <Form.Item name="desc" label="Desc">
          <TextArea rows={4} />
        </Form.Item>

        <div className="grid gap-4  grid-cols-1 lg:grid-cols-4 md:grid-cols-3">
          <Form.Item name="category" label="Select">
            <Select>
              <Select.Option value="">Select Category</Select.Option>
              {cats.map((cat, index) => {
                return (
                  <Select.Option key={index} value={cat?.title}>
                    {cat?.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name="subcategory" label="Select">
            <Select>
              <Select.Option value="">Select SubCategory</Select.Option>
              {subcats.map((subcat, index) => {
                return (
                  <Select.Option key={index} value={subcat?.title}>
                    {subcat?.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name="price" label="price">
            <InputNumber />
          </Form.Item>

          <Form.Item name="instock" label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>

          {/* onChange={onChange */}

          <Form.Item name="inhot" label="isHot">
            <Switch checked={ishotstate} onChange={(e) => onChange(e)} />
          </Form.Item>

          {ishotstate ? "true" : "false"}
        </div>





        <div className="">
          <Upload
            accept="image/*"
            multiple
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
            Upload Images
          </Upload>
        </div>

        <div className="  my-5 gap-5">
          <div className=" my-2 flex-grow flex-wrap  flex   gap-5 col-span-9 ">
            {images?.map((image, index) => (
              <div
                key={index}
                className="p-5 border-solid w-1/4 border border-gray-300 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2"
              >
                <img
                  className="w-20 h-20 object-cover"
                  src={image}
                  alt={image}
                  // width={80}
                  // height={80}
                />

                <span
                  className="underline  cursor-pointer text-red-600"
                  onClick={() => {
                    setImages((prev) => {
                      const temp = [...prev];
                      temp.splice(index, 1);
                      return temp;
                    });
                  }}
                >
                  Remove
                </span>
              </div>
            ))}
          </div>
        </div>

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

        <div className="  flex justify-center">
          <Button
            htmlType="submit"
            className="!bg-blue-500 text-white"
            type="primary"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
