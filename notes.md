

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

-------------------------------------------------**********************_______________________________





// import React from "react";
// import { orderBy, where } from "firebase/firestore";
// import { getDocuments, getDocumentsOrder } from "@/functions/firebase/getData";
// import SliderProd from "@/components/client/products/slider/slider";
// import { motion } from "framer-motion";
// export default function ProductsPage({
//   products,
//   cats,
//   subcats,
//   subcatquery,
//   catquery,
// }) {
//   const divVariants = {
//     hidden: {
//       transition: {
//         staggerChildren: 0.2, // delay between animating children
//         staggerDirection: -1, // animating children in reverse order
//       },
//     },
//     visible: {
//       transition: {
//         staggerChildren: 0.2,
//         staggerDirection: 1, // animating children in normal order,
//         type: "spring",
//       },
//     },
//   };

//   const childVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.22, // duration of the animation
//         ease: "easeOut", // easing function
//       },
//     },
//   };

//   return (
//     <div className=" w-[90%] mx-auto">
//       <motion.div
//         className={`products-heading `}
//         variants={divVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false }}
//       >
//         <motion.p
//           variants={childVariants}
//           style={{ margin: 0, marginRight: 10, padding: 0 }}
//         >
//           Our
//         </motion.p>
//         <motion.p
//           variants={childVariants}
//           style={{ margin: 0, marginRight: 10, padding: 0, color: "#E00C05" }}
//         >
//           Valuable
//         </motion.p>
//         <motion.p variants={childVariants} style={{ margin: 0, padding: 0 }}>
//           products
//         </motion.p>
//       </motion.div>

//       {/* w-[80%]  md:w-[70%] mx-auto */}
//       <div className=" mx-12">
//         <SliderProd data={catquery ? subcats : cats} />
//       </div>

//       {/* {products.map((item, index) => {
//         return <div>{item?.title}</div>;
//       })} */}
//     </div>
//   );
// }

// // serverside
// ProductsPage.getInitialProps = async (context) => {
//   console.log("Query category", context?.query?.category);
//   console.log("Query :::: Type", context?.query?.subcategory);
//   const category = context?.query?.category;
//   const subcat = context?.query?.type;
//   const data = await getDocumentsOrder(
//     "products",
//     orderBy("timestamp", "desc"),
//     //where("fieledname", "==", fieldValue)
//     category
//       ? where("category", "==", category)
//       : subcat
//       ? where("subcategory", "==", subcat)
//       : null
//     //context.query.category ?
//   );

//   const cats = await getDocumentsOrder("cats", orderBy("title", "desc"));

//   const subcats = category
//     ? await getDocumentsOrder(
//         "subcats",
//         orderBy("title", "desc"),
//         where("category", "==", category)
//       )
//     : [];

//     // const subcats = await getDocumentsOrder(
//     //   "subcats",
//     //   orderBy("timeStamp", "asc"),
    
//     //   //category i am searching for all products that have a category name / same as subcategory , else null nothing (filteration)
//     //   //contextquery.query  // null all subcategories , category parent te3 subcategories ( sub cat limited)
//     //   category
//     //     ? where("category", "==", category)
//     //     : null
//     // );






//   // console.log("first blogs", dataBlogs);

//   return {
//     products: data,
//     cats: cats,
//     subcats: subcats,
//     catquery: category,
//     subcatquery: subcat,
//   };
// };




