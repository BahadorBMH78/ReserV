import { createAxiosInstance } from "@/hooks/helper";
import { api } from "../api";

type Data = {
  data: {
    username: string;
  };
};

export const reserve = async (data: Data) => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .post(api + "seats/reserve", data.data)
    .then((res) => res.data);
};

export const terminate = async (data: Data) => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .delete(api + `seats/terminate/${data.data.username}`)
    .then((res) => res.data);
};

export const profilePic = async (data: any) => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .post(api + `uploads/profilePicture`, data)
    .then((res) => res.data);
};
