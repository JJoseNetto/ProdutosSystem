import { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { authFetch } from "@/lib/api";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await authFetch("/products", { method: "GET" });
      const data = await response.json();
      setProducts(data.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Falha ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};