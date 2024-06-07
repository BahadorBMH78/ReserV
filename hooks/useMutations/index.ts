import { reserve, terminate } from "@/app/api/mutations";
import { useMutation } from "react-query";

type Reserve = {
  data: {
    username: string;
  };
};

export function useReserve() {
  return useMutation((data: Reserve) => reserve(data));
}

export function useTerminate() {
  return useMutation((data: Reserve) => terminate(data));
}
