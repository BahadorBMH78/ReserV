import { createAxiosInstance } from "@/hooks/helper";

type Data = {
  data: {
    id: string;
  };
};

const API = process.env.NEXT_PUBLIC_API

export const getProfilePic = async (data: Data) => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .get(API + `uploads/profilePicture/${data.data.id}`)
    .then((res) => res.data);
};

export const getTime = async () => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance.get(API + `seats/getTime`).then((res) => res.data);
};
