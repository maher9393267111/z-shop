import React from 'react';
import  UpdateSubCategoryMain from '@/components/admin/subCategory/updateSubCategory';
import { getDocuments ,getDocument } from '@/functions/firebase/getData';
const EditSubPage = ({cats ,subcats}) => {
    return (
        <div>
            <UpdateSubCategoryMain cats={cats} subcats={subcats}/>
        </div>
    );
}


export default EditSubPage;




// serverside
EditSubPage.getInitialProps = async (context) => {
    const Categories = await getDocuments("cats"); //  []
    const subcat = await getDocument("subcats" ,context.query.id); //  []
    console.log("data", Categories);
 
    return {
      // props from serverside will go to props in clientside
      cats: Categories,
      subcats: subcat
    };
  };
