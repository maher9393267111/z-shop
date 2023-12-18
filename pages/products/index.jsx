import React from "react";
import { orderBy, where } from "firebase/firestore";
import { getDocuments, getDocumentsOrder ,fetchOfferProducrts } from "@/functions/firebase/getData";
import ProdSlider from "@/components/client/products/slider/slider";
import Navbar from "@/components/client/layout/navbar";
import OfferSlider from "@/components/client/sections/offerSlider"

export default function ProductsPage({
  products,
  cats,
  subcats,
  categoryquery,
  subcategoryquery,
}) {
  console.log("ProductsPage" + products);

  const condition =
    !categoryquery && !subcategoryquery
      ? cats
      : subcategoryquery
      ? null
      : categoryquery && subcats;

  const conditionText =
    !categoryquery && !subcategoryquery
      ? "category"
      : subcategoryquery
      ? "subcategory"
      : categoryquery && "subcategory";

  // console.log(
  //   "condition,conditionText",
  //   products?.length,
  //   condition,
  //   conditionText
  // );

  return (
    <div>
      <Navbar />

      <div className="horizontal-loader !h-[333px] md:!h-[433px] w-full  ">
        <div className=" relative w-full h-full   ">
          <img
            className=" opacity-[0.6] w-full h-full  object-fill"
            src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />

          <p className=" z-0 absolute  inset-0   text-3xl top-1/2  text-center  text-white ">
            hello
          </p>
        </div>
      </div>

      {/* ----offers Grid--- */}
      <OfferSlider/>

   



      {condition !== null && (
        <ProdSlider data={condition} linktext={conditionText} />
      )}

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

    category
      ? where("category", "==", category)
      : subcategory
      ? where("subcategory", "==", subcategory)
      : null
  );


  // offer products

  const offerProducts = await fetchOfferProducrts( );



  console.log("isofferrrr🔹️🔺️🔻🔹️🔺️🔻r",offerProducts)





  const cats = await getDocumentsOrder("cats", orderBy("title", "asc"));

  const subcats = await getDocumentsOrder(
    "subcats",
    orderBy("timeStamp", "asc")

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
    subcats: subcats,
    categoryquery: category, //laptop
    subcategoryquery: subcategory, // LG
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
