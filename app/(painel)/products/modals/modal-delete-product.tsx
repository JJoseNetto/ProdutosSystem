"use client";

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
import { useAction } from "next-safe-action/hooks";
import { deleteProduct } from "@/server/actions/products";

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

  const { execute, isPending} = useAction(deleteProduct, {
    onSuccess(data) {
      addToast({
          title: "Produto deletado!",
          description: data.data.message || `O produto foi deletado com sucesso.`,
          color: "success",
        });
      onProductCreated();
      onClose();
    },
    onError(err) {
      addToast({
        title: "Something went wrong",
        description: err.error.thrownError?.message,
        variant: 'solid',
        color: 'danger'
      })
    }
  })

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
          <form onSubmit={(e) => {
            e.preventDefault();
            execute({ id: product?.id || "" });
          }}>
            <p>Deseja mesmo deletar o produto: {product?.title}?</p>

            <ModalFooter className="flex justify-end gap-2 mt-4">
              <Button color="primary" type="submit" disabled={isPending}>
                Sim
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                type="button"
                disabled={isPending}
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
