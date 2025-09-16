"use server";

import { actionClient, ActionError } from "../action-client";
import { ApiResponseSchema } from "@/utils/schemas/api.schema";
import {
  LoginResponseSchema,
  loginSchema,
  RegisterResponseSchema,
  RegisterSchema,
  TLoginResponseSchema,
  TRegisterResponseSchema,
} from "@/utils/schemas/auth.schema";
import { cookies } from "next/headers";

export const registerUser = actionClient
  .metadata({
    actionName: "criarUsuario",
  })
  .inputSchema(RegisterSchema)
  .outputSchema(ApiResponseSchema(RegisterResponseSchema))
  .action(async ({ parsedInput, ctx }) => {
    console.log(JSON.stringify(parsedInput));

    const res = await fetch(`${ctx.apiUrl}/users`, {
      body: JSON.stringify({
        ...parsedInput,
      }),
      method: "POST",
      headers: ctx.headers,
      credentials: "include",
    });

    if (!res.ok) {
      console.log(await res.json());
      throw new ActionError("Failed to create user");
    }

    const data = (await res.json()) as TRegisterResponseSchema;

    if (!data?.token) {
      throw new ActionError("Failed to generate token");
    }

    return {
      success: true,
      data,
      message: "Cadastro feito com sucesso!",
    };
  });

export const loginUser = actionClient
  .metadata({
    actionName: "loginUser",
  })
  .inputSchema(loginSchema)
  .outputSchema(ApiResponseSchema(LoginResponseSchema))
  .action(async ({ parsedInput, ctx }) => {
    const res = await fetch(`${ctx.apiUrl}/auth/login`, {
      body: JSON.stringify(parsedInput),
      credentials: "include",
      headers: ctx.headers,
      method: "POST",
    });

    if (!res.ok) throw new ActionError("Something went wrong");

    const data = (await res.json()) as TLoginResponseSchema;

    if (!data?.token) {
      throw new ActionError("Falha ao fazer login. ");
    }

    (await cookies()).set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return {
      data,
      message: "Login feito!",
      success: true,
    };
  });
