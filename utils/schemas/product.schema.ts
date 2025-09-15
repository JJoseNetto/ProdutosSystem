// src/utils/schemas/products.schema.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.boolean(),
  updatedAt: z.string().datetime(),
});

export const MetaSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const ProductsResponseSchema = z.object({
  data: z.array(ProductSchema),
  meta: MetaSchema,
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

export type TProductSchema = z.infer<typeof ProductSchema>;
export type TMetaSchema = z.infer<typeof MetaSchema>;
export type TProductsResponseSchema = z.infer<typeof ProductsResponseSchema>;
export type TCreateProductSchema = z.infer<typeof CreateProductSchema>;
export type TUpdateProductSchema = z.infer<typeof UpdateProductSchema>;