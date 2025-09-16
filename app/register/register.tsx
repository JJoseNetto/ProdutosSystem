"use client";

import React from "react";
import {addToast, Button, Input, Link} from "@heroui/react";
import {Icon} from "@iconify/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { RegisterSchema, TRegisterRequestSchema } from "@/utils/schemas/auth.schema";
import { useAction } from "next-safe-action/hooks";
import { registerUser } from "@/server/actions/auth";

export default function Register() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const [error] = React.useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<TRegisterRequestSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  
  const { execute, isPending } = useAction(registerUser, {
    onSuccess() {
      router.push('/');
    },
    onError(err) {
      addToast({
        title: "Something went wrong",
        description: err.error.thrownError?.message,
        variant: 'solid',
        color: 'danger'
      })
    }
  })

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <p className="pb-4 flex text-left text-3xl font-semibold">
            <UserCircleIcon className="w-10 mr-2"/>
          Cadastre-se
        </p>
        
        {error && (
          <div className="bg-danger-50 text-danger p-3 rounded-medium text-sm">
            {error}
          </div>
        )}
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(execute)}>
          <Input
            label="Nome Completo"
            labelPlacement="outside"
            placeholder="Digite seu nome completo"
            variant="bordered"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message ? errors.name.message : undefined}
            {...register("name")}
          />
          
          <Input
            label="Email"
            labelPlacement="outside"
            placeholder="Digite seu email"
            type="email"
            variant="bordered"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message ? errors.email.message : undefined}
            {...register("email")}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Código do país"
              labelPlacement="outside"
              placeholder="ex: +55"
              variant="bordered"
              errorMessage={errors.phone?.country?.message}
              isInvalid={!!errors.phone?.country}
              {...register("phone.country")}
            />
            <Input
              label="DDD"
              labelPlacement="outside"
              placeholder="ex: 11"
              variant="bordered"
              errorMessage={errors.phone?.ddd?.message}
              isInvalid={!!errors.phone?.ddd}
              {...register("phone.ddd")}
            />
          </div>
            <Input
              label="Numero de telefone"
              labelPlacement="outside"
              placeholder="ex: 999999999"
              variant="bordered"
              errorMessage={errors.phone?.number?.message}
              isInvalid={!!errors.phone?.number}
              {...register("phone.number")}
            />
          
          <Input
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Senha"
            labelPlacement="outside"
            placeholder="Digite sua senha"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            {...register("password")}
          />
          
          <Input
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Confirmar senha"
            labelPlacement="outside"
            placeholder="Confirme sua senha"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
            errorMessage={errors.verifyPassword?.message}
            isInvalid={!!errors.verifyPassword}
            {...register("verifyPassword")}
          />
          
          <Button 
            color="primary" 
            type="submit"
            isLoading={isPending}
            disabled={isPending}
          >
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
        
        <p className="text-small text-center">
          <Link size="sm">
            <NextLink href="/">Já tem uma conta? Faça Login</NextLink>
          </Link>
        </p>
      </div>
    </div>
  );
}