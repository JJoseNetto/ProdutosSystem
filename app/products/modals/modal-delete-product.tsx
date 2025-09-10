"use client";

import { authFetch } from "@/lib/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
} from "@heroui/react";
import { Product } from "@/types/Product";
import { useState } from "react";
import { handleApiError, throwApiError } from "@/utils/errorHandler";

interface ModalDeleteProductProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: () => void;
  product: Product | null;
}

export default function ModalDeleteProduct({
  isOpen,
  onClose,
  onProductCreated,
  product
}: ModalDeleteProductProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);

    try {
      const response = await authFetch(`/products/${product.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throwApiError(response);

      addToast({
        title: "Produto deletado!",
        description: `O produto "${product.title}" foi removido com sucesso.`,
        color: "success",
      });

      onProductCreated();
      onClose();
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={(open) => !open && onClose()}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Deletar Produto
        </ModalHeader>

        <ModalBody className="flex flex-col gap-4">
          <form onSubmit={onSubmit}>
            <p>Deseja mesmo deletar o produto: {product?.title}?</p>

            <ModalFooter className="flex justify-end gap-2 mt-4">
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Sim
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                type="button"
                disabled={isSubmitting}
              >
                Não
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
