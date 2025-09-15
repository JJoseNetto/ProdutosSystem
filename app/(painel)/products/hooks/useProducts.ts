import { getProducts } from "@/server/actions/products";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
export const useProducts = () => {
  const { execute, result, status } = useAction(getProducts);

  useEffect(() => {
    execute();
  }, []);

  const products = result.data?.success ? result.data.data.data : [];
  const loading = status === "executing";
  const error = status === "hasErrored" ? result.error?.message || "Falha ao carregar produtos" : null;

  return {
    products,
    loading,
    error,
    refetch: execute,
    meta: result.data?.success ? result.data.data.meta : null
  };
};
