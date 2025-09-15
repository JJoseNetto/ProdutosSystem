import { getProducts } from "@/server/actions/products";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { addToast } from "@heroui/react";

export const useProducts = (initialPage = 1, pageSize = 10) => {
  const [page, setPage] = useState(initialPage);

  const { execute, result, isPending } = useAction(getProducts, {
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
    execute({ page, pageSize });
  }, [page, pageSize]);

  const products = result.data?.success ? result.data.data.data : [];
  const loading = isPending;
  const meta = result.data?.success ? result.data.data.meta : null;

  return {
    products,
    loading,
    refetch: execute,
    meta,
    page,
    setPage,
    pageSize,
  };
};
