import { createAxiosInstance } from "@/hooks/helper";
import { api } from "../api";

type Data = {
  data: {
    id: string;
  };
};

export const boScan = async (data: any) => {
  const axiosInstance = await createAxiosInstance();

  return await axiosInstance
    .get(api + `users/boScan/${data.data.id}`)
    .then((res) => res.data);
};
