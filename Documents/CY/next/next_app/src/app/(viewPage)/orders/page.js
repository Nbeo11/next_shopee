/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllOrders, getOrderDetail } from "@/services/orderService";

export default function OrderHistory() {
  const [orderArray, setOrderArray] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrderArray(data.data);
      } catch (error) {
        console.error("Failed to fetch order items:", error);
      }
    };

    fetchOrders();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const viewOrderDetail = async (id) => {
    const data = await getOrderDetail(id);
    console.log("data", data);
    setOrderDetail(data.data.order_items);
    setIsOpenForm(true);
  };

  const repurchase = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="max-w-5xl p-10 mx-auto mb-8 relative">
      <div className="text-2xl font-bold text-center mb-8">
        Order Items History
      </div>

      {orderArray.length > 0 ? (
        <div className="flex flex-col gap-10">
          {orderArray.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex w-full items-center gap-6">
                <div className="w-1/4">
                  <img
                    className="w-48 h-48 object-cover rounded-lg border-gray-300 border-2"
                    src="../images/image.png"
                    alt="Product image"
                  />
                </div>
                <div className="w-3/4 flex flex-col gap-2 items-start">
                  <div className="text-xl font-bold text-gray-800 truncate w-full max-w-full">
                    Order ID: {item.id}
                  </div>
                  <div className="text-lg text-gray-600">
                    Status: {item.status}
                  </div>
                  <div className="text-lg text-gray-600">
                    Product(s): {item.order_items.length}
                  </div>
                  <div className="text-lg text-gray-800 font-semibold">
                    Total: {formatCurrency(item.total)}
                  </div>
                  <div
                    onClick={() => viewOrderDetail(item.id)}
                    className="text-lg bg-[#a45656] text-white hover:bg-[#934646] hover:scale-105 hover:cursor-pointer rounded-lg border border-[#a45656] px-6 py-2 transition-all"
                  >
                    View Order Details
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isOpenForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <div className="text-center text-2xl font-bold uppercase mb-3">
                  Order Detail
                </div>
                {orderDetail.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm mb-4 bg-white"
                  >
                    <div className="flex justify-between items-center text-xl font-semibold text-gray-900 mb-3">
                      <span className="w-4/5 truncate">{item.name}</span>
                      <span className="text-sm font-normal text-gray-500">
                        ID: {item.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 mb-1">
                      <span className="font-medium">Quantity</span>
                      <span>{item.quantity}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 mb-1">
                      <span className="font-medium">Price per item</span>
                      <span>{formatCurrency(item.price)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-800 font-semibold mt-2">
                      <span>Total</span>
                      <span className="text-indigo-600">
                        {formatCurrency(item.total)}
                      </span>
                    </div>
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={() => repurchase(item.product_id)}
                        className="p-2 bg-[#9fcb93] text-sm text-black rounded-xs w-24 hover:scale-105 transition-all hover:text-white hover:bg-[#5a894c]"
                      >
                        Repurchase
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setIsOpenForm(false)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Your order items are blank</div>
      )}
    </div>
  );
}
