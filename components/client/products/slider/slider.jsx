import React from 'react';
import Slider from 'react-slick';

import  Card from './card';
import  CustomSlideArrow  from './CustomSlideArrow';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const BrowseCategoriesSlide = ({ data }) => {
  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    className:"relative max-w-[90%] ",
    nextArrow: <CustomSlideArrow direction="next" />,
    prevArrow: <CustomSlideArrow />,
    responsive: [
      {
        // max width
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerPadding: '72px',
        },
      },
      {
        // max width
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          initialSlide: 3,
          slidesToScroll: 3,
          arrows: true,
          
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...setting}>
        {data?.map((category) => (
          <Card category={category} key={category?.id} />
        ))}
      </Slider>
    </div>
  );
};


export default  BrowseCategoriesSlide