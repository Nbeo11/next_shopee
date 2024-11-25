import { GET, POST } from "./service";

export const orderProducts = async (address, phone, cart) => {
  return await POST("/order", {
    address: address,
    phone: phone,
    cart_item: cart,
  });
};

export const getAllOrders = async () => {
  return await GET("/orders");
};

export const getOrderDetail = async (id) => {
  return await GET(`/orders/${id}`);
};
