import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';


const CategoryCard = ({ category ,key }) => {
  
  return (
    <div key={key} className="flex flex-col gap-1 justify-center items-center">
      <figure className="overflow-hidden p-2">
        <Link href="/categories">
          <Image
            className="rounded-full    h-[144px] object-cover"
            src={category?.image}
            alt={category?.title}
            height={210}
            width={210}
          />
        </Link>
      </figure>
      <h4 className="font-medium text-lg">{category.title}</h4>
      <p className="font-light text-md">
        12
      </p>
    </div>
  );
};


export default CategoryCard;