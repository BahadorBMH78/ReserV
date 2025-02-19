import axios from "axios";
import { getSession } from "next-auth/react";
import { SessionType } from "@/types/next-auth";

export const createAxiosInstance = async () => {
  const API = process.env.NEXT_PUBLIC_API
  const session = await getSession();
  const user = session?.user as SessionType | undefined;
  const token = user?.token;
  console.log(token, "token");
  return axios.create({
    baseURL: API,
    timeout: 60000,
    headers: {
      "accept-language": "fa",
      "auth-token": token, // Add token to headers if user is defined
    },
  });
};
