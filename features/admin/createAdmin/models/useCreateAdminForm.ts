import { useCreateAdmin } from "@/entities/admin/hooks/useCreateAdmin";
import { CreateAdminInput } from "@/entities/admin/types/types";
import { useState } from "react";

export const useCreateAdminForm = () => {
  const [values, setValues] = useState<CreateAdminInput>({
    email: "",
    firstName: "",
    lastName: "",
    role: "MODERATOR",
  });

  const [errors, setErrors] = useState<CreateAdminInput>({
    email: "",
    firstName: "",
    lastName: "",
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const { mutate, isPending, isError, error, isSuccess } = useCreateAdmin();
  const createAdminRequest = () => {
    mutate({ ...values });
  };
  return {
    onChange,
    values,
    setValues,
    errors,
    setErrors,
    createAdminRequest,
    isLoading: isPending,
    isError,
    isSuccess,
    error,
  };
};
