"use client";

import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/Button";
import { signIn } from "next-auth/react";

type Variant = "login" | "register";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("login");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "login") {
      setVariant("register");
    } else {
      setVariant("login");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "register") {
      // Axios register
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", { ...data, redirect: false }))
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            toast.success("Logged in successfully!");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }
    if (variant === "login") {
      // NextAuth login
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const googleAuth = (action: string) => {
    setIsLoading(true);
    // NextAuth google auth
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Something went wrong!");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 mx-auto w-full sm:max-w-md">
      <div className="bg-white shadow px-4 py-3 rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "register" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
              required
            />
          )}
          <Input
            id="email"
            label="Email"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />

          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "login" ? "Sign In" : "Register"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-slate-600 font-medium">
                Or Continue with Google account
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              fullWidth
              type="button"
              onClick={() => googleAuth("google")}
            >
              <BsGoogle className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6 text-sm text-slate-600 p-1 ">
          <div>
            {variant === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </div>
          <div
            className="underline cursor-pointer font-semibold hover:text-sky-600"
            onClick={toggleVariant}
          >
            {variant === "login" ? "Register" : "Sign In"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
