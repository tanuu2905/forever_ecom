import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("razorpay");
  const { navigate, getCartAmount } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openRazorpayCheckout = async (amount = 500) => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: amount * 100,
      currency: "INR",
      name: "Forever Store",
      description: "Test Order",
      image: "https://yourlogo.com/logo.png",
      handler: function (response) {
        // alert("✅ Payment successful: " + response.razorpay_payment_id);
        toast.success("✅ PAYMENT SUCCESSFULL: " + response.razorpay_payment_id)
        navigate("/orders");
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("⚠️ Please fill in all delivery information.");
      return;
    }

    const amount = getCartAmount() + 10;

    if (method === "razorpay") {
      openRazorpayCheckout(amount);
    } else if (method === "cod") {
      toast.success("Order placed !! You can pay on delivery");
      navigate("/orders");
    } else {
      toast.error("🚫 Stripe payment not available on this purchase.Please use another payment method!!");
    }
  };

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300"
    >
      {/* ----------Left side -------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zip Code"
            required
          />
          <input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone Number"
          required
        />
      </div>

      {/* ----------Right side -------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === "stripe" ? "bg-green-700" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="stripe" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === "razorpay" ? "bg-green-700" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="razorpay" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${method === "cod" ? "bg-green-700" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
