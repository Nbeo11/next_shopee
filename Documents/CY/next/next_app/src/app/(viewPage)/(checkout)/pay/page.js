"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { orderProducts } from "@/services/orderService";

export default function OrderPayment() {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const totalPrice = () => {
    let total = 0;
    if (Array.isArray(cartItems)) {
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
    }
    return total;
  };

  const complete = () => {
    if (!address || !phone) {
      alert("Vui lòng điền đầy đủ địa chỉ và số điện thoại");
      return;
    }

    const cart = cartItems.map((item) => ({
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
    }));

    orderProducts(address, phone, cart)
      .then((response) => {
        if (response) {
          alert("Đặt hàng thành công");
          setCartItems([]);
          sessionStorage.setItem("cartItems", JSON.stringify([]));
          window.dispatchEvent(new CustomEvent("cartUpdated"));
          router.push("/thank");
        } else {
          alert("Lỗi khi xử lý thanh toán");
        }
      })
      .catch((error) => {
        console.error("Lỗi thanh toán:", error);
        alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      });
  };

  return (
    <div className="max-w-6xl mx-auto mt-5 bg-white px-10 pt-5">
      <h2 className="text-3xl font-bold text-center">Order Payment</h2>
      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-8 p-8 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-6 border-b border-gray-200 py-4"
            >
              <img
                className="w-24 h-24 border-gray-300 border-2 rounded-lg"
                src={item.image}
                alt={item.name}
              />
              <div className="flex flex-col gap-1 w-full">
                <h2
                  className="text-xl w-3/4 font-semibold text-gray-800 truncate"
                  title={item.name}
                >
                  {item.name}
                </h2>
                <div className="text-gray-600">
                  {formatCurrency(item.price)}
                </div>
                <div className="text-gray-600">x {item.quantity}</div>
              </div>
            </div>
          ))}

          <div className="text-lg font-semibold text-gray-800 px-6">
            Total:{" "}
            <span className="text-blue-600">
              {formatCurrency(totalPrice())}
            </span>
          </div>

          <div className="px-6 py-4 bg-gray-50 rounded-lg shadow-md">
            <div className="text-lg font-bold text-gray-800 mb-4">
              Your information:
            </div>
            <form action="" className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="address" className="text-gray-700">
                  Address:
                </label>
                <input
                  type="text"
                  name="Address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-gray-700">
                  Phone number:
                </label>
                <input
                  type="text"
                  name="Phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </form>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={complete}
              className="bg-red-500 text-white w-36 py-2 rounded-lg hover:bg-red-600 transition-all font-bold uppercase"
            >
              Pay
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty</p>
      )}
    </div>
  );
}
