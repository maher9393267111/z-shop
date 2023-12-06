import React from "react";
import { getDocuments } from "@/functions/firebase/getData";
import AddSubCategoryMain from "@/components/admin/subCategory/addSubCategory";
const AddSubPage = ({ cats ,subcats }) => {
  return (
    <div>
      <AddSubCategoryMain
      cats={cats}
      subcats={subcats}
      />
    </div>
  );
};




export default AddSubPage;


// serverside
AddSubPage.getInitialProps = async (context) => {
  const Categories = await getDocuments("cats"); //  []
  const subcats = await getDocument("subcats" ,context.query.id); //  []




  console.log("data", Categories);




  return {
    // props from serverside will go to props in clientside
    cats: Categories,
    subcats:subcats
  };
};
