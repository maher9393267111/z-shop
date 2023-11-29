import React from "react";
import { orderBy, where } from "firebase/firestore";
import { getDocuments, getDocumentsOrder } from "@/functions/firebase/getData";
import  SliderProd from "@/components/client/products/slider/slider";

export default function ProductsPage({ products ,cats }) {
  console.log("ProductsCLIENRy" + products[1]);

  return (
    <div className=" w-[80%]  md:w-1/2 mx-auto">
      <SliderProd data ={cats} />
      {/* {products.map((item, index) => {
        return <div>{item?.title}</div>;
      })} */}
    </div>
  );
}


// serverside
ProductsPage.getInitialProps = async (context) => {
  console.log("Query category", context?.query?.category);
  console.log("Query :::: Type", context?.query?.subcategory);
  const category = context?.query?.category;
  const subcat = context?.query?.type;
  const data = await getDocumentsOrder(
    "products",
    orderBy("timestamp", "desc"),
//where("fieledname", "==", fieldValue)
    category
      ? where("category", "==", category)
      : subcat
      ? where("subcategory", "==", subcat)
      : null
    //context.query.category ?
  );


  const cats = await getDocumentsOrder(
    "cats",
    orderBy("title", "desc"),

  );



  // console.log("first blogs", dataBlogs);

  return {
    products: data,
    cats:cats
  };
};

// const filterdata = (data) => {
//   let filterQuery = [];

//   if (context?.query?.category) {
//     console.log("filter bu catgory  ", category);
//     const filter = dataBlogs.filter(
//       (doc) => doc?.category === context?.query?.category
//     );
//     //console.log('FILTER', filter)
//     filterQuery = filter;
//     //console.log('FILTER', filterQuery)
//     return filterQuery;
//   }

//   if(context.query.category === undefined ) {

//     console.log("filter *****  ");
//     const filter = dataBlogs.filter(
//       (doc) =>  doc.type == 'post'
//     );
//     //console.log('FILTER', filter)
//     filterQuery = dataBlogs;
//     //console.log('FILTER', filterQuery)
//     return filterQuery;

//   }

//  // return dataBlogs;
// };

// --------------

//products= await getDocuments("products"); //  []

//  if(context.query.category){
//   console.log('category conditions:', context.query.category)
//    products= await getDocuments("products" , ["category", "==", context.query.category ]); //  []
//   //products.push(productsData);
//  }

//  else if (context.query.subcategory){
//   console.log('Subcategory conditions:', context.query.subcategory)
//    products= await getDocuments("products" , ["subcategory", "==", context.query.subcategory ]); //  []
// //  products.push(productsData);

//  }

// Add products
//  else {
//   console.log('ALL PRODUCTS')
//   products= await getDocuments("products"); //  []
//  // products.push(productsData);
//  }

// const subcat = await getDocument("subcats" ,context.query.id); //  []
//  console.log("data", products);
