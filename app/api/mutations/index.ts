import { createAxiosInstance } from "@/hooks/helper";
import { api } from "../api";

type Data = {
  data: {
    username: string;
  };
};

export const reserve = async (data: Data) => {
  console.log(data.data, "data.data")
  const axiosInstance = await createAxiosInstance();
  return await axiosInstance
    .post(api + "seats/reserve", data.data)
    .then((res) => res.data);
};
