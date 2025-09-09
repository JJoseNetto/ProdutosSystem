import { z } from "zod";

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

export const CreateProductSchema = z.object({
  title: z.string()
    .min(1, "Título é obrigatório")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  description: z.string()
    .min(1, "Descrição é obrigatória")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  thumbnail: z.instanceof(File, { message: "Thumbnail é obrigatória" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Arquivo deve ter no máximo 5MB")
    .refine((file) => 
      ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type), 
      "Apenas imagens são permitidas (JPEG, PNG, GIF, WEBP)"
    ),
});

export const UpdateProductSchema = z.object({
  title: z.string()
    .min(1, "Título é obrigatório")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  description: z.string()
    .min(1, "Descrição é obrigatória")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  status: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type CreateProductSchema = z.infer<typeof CreateProductSchema>;
export type UpdateProductFormData = z.infer<typeof UpdateProductSchema>;