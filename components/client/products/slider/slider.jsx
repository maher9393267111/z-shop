import React from "react";
import Slider from "react-slick";

import Card from "./card";
import CustomSlideArrow from "./CustomSlideArrow";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const BrowseCategoriesSlide = ({ data ,linktext  }) => {
  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: data?.length > 2 ? 3 : 1,
    slidesToScroll: 1,
    className: "relative mx-w-[80%]    md:max-w-[60%] mx-auto py-12 my-12 h-auto     ",
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
          centerPadding: "72px",
          arrows: true,
        },
      },
      {
        // max width
        breakpoint: 1100,
        settings: {
          slidesToShow: data?.length > 3 ? 2 : 1,
          initialSlide: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...setting}>
        {data?.map((item) => (
          <Card item={item} key={item?.id} linktext={linktext } />
        ))}
      </Slider>
    </div>
  );
};

export default BrowseCategoriesSlide;
