"use client";

import { authFetch } from "@/lib/api";
import { UpdateProductFormData, UpdateProductSchema } from "@/lib/validation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Switch,
  addToast
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/types/Product";
import { handleApiError, throwApiError } from "@/utils/errorHandler";

interface ModalEditProductProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: () => void;
  product: Product | null;
}

export default function ModalEditProduct({
  isOpen,
  onClose,
  onProductCreated,
  product
}: ModalEditProductProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatusChecked, setIsStatusChecked] = useState(true);

  const { register, handleSubmit, setValue, reset, clearErrors, formState: { errors } } = useForm<UpdateProductFormData>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: { title: "", description: "", status: true }
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  useEffect(() => {
    if (isOpen && product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("status", product.status);
      setIsStatusChecked(product.status);
    }
  }, [isOpen, product, setValue]);

  const handleStatusChange = (checked: boolean) => {
    setIsStatusChecked(checked);
    setValue("status", checked, { shouldValidate: true });
  };

  const onSubmit = async (data: UpdateProductFormData) => {
    if (!product) return;

    setIsSubmitting(true);

    try {
      const requestBody = JSON.stringify({
        title: data.title,
        description: data.description,
        status: data.status
      });

      const response = await authFetch(`/products/${product.id}`, {
        method: "PUT",
        body: requestBody
      });

      if (!response.ok) throwApiError(response);

      addToast({
        title: "Produto editado!",
        description: `O produto "${data.title}" foi atualizado com sucesso.`,
        color: "success"
      });

      onProductCreated();
      onClose();
      reset();
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
          Editar Produto {product?.title ? `- ${product.title}` : ""}
        </ModalHeader>

        <ModalBody className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Título *"
              placeholder="Digite o título"
              {...register("title")}
              variant="bordered"
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
            />

            <Input
              label="Descrição *"
              placeholder="Digite a descrição"
              {...register("description")}
              variant="bordered"
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
            />

            <div className="flex items-center">
              <Switch
                isSelected={isStatusChecked}
                onValueChange={handleStatusChange}
              />
              <span className="ml-2 text-sm">Produto ativo</span>
            </div>

            <input type="hidden" {...register("status")} />

            <ModalFooter className="flex justify-end gap-2 mt-4">
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                type="button"
                disabled={isSubmitting}
              >
                Fechar
              </Button>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Salvar Alterações
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
