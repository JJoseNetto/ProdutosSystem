import { useMemo } from "react";
import { Product } from "@/types/Product";

export const useProductFilters = (products: Product[], search: string, statusFilter: string) => {
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? p.status === true
          : p.status === false;

      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  return filteredProducts;
};