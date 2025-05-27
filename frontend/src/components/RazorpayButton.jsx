import React from "react";

const RazorpayButton = ({ amount}) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openRazorpayCheckout = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your test key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Forever Store",
      description: "Test Order",
      image: "https://yourlogo.com/logo.png",
      handler: function (response) {
        alert("✅ Payment successful: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Tanu",
        email: "tanu@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={openRazorpayCheckout}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
