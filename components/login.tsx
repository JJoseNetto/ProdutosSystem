"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { LoginFormData, loginSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/authStore";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState("");
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError("");

    try {
      const response = await loginUser(data);

      if (response.token) {
        setToken(response.token);
        setUser(response.user);

        router.push("/dashboard");
      } else {
        throw new Error("No token received from server");
      }
    } catch (err: any) {
      setApiError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <p className="pb-4 flex text-left text-3xl font-semibold">
          <UserCircleIcon className="w-10 mr-2"/>
          Connectar-se
        </p>

        <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            labelPlacement="outside"
            placeholder="Digite seu email"
            type="email"
            variant="bordered"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message ? errors.email.message : undefined}
          />
          <Input
            endContent={
              <button type="button" onClick={toggleVisibility}>
                <Icon
                  className="text-default-400 pointer-events-none text-2xl"
                  icon={isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"}
                />
              </button>
            }
            label="Senha"
            labelPlacement="outside"
            placeholder="Digite sua senha"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message ? errors.password.message : undefined}
          />
          <Button className="w-full" color="primary" type="submit" isLoading={isLoading}>
            Acessar
          </Button>
        </Form>

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

        <p className="text-small text-center">
          <Link size="sm" as={NextLink} href="/register">
            Criar uma conta
          </Link>
        </p>
      </div>
    </div>
  );
}
