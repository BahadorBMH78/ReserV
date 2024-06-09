import { getProfilePic, getTime } from "@/app/api/queries";
import { useQuery } from "react-query";

type Data = {
  data: {
    id: string;
    enabled: boolean;
  };
};

type Time = {
  data: {
    enabled: boolean;
  };
};

export function useGetProfilePic(data: Data) {
  return useQuery(["pic", data], () => getProfilePic(data), {
    enabled: Boolean(data.data.enabled ?? false),
    retry: false,
    cacheTime: 0,
    staleTime: Infinity,
  });
}

export function useGetTime(data: Time) {
  return useQuery(["time", data], () => getTime(), {
    enabled: Boolean(data.data.enabled ?? false),
    retry: false,
    cacheTime: 0,
    staleTime: Infinity,
  });
}
