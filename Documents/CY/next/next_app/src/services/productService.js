import { GET } from "./service";

export const getAllProducts = async () => {
  return await GET("/products");
};

export const getProductDetail = async (id) => {
  return await GET(`/products/${id}`);
};

export const checkout = async () => {
  return await GET("/products");
};
