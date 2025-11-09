import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/shared/lib/supabase";
import { useCreateUser } from "@/entities/user/hooks/useCreateUser";
import { CreateUserInput } from "@/entities/user/types/types";
import { userExistsByEmail, userExistsByPhone } from "@/app/serverActions/user/userExists";
type Error = {
  fullName?: string;
  email?: string;
  password?: string;
  fallback?: string;
};

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<CreateUserInput>({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Error>({});
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) console.error("OAuth error:", error.message);
  };

  const { mutate } = useCreateUser();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors and validate fields
    setErrors({});
    const newErrors: Error = {};
    if (!values.email) newErrors.email = "Email is required";
    if (!values.password) newErrors.password = "Password is required";
    if (!values.fullName) newErrors.fullName = "Full name is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    // Check if user already exists in your users table
    const existsByEmail = await userExistsByEmail(values.email);
    if (existsByEmail) {
      setErrors({ email: "This email is already registered" });
      setIsLoading(false);
      return;
    }
    const {fullName, ...emailAndPassword} = values
    // Proceed with Supabase Auth signup
    // const { error } = await supabase.auth.signUp(emailAndPassword);
    console.log(emailAndPassword, "Email and Password")
    mutate(values);
    setIsLoading(false);

    // if (error) {
    //   const msg = error.message.toLowerCase();
    //   if (msg.includes("password")) {
    //     setErrors({ password: msg });
    //   } else {
    //     setErrors({ fallback: "Something went wrong. Try again." });
    //   }
    //   return;
    // }

    // Success
    // router.push("/dashboard");
  };

  return {
    handleSignup,
    onChange,
    isLoading,
    errors,
    handleOAuthSignIn,
    showPassword,
    setShowPassword,
    remember,
    setRemember,
    values,
  };
};
