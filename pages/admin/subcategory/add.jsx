import React from "react";
import { getDocuments } from "@/functions/firebase/getData";
import AddSubCategoryMain from "@/components/admin/subCategory/addSubCategory";
const AddSubPage = ({ cats }) => {
  return (
    <div>
      <AddSubCategoryMain cats={cats} />
    </div>
  );
};


export default AddSubPage;


// serverside
AddSubPage.getInitialProps = async (context) => {
  const Categories = await getDocuments("cats"); //  []


  console.log("data", Categories);


  return {
    // props from serverside will go to props in clientside
    cats: Categories,
  };
};
