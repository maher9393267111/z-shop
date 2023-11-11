import {
  DocumentData,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  limit,
} from "firebase/firestore";
//import { db, storage } from "./index";
import { db, storage } from ".";
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { message } from "antd";
// import { v4 as uuidv4 } from 'uuid';

//step-1- get number of documents in one Collection
export const getCount = async (col) => {
  //col --> {products , categories , subcategories}
  const colRef = collection(db, col);
  const snapshot = await getCountFromServer(colRef);
  return snapshot.data().count;
};

function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    id: doc.id,
    // createdAt: data.createdAt..... === true or  false
    // createdAt: data.createdAt?.toMillis() || 0,
    // updatedAt: data.updatedAt?.toMillis() || 0,
  };
}

// 3nde so2el m3yan 3la instock aw collection motghayira hasab price product name,
//review bade 3dad m3ayn mnil data
// query and limmit is params
export const getDocuments = async (col, querydata = null, limit = null) => {
  const queryConstraints = [];
  // query here is value from function {price === 200} or {name === adidas} ....
  if (querydata !== null) queryConstraints.push(where(...querydata));
  if (limit !== null) queryConstraints.push(limit(limit));
  //col motghayir marra category marra sub category marra production

  // where(..) , where(''') , where ....
  const ref = collection(db, col);
  // query here is method from firebase to filter data
  const docsRef = query(ref, ...queryConstraints);
  //  if query params is exist and limit is exist  filter data else show all data from collection
  const documents = (await getDocs(docsRef)).docs.map(postToJSON);

  return documents; //  [] array of data named categories
  //, products  , subcategories in /admin/.../all
};

// -----------------------------

// get Single item from firestore ==> ... product ,subcategory , category , review ...

//col  is collection changeable  , id is id of doucment to get from firestore changeble

export const getDocument = async (col, id) => {
  const document = postToJSON(await getDoc(doc(db, col, id)));

  return document;
};

// col is collection name -->  category  or product
// item is  object that have  data
export const handleDelete = (col, item, isproduct = false, isUser) => {
  console.log("item", item);
  // path of document we well delete
  const itemDoc = doc(db, col, item.id);
  // delete document from firestore then delete document images
  deleteDoc(itemDoc).then(async () => {
    if (isproduct) {
      deleteImages(item?.images);
    } else {
      // specifu image folder and name to delete it => col is folder  image.name is image name will deleted from storage

      const desertRef = isUser
        ? ref(storage, `${col}/${item?.imageId}`)
        : ref(storage, `${col}/${item.image.name}`);

      await deleteObject(desertRef);
      message.success("Image deleted successfully");
    }

    window.location.reload();
  });
};

// ------------------------

import { v4 as uuidv4 } from "uuid";
export const uploadImages = async (files) => {
  const urls = [];
  await Promise.all(
    files.map(async (file) => {
      const imageRef = ref(storage, uuidv4());
      const res = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(res.ref);
      urls.push(url);
    })
  );

  return urls;
};

export const deleteImages = async (images) => {
  try {
    const deleteResponses = await Promise.all(
      images.map((image) => deleteObject(ref(storage, image)))
    );
    return deleteResponses;
  } catch (error) {
    throw error;
  }
};

export const antdFieldValidation = [
  {
    required: true,
    message: "This field is required",
  },
];

export const updateUserRole = async (userId, updatedRole) => {
  console.log("Updating user role", userId, updatedRole);
  if (["standard", "moderator", "admin"].includes(updatedRole)) {
    const usersCollection = doc(db, "users", userId);

    try {
      // Update the role attribute in the user document
      await updateDoc(usersCollection, { role: updatedRole });
      // successCallback();
      message.success("User role updated successfully");
      console.log("User role successfully updated!");
    } catch (error) {
      console.error("Error updating user role:", error);
      message.error("User role): " + error.message);
    }
  } else {
    console.error(
      "Invalid updatedRole parameter. Please provide 'standard', 'moderator', or 'admin'."
    );
  }
};
