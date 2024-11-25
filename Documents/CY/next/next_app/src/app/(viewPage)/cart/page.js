/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Cart = () => {
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

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity === 0) {
      const shouldRemove = window.confirm(
        "Do you want to remove this item from your cart?"
      );
      if (shouldRemove) {
        removeItem(item);
      } else {
        newQuantity = 1;
        const updatedItems = cartItems.map((cartItem) => {
          if (cartItem.productId === item.productId) {
            cartItem.quantity = newQuantity;
          }
          return cartItem;
        });
        setCartItems(updatedItems);
        sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
      }
    } else {
      const updatedItems = cartItems.map((cartItem) => {
        if (cartItem.productId === item.productId) {
          cartItem.quantity = newQuantity;
        }
        return cartItem;
      });
      setCartItems(updatedItems);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
    }
  };

  const removeItem = (item) => {
    const updatedItems = cartItems.filter(
      (cartItem) => cartItem.productId !== item.productId
    );
    setCartItems(updatedItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const totalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="max-w-5xl mx-auto mt-5 bg-white px-6 py-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Cart
      </h2>
      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-8 px-10">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-6 items-center bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
            >
              <img
                onClick={() => router.push(`/product/${item.productId}`)}
                className="w-28 h-28 object-cover rounded-lg hover:cursor-pointer hover:scale-105"
                src={item.image}
                alt="Product image"
              />
              <div className="flex flex-col gap-1 w-full">
                <h2 className="text-lg font-semibold text-gray-800 w-3/4 truncate">
                  {item.name}
                </h2>
                <div className="text-lg font-medium text-gray-600">
                  {formatCurrency(item.price)}
                </div>
                <div className="flex gap-4 items-center mt-3">
                  <div className="flex justify-between gap-2 items-center">
                    <div>
                      <strong className="text-gray-700">Quantity: </strong>
                      <input
                        type="number"
                        value={item.quantity || 0}
                        min="0"
                        className="w-16 pl-2 border-2"
                        onChange={(e) =>
                          updateQuantity(item, parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                    <button
                      onClick={() => removeItem(item)}
                      className="ml-auto p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                    >
                      <img
                        className="w-8"
                        src="/images/delete.png"
                        alt="Delete"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-8 text-2xl font-bold text-gray-800 text-right">
            <span>Total Price: </span>
            <span className="text-[#ff7d7d]">
              {formatCurrency(totalPrice())}
            </span>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push("/pay")}
              className="bg-[#9fcb93] w-48 py-3 hover:bg-[#5a894c] text-gray-800 hover:text-white uppercase font-bold rounded-lg transition-all"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-gray-600 mt-10">
          {"Your cart is empty! Let's go shopping."}
        </div>
      )}
    </div>
  );
};

export default Cart;
