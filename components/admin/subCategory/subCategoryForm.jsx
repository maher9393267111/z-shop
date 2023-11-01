
import React from "react";
import { Box } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { uploadFile } from "@/functions/firebase/addImage";
import { toast } from "react-toastify";
import { handleDeleteImage } from "@/functions/firebase/addImage";
import { FaImage as Image } from "react-icons/fa6";
const SubCategoryForm = ({
  title,
  setTitle,
  image,
  setImage,
  handleClick,
  cats,
  isupdate = false,
  category,
  setCategory,
}) => {
  const [file, setFile] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const fileInputRef = useRef(null);


  const uploadImage = async (e) => {
    console.log("file-->", file);


    e.preventDefault();


    // if noImage selected Throw Error
    if (!file) {
      // return with nothing will stop function and  all logic will came after it
      toast.error("file is Empty you have to add some files before upload");
      return;
    }


    if (file.name === image.name) {
      toast.error("sorry you select same image again");
      return;
    }


    const filePath = `subcats/${file?.name}`;


    // ------------Delete OldImage --------
    // from updateCategory page this image is not empty
    // if image came from updatecategory page
    //  delete it then add new image
    //&& image?.name !== file.name
    if (isupdate && image?.name) {
      // (from ,img)  from is folder of image  , image is object  have url and name to delete it
      await handleDeleteImage("cats", image);
      toast.success("old image deleted success");
    }


    // ----------Add newImage --------


    try {
      // upload file data and folder path to uploadFile Function
      // if this function success will return  image url {link}


      const url = await uploadFile(file, filePath);


      setImage({ name: file.name, url: url });


      toast.success("Image Uploaded Successfully");
      setFile({});


      console.log("url in form", url);
    } catch (error) {
      toast.error("something wrong");
    }
  };


  return (
    <div>
      <div className="w-full  p-4">
        <div className="w-[70%] md:!w-[40%] ">
          {title}
          <div className="    ">
            <div className=" text-center mb-4 text-orange-400  font-semibold text-2xl ">
              {isupdate ? "Update SubCategory Form" : "Add SubCategory Form"}
            </div>


            {file?.name}
            <p className=" mb-2 text-center  font-semibold">
              SubCategory title
            </p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 text-black font-medium rounded-md border-teal-400 py-3 px-6"
              type="text"
              placeholder="title"
              value={title}
            />
          </div>


          <div className=" my-4">
            <>
              <div className="w-full flex">
                <input
                  id="logo-input"
                  ref={fileInputRef}
                  type="file"
                  name=""
                  className="text-black font-medium rounded-md border-teal-400 py-3 px-6 border-2 border-r-0 rounded-r-none"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button
                  onClick={uploadImage}
                  type="button"
                  className="rounded-l-none   inline-block shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:text-teal-700  focus:outline-none focus:ring active:text-teal-500 "
                  //   onClick={uploadImage}
                >
                  Upload Image
                </button>
              </div>
            </>


            <div className="text-xl font-cutiveMono text-center py-2">or</div>
            <div className="w-full">
              <input
                className="w-full border-2 text-black font-medium rounded-md border-teal-400 py-3 px-6"
                type="text"
                placeholder="Image url"
                onChange={(e) => setImage({ ...image, url: e.target.value })}
                value={image?.url}
              />
            </div>
          </div>


          {/* ------select category---- */}
          <select 
          className="w-1/5 border-2 text-black font-medium rounded-md border-teal-400 py-3 px-6 mb-4 text-lg"
            value={category}
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" >Select..</option> 
            {cats?.map((cat) => (
              <option key={cat?.id} value={cat?.title}>
                {cat?.title}
              </option>
            ))}
          </select>


          {/* --------show image   in updateCategory page ---- */}


          {isupdate && (
            <div>
              <img
                className=" rounded-sm object-cover object-center my-4 w-[200px] h-[200px] mx-auto"
                src={image?.url}
                alt=""
              />
            </div>
          )}


          <div className="w-full md:w-full text-center">
            <button
              onClick={handleClick}
              className=" block   w-[40%] m-auto shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition   focus:outline-none focus:ring active:text-teal-500 "
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SubCategoryForm;
