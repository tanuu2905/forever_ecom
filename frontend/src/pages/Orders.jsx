import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, cartItems, currency } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t border-gray-200 pt-16 ">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No orders yet.</p>
      ) : (
        cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col sm:grid sm:grid-cols-[4fr_2fr_0.5fr] gap-4"
            >
              <div className="flex items-start gap-6 ">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2 ">
                    <p>
                      {currency} {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border border-gray-200 bg-slate-50">
                      {" "}
                      {item.size}
                    </p>
                    <p className="text-gray-500">
                      <span className=" text-gray-800"> Quantity :</span>{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="px-2  sm:py-1  text-gray-500 text-sm  my-1">
                    <span className=" text-gray-800"> Date :</span>{" "}
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-1  border border-gray-300 px-2 hover:bg-gray-300 hover:text-white transition text-sm w-30 h-10 rounded-3xl  my-2 ">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block"></span>
                <span>Track Order</span>
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
