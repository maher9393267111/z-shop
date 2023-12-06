import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";


const itemCard = ({ item ,key ,linktext  }) => {
  
  return (
    <Link href={`/products?${linktext}=${item?.title}`}>
    <motion.div
    
    animate={{ rotate: 360 }}
    transition={{ duration: 5 }}
    
    key={key} className="flex relative  mx-auto  w-[190px] my-12      shadow-xl    h-[190px]  rounded-full flex-col gap-1 justify-center items-center group 
    
    
    ">

      <figure className="overflow-hidden p-2">
        
          <Image
            className="rounded-full  
            relative aspect-[9/10]
            w-[190px]   h-[190px] object-cover hover:scale-[1.1]   transition-all duration-100      "
            src={item?.image}
            alt={item?.title}
            height={220}
            width={220}
          />
        {/* </Link> */}
      </figure>
      {/* <h4 className="font-medium text-lg">{item.title}</h4> */}

      <div className="absolute inset-0 flex items-center rounded-full justify-center
      
       w-full bg-gradient-to-t from-black/75 via-black/0
      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-center lg:font-semibold lg:text-xl">
                  {item?.title}
                  </h3>
                </div>






      {/* <p className="font-light text-md">
        12
      </p> */}
    </motion.div>
    </Link>
  );
};


export default itemCard;