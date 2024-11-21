"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Products() {
  const router = useRouter();

  const [allProducts, setAllProducts] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const productData = await axios.get("/api/products");
        const categoryData = await axios.get("/api/categories");
        setAllProducts(productData.data);
        setAllCategories(categoryData.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  });

  const handleImageError = (item) => {
    alert("Image loading failed. Default image applied.");
    item.preview_img_path = defaultImage;
  };

  const addToCart = (item) => {
    const cart = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    const existingItem = cart.find(
      (cartItem) => cartItem.productId === item.id
    );

    if (existingItem) {
      if (existingItem.quantity + 1 <= item.stock) {
        existingItem.quantity += 1;
        alert("Item added to cart successfully!");
      } else {
        alert("Quantity exceeds available stock.");
        return;
      }
    } else {
      const cartItem = {
        productId: item.id,
        quantity: 1,
        image: item.preview_img_path,
        price: item.price,
        name: item.name,
      };
      cart.push(cartItem);
      alert("Item added to cart successfully!");
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  return (
    <div className="max-w-6xl mx-auto p-10 gap-2">
      <div className="flex justify-between relative">
        <div className="text-2xl font-bold mb-10">All Products</div>
        <div className="flex gap-8">
          <div className="flex gap-3">
            <div>Search:</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                filterProduct();
              }}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border-[1px] w-40 h-7 border-gray-700 px-2"
              />
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-7 gap-y-10">
          {allProducts.length > 0 ? (
            allProducts.map((item) => (
              <div
                key={item.id}
                className="rounded-md shadow-lg flex flex-col gap-1 relative h-auto hover:scale-105 hover:cursor-pointer transition-all"
              >
                <div className="relative w-full h-32">
                  {/* <img
                    src={item.preview_img_path}
                    alt="Product Image"
                    className="w-full h-full object-cover shadow-md transition-all duration-300 hover:brightness-90 hover:blur-sm"
                    onError={() => handleImageError(item)}
                  /> */}
                </div>
                <div className="px-3 pb-3 pt-2 flex flex-col gap-1">
                  <div className="text-base font-bold truncate">
                    {item.name}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-xl">${item.price}</div>
                    <div className="text-xs">In stock: {item.stock}</div>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className={`mt-3 text-black py-2 px-4 rounded-sm w-full transition-all self-center shadow-lg z-10 ${
                      item.stock > 0
                        ? "bg-[#78BCC4]"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={item.stock === 0}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>There are no products</div>
          )}
        </div>
      </div>
    </div>
  );
};

