import { FaBuromobelexperte } from "react-icons/fa6";
import { storage } from "./index";
import { getDownloadURL,ref,uploadBytes,deleteObject } from "@firebase/storage";


export const uploadFile = (file , filepath) => {
    
    return new Promise(async(resolve , reject)=>{

        const storageRef = ref(storage , filepath)
        // download for image
        try {
            await uploadBytes(storageRef, file) ;
            const url = await getDownloadURL(storageRef);
            console.log("image URL ---->", url);
            resolve(url)
        }

        catch (error) {
            reject(error);
        }

    });
};


export const handleDeleteImage = async (from, img) => {
    try {
      console.log("data", from, img);
      const deleteRef = ref(storage, `${from}/${img.name}`);
  
      await deleteObject(deleteObject);
    } catch (error) {
      console.log("error", error?.message);
    }
  };
  