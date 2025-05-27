import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(1, 11));
  }, [products]);

  // Slider settings - customize as needed
  const settings = {
    dots: true,
    infinite: latestProducts.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
  autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eos quasi dolor maiores veritatis, officia a libero aspernatur, ea{" "}
        </p>
      </div>

      {/* Carousel slider for products */}
      <Slider {...settings} className="px-4">
        {latestProducts.map((item) => (
          <div key={item._id} className="px-2">
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LatestCollection;
