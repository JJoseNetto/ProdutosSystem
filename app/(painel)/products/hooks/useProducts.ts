import { getProducts } from "@/server/actions/products";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { addToast } from "@heroui/react";

export const useProducts = () => {
  const { execute, result, isPending, status } = useAction(getProducts, {
    onSuccess() {
      addToast({
        title: "Produtos carregados",
        description: "Produtos encontrados.",
        variant: "solid",
        color: "success",
      });
    },
    onError(err) {
      addToast({
        title: "Erro ao carregar produtos",
        description: err.error.thrownError?.message || "Algo deu errado",
        variant: "solid",
        color: "danger",
      });
    },
  });

  useEffect(() => {
    execute();
  }, []);

  const products = result.data?.success ? result.data.data.data : [];
  const loading = isPending;

  return {
    products,
    loading,
    refetch: execute,
    meta: result.data?.success ? result.data.data.meta : null,
  };
};
