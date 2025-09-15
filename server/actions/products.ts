"use server";

import { CreateProductSchema, ProductsResponseSchema, TProductsResponseSchema, UpdateProductSchema } from "@/utils/schemas/product.schema";
import { authActionClient, ActionError } from "../action-client";
import { ApiResponseSchema } from "@/utils/schemas/api.schema";
import z from "zod";

export const getProducts = authActionClient
  .metadata({
    actionName: "getProducts",
  })
  .inputSchema(
    z.object({
      page: z.number().min(0).optional(),
      pageSize: z.number().min(1).optional(),
    })
  )
  .outputSchema(ApiResponseSchema(ProductsResponseSchema))
  .action(async ({ ctx, parsedInput }) => {
    try {
      const query = new URLSearchParams();
      if (parsedInput.page !== undefined) query.append("page", String(parsedInput.page));
      if (parsedInput.pageSize !== undefined) query.append("pageSize", String(parsedInput.pageSize));

      const res = await fetch(`${ctx.apiUrl}/products?${query.toString()}`, {
        method: "GET",
        headers: ctx.headers,
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new ActionError(errorData.message || "Failed to fetch products");
      }

      const data = (await res.json()) as TProductsResponseSchema;
      console.log("Fetched products:", data);

      return {
        success: true,
        data,
        message: "Products fetched successfully",
      };
    } catch (error) {
      console.error("Get products error:", error);
      throw new ActionError("Failed to fetch products");
    }
  });


export const createProduct = authActionClient
  .metadata({
    actionName: "createProduct",
  })
  .inputSchema(CreateProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    console.log("Creating product with input:", parsedInput);

    const formData = new FormData();
    formData.append("title", parsedInput.title);
    formData.append("description", parsedInput.description);
    if (parsedInput.thumbnail instanceof File) {
      formData.append("thumbnail", parsedInput.thumbnail);
    }

    try {
      const res = await fetch(`${ctx.apiUrl}/products`, {
        method: "POST",
        headers: {
          Authorization: ctx.headers?.Authorization,
        },
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new ActionError(`Server returned ${res.status}: ${errorText}`);
      }

      const responseData = await res.json()

      return {
        success: true,
        data: responseData,
        message: "Product created successfully",
      };
    } catch (error) {
      console.error("Create product error:", error);
      throw new ActionError("Failed to create product");
    }
  });


export const editProduct = authActionClient
  .metadata({
    actionName: "editProduct",
  })
  .inputSchema(UpdateProductSchema.extend({
    id: z.string(),
  }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      const { id, ...rest } = parsedInput;
      const res = await fetch(`${ctx.apiUrl}/products/${id}`, {
        method: "PUT",
        headers: {...ctx.headers},
        body: JSON.stringify(parsedInput),
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new ActionError(`Server returned ${res.status}: ${errorText}`);
      }

      const responseData = await res.json()

      return {
        success: true,
        data: responseData,
        message: "Product edited successfully",
      };
    } catch (error) {
      console.error("Edit product error:", error);
      throw new ActionError("Failed to edit product");
    }
  });

export const deleteProduct = authActionClient
  .metadata({
    actionName: "deleteProduct",
  })
  .inputSchema(z.object({
    id: z.string(),
  }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      const res = await fetch(`${ctx.apiUrl}/products/${parsedInput.id}`, {
        method: "DELETE",
        headers: ctx.headers,
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new ActionError(`Server returned ${res.status}: ${errorText}`);
      }

      return {
        success: true,
        message: "Product deleted successfully",
      };
    } catch (error) {
      console.error("Delete product error:", error);
      throw new ActionError("Failed to delete product");
    }
  });
