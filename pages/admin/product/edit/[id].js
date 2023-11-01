import React from 'react';
import  UpdateSubCategoryMain from '@/components/admin/subCategory/updateSubCategory';
import { getDocuments } from '@/functions/firebase/getData';
const EditSubPage = ({cats}) => {
    return (
        <div>
            <UpdateSubCategoryMain cats={cats}/>
        </div>
    );
}


export default EditSubPage;




// serverside
EditSubPage.getInitialProps = async (context) => {
    const Categories = await getDocuments("cats"); //  []
 
    console.log("data", Categories);
 
    return {
      // props from serverside will go to props in clientside
      cats: Categories,
    };
  };
