import { createAxiosInstance } from "@/hooks/helper";
import { api } from "../api";

type Data = {
  data: {
    id: string;
  };
};

export const getProfilePic = async (data: Data) => {
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .get(api + `uploads/profilePicture/${data.data.id}`)
    .then((res) => res.data);
};
