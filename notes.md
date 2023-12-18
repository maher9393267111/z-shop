

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




-------------------------

 const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };



  {
      title: "Products",
      // same name from database   // category={title ,....}
      dataIndex: "title",

      filters: [
        {
          text: 'Laptop',
          value: 'Used Laptops',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      filteredValue:products.name || null,
      onFilter: (value, record) => {
        console.log('record' , record ,value)
        record.name.includes(value)},
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,

    },

    ------------------------------------------------------

    slider Offer

       {/* <div className=" grid grid-cols-1 lg:grid-cols-7 gap-4 mb-7 mx-4 md:mx-12 mt-12">
        <div className=" lg:col-span-5 rounded-sm  ">
          <OfferSlider />
        </div>

        <div className="lg:col-span-2 flex justify-center lg:grid lg:grid-cols-1 lg:place-items-center gap-2 w-full">
          <div className=" mx-2  h-full  px-2 w-full">
            <img 
              className=" w-full !h-full object-cover object-center overflow-hidden"
              src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
              alt=""
            />
          </div>

          <div className="   mx-2 h-full px-2 w-full">
            <img
              className=" w-full !h-full object-cover object-center overflow-x-hidden"
              src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
              alt=""
            />
          </div>
        </div>
      </div> */}


      ------------------------------------------------------

      offerslider index.js

      import React from "react";
import Carousel from "react-slick";
import CustomSlideArrow from "../../products/slider/CustomSlideArrow";
export default function OfferSliders() {
  const settingsMainCarousel = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <CustomSlideArrow direction="next" />,
    prevArrow: <CustomSlideArrow />,
  };

  return (
    <div className=" w-full h-full  mx-auto">
      <Carousel {...settingsMainCarousel}>
        <div className=" w-full md:h-full h-[300px] relative horizontal-loader">
          <img
            className=" opacity-[0.6] w-full !h-full object-cover object-center"
            src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
            alt=""
          />

          <div className="   z-0 absolute  inset-0   text-3xl top-1/2  text-center  text-white ">
            hello
          </div>
        </div>

        <div className=" w-full md:h-full h-[300px] relative horizontal-loader">
          <img
            className=" opacity-[0.6] w-full !h-full object-cover object-center"
            src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
            alt=""
          />

          <div className="   z-0 absolute  inset-0   text-3xl top-1/2  text-center  text-white ">
            hello
          </div>
        </div>


        <div className=" w-full md:h-full h-[300px] relative horizontal-loader">
          <img
            className=" opacity-[0.6] w-full !h-full object-cover object-center"
            src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
            alt=""
          />

          <div className="   z-0 absolute  inset-0   text-3xl top-1/2  text-center  text-white ">
            hello
          </div>
        </div>


        <div className=" w-full md:h-full h-[300px] relative horizontal-loader">
          <img
            className=" opacity-[0.6] w-full !h-full object-cover object-center"
            src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
            alt=""
          />

          <div className="   z-0 absolute  inset-0   text-3xl top-1/2  text-center  text-white ">
            hello
          </div>
        </div>

        <div className=" w-full md:h-full h-[300px] relative horizontal-loader">
          <img
            className=" opacity-[0.6] w-full !h-full object-cover object-center"
            src="https://i.pcmag.com/imagery/reviews/04jlYF4fsF2M5cejiU8lw7G-2.fit_lim.size_840x473.v1685028816.jpg"
            alt=""
          />

          <div className="   z-0 absolute  inset-0   text-3xl top-1/2  text-center  text-white ">
            hello
          </div>
        </div>




      </Carousel>
    </div>
  );
}


------------------------------------

<!-- SEARCH INPUT -->

<div class="relative w-[99px] md:w-[130px]">
  <input

name='search'
onKeyDown={(event) => {
  if (event?.key === "Enter" && event.target.value) {
    router.push("/?search=" + event.target.value);
  }
  if (!event.target.value && event?.key === "Enter") {
    router.push("/");
  }
}}

    className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-600 focus:border-green-600 focus:shadow-outline"
    id="username"
    type="text"
    placeholder="Search..."
  />


  <button className=" cursor-pointer  bg-green-300"   onClick={handleFind}>search</button>
  <div className="absolute right-0 inset-y-0 flex items-center">
  
  </div>

  <div className="absolute left-0 inset-y-0 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</div>


---------------------------
