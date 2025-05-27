import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from "./Title";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => item.category === category && item.subCategory === subCategory);
      setRelated(productsCopy.slice(0, 10)); // increase limit if needed
    }
  }, [products]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={"RELATED"} text2={'PRODUCTS'} />
      </div>

      <Slider {...settings}>
        {related.map((item, index) => (
          <div key={index} className="px-2">
            <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RelatedProducts;
