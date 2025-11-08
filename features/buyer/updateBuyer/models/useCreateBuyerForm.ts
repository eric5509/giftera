import { useCreateBuyer } from "@/entities/buyer/hooks/useCreateBuyer";
import { CreateBuyerInput } from "@/entities/buyer/types/types";
import { useState } from "react";

export const useCreateBuyerForm = () => {
  const { mutate, isPending, isSuccess, isError, error } = useCreateBuyer();
  const [values, setValues] = useState<CreateBuyerInput>({
    userId: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    county: "",
    address: "",
  });
  const [errors, setErrors] = useState<CreateBuyerInput>({
    userId: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    county: "",
    address: "",
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const createBuyerRequest = () => {
    mutate(values);
  };
  return {
    isLoading: isPending,
    isSuccess,
    isError,
    createBuyerRequest,
    error,
    onChange,
    values,
    errors,
  };
};
