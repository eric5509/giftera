import { useQuery } from "@tanstack/react-query";
import { getAdminByIdAction } from "@/app/serverActions/admin/getAdminByIdAction";
import { Admin } from "@/entities/admin/types/types";

export const useGetAdminById = (id: string) =>
  useQuery<Admin, Error>({
    queryKey: ["admins", id],
    queryFn: () => getAdminByIdAction(id),
    enabled: !!id,
  });
