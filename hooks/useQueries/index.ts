import { getProfilePic } from "@/app/api/queries";
import { useQuery } from "react-query";

type Data = {
  data: {
    id: string;
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
