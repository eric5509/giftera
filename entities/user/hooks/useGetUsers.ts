import { useQuery } from "@tanstack/react-query";
import { getUsersAction, GetUsersParams } from "@/app/serverActions/user/getUsersAction";
import { User } from "../types/types";

export const useGetUsers = (params?: GetUsersParams, previousData?: User[]) =>
  useQuery<User[], Error>({
    queryKey: ["users", params],
    queryFn: () => getUsersAction(params),
    placeholderData: (previousData) => previousData, // v5 smooth pagination
  });
