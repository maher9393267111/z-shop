import React from "react";
import { orderBy, where } from "firebase/firestore";
import { getDocuments, getDocumentsOrder } from "@/functions/firebase/getData";
import ProdSlider from "@/components/client/products/slider/slider";

export default function ProductsPage({ products, cats ,subcats ,categoryquery ,subcategoryquery }) {
  console.log("ProductsPage" + products);

//conditon one  
// only router /products  no  products?category={catName}  no  /products?subcategory={subcatName} cats slider
// condition two
// subcategoryquery is exist --> products?subcategory={subcatName} show all subcats in slider

// condition three
// categoryquery is exist --> products?category={catName}  show all cats in slider


const condition = !categoryquery && !subcategoryquery ? cats
 : subcategoryquery ? subcats 
 : categoryquery && subcats

 const conditionText = !categoryquery && !subcategoryquery ? "category"
 : subcategoryquery ? "subcategory" 
 : categoryquery && "subcategory"




 console.log('condition,conditionText' ,products?.length , condition ,conditionText)


  return (
    <div>
      <ProdSlider data={condition}  linktext ={conditionText} />
      {products?.length}
    </div>
  );
}

// serverside
ProductsPage.getInitialProps = async (context) => {
  let products = [];
  //navbar.jsx href={`/products?category=${item.title.toLowerCase()}`}
  const category = context.query.category;
  const subcategory = context.query.subcategory;
  console.log("categoryyyyy", category);

  

  console.log("subcategoryyyyy", subcategory);

  //    where("fieldname", "==", fieldValue)

  products = await getDocumentsOrder(
    "products",
    orderBy("timestamp", "asc"),

    //category i am searching for all products that have a category name / same as subcategory , else null nothing (filteration)
    category
      ? where("category", "==", category)
      : subcategory
      ? where("subcategory", "==", subcategory)
      : null
  );
  //console.log("productsssssss", products);

  const cats = await getDocumentsOrder("cats", orderBy("title", "asc"));
  //console.log("catssssssssssss", cats);

// sub cats  if category filter subcats else filter all subcats



const subcats = await getDocumentsOrder(
  "subcats",
  orderBy("timeStamp", "asc"),

  //category i am searching for all products that have a category name / same as subcategory , else null nothing (filteration)
  //contextquery.query  // null all subcategories , category parent te3 subcategories ( sub cat limited)
  // category
  //   ? where("category", "==", category)
  //   : null
);

//console.log("subcats", subcats);

  return {
    // props from serverside will go to props in clientside
    products: products,
    cats: cats,
    subcats:subcats,
    categoryquery:category, //laptop
    subcategoryquery:subcategory  // LG

  };
};




// import React from "react";
// import { orderBy, where } from "firebase/firestore";
// import { getDocuments, getDocumentsOrder } from "@/functions/firebase/getData";
// import ProdSlider from "@/components/client/products/slider/slider";

// export default function ProductsPage({
//   products,
//   cats,
//   subcats,
//   categoryquery,
//   subcategoryquery,
// }) {
//   // console.log("AA", categoryquery ? "subcats" : "cats");
//   const condition =
//     !categoryquery && !subcategoryquery
//       ? cats
//       : subcategoryquery
//       ? subcats
//       : categoryquery && subcats;

//   const conditionText =
//     !categoryquery && !subcategoryquery
//       ? "category"
//       : subcategoryquery
//       ? "subcategory"
//       : categoryquery && "subcategory";

//   console.log("conf-->", conditionText ,subcats?.length);

//   return (
//     <div>
//       <ProdSlider
//         data={condition}
//         linktext={conditionText}
//       />

// {products?.length}

//     </div>
//   );
// }

// // serverside
// ProductsPage.getInitialProps = async (context) => {
//   let products = [];

//   const category = context.query.category;
//   const subcategory = context.query.subcategory;
//   console.log("categoryyyyy", category);

//   console.log("subcategoryyyyy", subcategory);

//   products = await getDocumentsOrder(
//     "products",
//     orderBy("timestamp", "asc"),

//     category !== undefined
//       ? where("category", "==", category)
//       : subcategory !== undefined
//       ? where("subcategory", "==", subcategory)
//       : null
//   );
//   console.log("productsssssss", products);

//   const cats = await getDocumentsOrder("cats", orderBy("title", "asc"));
//   //console.log("catssssssssssss", cats);

//   const subcats = await getDocumentsOrder(
//     "subcats",
//     orderBy("timeStamp", "asc"),
  
//     //category i am searching for all products that have a category name / same as subcategory , else null nothing (filteration)
//     //contextquery.query  // null all subcategories , category parent te3 subcategories ( sub cat limited)
//     category !== undefined
//       ? where("category", "==", category)
//       : null
//   );

//   console.log("subcats", subcats);

//   return {
//     products: products,
//     cats: cats,
//     subcats: subcats,
//     categoryquery: category, //laptop
//     subcategoryquery: subcategory, // LG
//   };
// };
