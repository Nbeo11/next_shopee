'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "react-toastify";

const Products = () => {
  const router = useRouter();
  const toast = useToast();

  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    router.query.category_id || ""
  );
  const [minPrice, setMinPrice] = useState(router.query.min_price || "");
  const [maxPrice, setMaxPrice] = useState(router.query.max_price || "");
  const [name, setName] = useState(router.query.name || "");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const productData = await axios.get("/api/products", {
          params: {
            category_id: selectedCategory,
            min_price: minPrice,
            max_price: maxPrice,
            name: name,
          },
        });
        const categoryData = await axios.get("/api/categories");
        setAllProducts(productData.data);
        setAllCategories(categoryData.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, [selectedCategory, minPrice, maxPrice, name]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const setPrice = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const filterProduct = () => {
    router.push({
      pathname: "/products",
      query: {
        category_id: selectedCategory,
        min_price: minPrice,
        max_price: maxPrice,
        name: name,
      },
    });
  };

  const clearPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinPriceFilter("");
    setMaxPriceFilter("");
    filterProduct();
  };

  const clearCategoryFilter = () => {
    setSelectedCategory("");
    setCategoryFilter("");
    filterProduct();
  };

  const handleImageError = (item) => {
    toast.error("Image loading failed. Default image applied.");
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
        toast.success("Item added to cart successfully!");
      } else {
        toast.error("Quantity exceeds available stock.");
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
      toast.success("Item added to cart successfully!");
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
          <div className="hover:cursor-pointer" onClick={toggleDropdown}>
            {/* Icon SVG for dropdown */}
          </div>
        </div>
        {showDropdown && (
          <div className="absolute right-0 mt-7 w-1/2 bg-[#8FD9C4] border border-gray-300 rounded shadow-lg z-20 p-4">
            <div>
              <label className="block text-sm font-semibold">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-semibold">Price ($)</label>
              <div className="flex gap-8 items-center">
                <input
                  className="px-3 w-20"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="number"
                  placeholder="min"
                  min="0"
                />
                -
                <input
                  className="px-3 w-20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="number"
                  placeholder="max"
                  min="0"
                />
              </div>
            </div>
            <button
              onClick={filterProduct}
              className="bg-[#5e9e8c] text-xs px-2 py-1 mt-5 hover:text-white hover:bg-[#366357] hover:scale-105 transition-all"
            >
              Filter
            </button>
          </div>
        )}
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
                  <img
                    src={item.preview_img_path}
                    alt="Product Image"
                    className="w-full h-full object-cover shadow-md transition-all duration-300 hover:brightness-90 hover:blur-sm"
                    onError={() => handleImageError(item)}
                  />
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

export default Products;
