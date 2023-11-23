import React from 'react'
import { getDocuments } from '@/functions/firebase/getData';

export default function ProductsPage({products}) {

console.log('ProductsPage' + products)

  return (
    <div>


{products[0].title}

    </div>
  )
}


// serverside
ProductsPage.getInitialProps = async (context) => {
   let products = []

   if(context.query.category){
    console.log('category conditions:', context.query.category)
     products= await getDocuments("products" , ["category", "==", context.query.category ]); //  []
    //products.push(productsData); 
   }


   else if (context.query.subcategory){
    console.log('Subcategory conditions:', context.query.subcategory)
     products= await getDocuments("products" , ["subcategory", "==", context.query.subcategory ]); //  []
  //  products.push(productsData); 


   }


   // Add products 
   else {
    console.log('ALL PRODUCTS')
    products= await getDocuments("products"); //  []
   // products.push(productsData); 
   }



   // const subcat = await getDocument("subcats" ,context.query.id); //  []
    console.log("data", products);
 
    return {
      // props from serverside will go to props in clientside
      products: products
      
    };
  };
