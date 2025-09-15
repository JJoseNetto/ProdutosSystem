import z from "zod";
import { UserSchema } from "./user.schema";

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const RegisterSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Por favor, insira um endereço de e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  verifyPassword: z.string(),
  phone: z.object({
    country: z.string().min(1, "O código do país é obrigatório"),
    ddd: z.string().min(2, "O DDD é obrigatório"),
    number: z.string().min(8, "O número de telefone é obrigatório"),
  }),
}).refine((data) => data.password === data.verifyPassword, {
  message: "As senhas não coincidem",
  path: ["verifyPassword"],
});

export const RegisterResponseSchema = z.object({
  token: z.string().optional(),
  message: z.string(),
  codeIntern: z.string(),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type TLoginRequestSchema = z.infer<typeof loginSchema>;
export type TRegisterRequestSchema = z.infer<typeof RegisterSchema>;
export type TRegisterResponseSchema = z.infer<typeof RegisterResponseSchema>;
export type TLoginResponseSchema = z.infer<typeof LoginResponseSchema>;
