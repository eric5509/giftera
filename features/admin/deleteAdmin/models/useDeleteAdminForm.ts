import { useDeleteAdmin } from "@/entities/admin/hooks/useDeleteAdmin";
import { useState } from "react";

export const useDeleteAdminForm = () => {
  const { mutate, isPending, isError, error, isSuccess } = useDeleteAdmin();
  const [id, setId] = useState("");
  const createDeleteAdminRequest = () => {
    mutate(id);
  };
  return {
    isLoading: isPending,
    isSuccess,
    isError,
    error,
    setId,
    id,
    createDeleteAdminRequest,
  };
};
