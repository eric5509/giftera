import { useQuery } from "@tanstack/react-query";
import { getAdminsAction } from "@/app/serverActions/admin/getAdminsAction";
import { Admin } from "@/entities/admin/types/types";

export const useGetAdmins = (params: any = {}, previousData?: Admin[]) =>
  useQuery<Admin[], Error>({
    queryKey: ["admins", params],
    queryFn: () => getAdminsAction(params),
    placeholderData: (previousData) => previousData, // ✅ v5 pattern
  });
