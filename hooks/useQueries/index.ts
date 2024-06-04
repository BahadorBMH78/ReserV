import { boScan } from "@/app/api/queries";
import { useQuery } from "react-query";

type Data = {
  data: {
    id: string;
    enabled: boolean;
    role?: string;
  };
};

export function useBoScan(data: any) {
  return useQuery(["bo", data], () => boScan(data), {
    enabled: Boolean(data.data.enabled ?? false),
    retry: false,
    cacheTime: 0,
    staleTime: Infinity,
  });
}
