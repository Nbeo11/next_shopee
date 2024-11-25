"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductDetail } from "@/services/productService";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await getProductDetail(id);
          setProduct(res.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const addToCart = () => {
    if (quantity < 1 || quantity > product.stock) {
      alert("Invalid quantity selected. Please adjust the quantity.");
      return;
    }

    const cart = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    const existingItem = cart.find((item) => item.productId === Number(id));

    if (existingItem) {
      if (existingItem.quantity + quantity <= product.stock) {
        existingItem.quantity += quantity;
      } else {
        alert("Quantity exceeds available stock.");
        setQuantity(1);
        return;
      }
    } else {
      const cartItem = {
        productId: Number(id),
        quantity: quantity,
        image: product.preview_img_path,
        price: product.price,
        name: product.name,
      };
      cart.push(cartItem);
    }
    sessionStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    setQuantity(1);
    alert("Item added to cart successfully!");
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto h-full p-10">
      <div className="p-10 grid grid-cols-3 gap-10">
        <img
          src={product.preview_img_path}
          alt={product.name}
          className="pt-2 w-full h-auto col-span-1"
        />
        <div className="flex flex-col gap-4 col-span-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-xl bg-slate-200 py-3 text-orange-800 font-bold text-center">
            {formatCurrency(product.price)}
          </div>
          <div className="text-sm">
            <span className="font-bold">Description: </span>
            {product.description}
          </div>
          <div className="text-sm">
            <span className="font-bold">CategoryIn: </span>
            {product.category.name}
          </div>
          <div className="text-sm">
            <span className="font-bold">InStock: </span>
            {product.stock}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="quantity" className="font-bold text-sm">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={product.stock}
              className="border rounded w-16 p-1 text-center"
            />
          </div>
          <button
            onClick={addToCart}
            className={`mt-3 text-black py-2 px-4 rounded transition-all shadow-lg z-10 ${
              product.stock > 0 && quantity <= product.stock
                ? "bg-[#9fcb93]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={product.stock === 0 || quantity > product.stock}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
