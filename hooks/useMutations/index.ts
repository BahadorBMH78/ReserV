import { reserve, terminate, profilePic } from "@/app/api/mutations";
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

export function useProfilePic() {
  return useMutation((data: any) => profilePic(data));
}