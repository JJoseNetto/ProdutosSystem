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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (!product) return;

        await authFetch(`/products/${product.id}`, {
            method: "DELETE",
        });

        onProductCreated();
        onClose();

        addToast({
          title: "Produto deletado!",
          description: `O produto "${product.title}" foi removido com sucesso.`,
          color: "success", 
        });

    } catch (err: any) {
      console.error("Erro ao deletar produto:", err);
      addToast({
        title: "Erro",
        description: "Não foi possível deletar o produto.",
        color: "danger",
      });
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
              <Button color="primary" type="submit">
                Sim
              </Button>
              <Button color="danger" variant="flat" onPress={onClose} type="button">
                Não
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
