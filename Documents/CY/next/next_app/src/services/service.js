import { axiosInstance } from "./Axios";

export const POST = async (url, data) => await axiosInstance.post(url, data);

export const GET = async (url, params) =>
  await axiosInstance.get(url, { params });
