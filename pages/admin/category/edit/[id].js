import React from 'react';
import UpdateCategoryMain from '@/components/admin/category/updateCategory';
import { getDocument } from '@/functions/firebase/getData';
const EditPageCategory = ({category}) => {
    return (
        <div>
            <UpdateCategoryMain category={category}/>
        </div>
    );
}


export default EditPageCategory;




//// serverside to fetch single catgory in serverside from firestore




EditPageCategory.getInitialProps = async (context) => {
 
// context.query.id ==> admin/category/edit/${context.query.id} in browser
    const data = await getDocument("cats", context.query.id);
 
   
    console.log('single category --<>' , data)


 
    return {
      category: data,
    };
  };




