import React from 'react';
import UpdateProductMain from '@/components/admin/product/updateProduct';
import { getDocuments , getDocument } from '@/functions/firebase/getData';
const EditSubPage = ({cats , subcats ,product}) => {
    return (
        <div>
            <UpdateProductMain cats={cats} subcats={subcats} product={product}/>
        </div>
    );
}


export default EditSubPage;




// serverside
EditSubPage.getInitialProps = async (context) => {
    const Categories = await getDocuments("cats"); //  []
    const SubCategories = await getDocuments("cats"); //  []
    console.log("queyyy", context.query.id);



    // context.query.id ==> admin/category/edit/${context.query.id} in browser
    const product = await getDocument("products", context.query.id);
  
    
    console.log('single product --<>' , product)
 
    return {
      // props from serverside will go to props in clientside
      cats: Categories,
      product: product , 
      subcats:SubCategories ,
    };
  };
