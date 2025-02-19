import { createAxiosInstance } from "@/hooks/helper";

type Data = {
  data: {
    username: string;
  };
};

const API = process.env.NEXT_PUBLIC_API

export const reserve = async (data: Data) => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .post(API + "seats/reserve", data.data)
    .then((res) => res.data);
};

export const enqueue = async (data: Data) => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .post(API + "seats/enqueue", data.data)
    .then((res) => res.data);
};

export const terminate = async (data: Data) => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .delete(API + `seats/terminate/${data.data.username}`)
    .then((res) => res.data);
};

export const profilePic = async (data: any) => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .post(API + `uploads/profilePicture`, data)
    .then((res) => res.data);
};
