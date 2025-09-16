"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  addToast
} from "@heroui/react";
import { useEffect } from "react";
import { Product } from "@/types/Product";
import { useProductForm } from "@/app/(painel)/products/hooks/useProductForm";
import { FileInputField } from "@/app/(painel)/products/components/forms/file-input-field";
import { StatusSwitch } from "@/app/(painel)/products/components/forms/status-switch";
import { useAction } from "next-safe-action/hooks";
import { createProduct, editProduct } from "@/server/actions/products";
import { TCreateProductSchema, TUpdateProductSchema } from "@/utils/schemas/product.schema";

interface ModalProductProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: () => void;
  product: Product | null;
  mode: "create" | "edit";
}

export default function ModalProduct({
  isOpen,
  onClose,
  onProductCreated,
  product,
  mode = "create",
}: ModalProductProps) {
  const {
    isEditMode,
    isSubmitting,
    fileInputRef,
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    errors,
    watch,
    handleStatusChange,
    handleFileChange,
  } = useProductForm(mode);

  const { execute: executeCreate} = useAction(createProduct, {
    onSuccess(data) {
        addToast({
          title: "Produto criado!",
          description: data.data.data.mensagem || `O produto foi criado com sucesso.`,
          color: "success",
        });
        onProductCreated();
        onClose();
        reset();
      },
    onError(error: any) {
      addToast({
        title: "Algo deu errado",
        description: error?.message || "Tente Novamente!",
        color: "danger",
      });
    },
  });

  const { execute: executeEdit} = useAction(editProduct, {
    onSuccess(data) {
        addToast({
          title: "Produto editado!",
          description: data.data.data.mensagem || `O produto foi editado com sucesso.`,
          color: "success",
        });
        onProductCreated();
        onClose();
        reset();
      },
    onError(error: any) {
      addToast({
        title: "Algo deu errado",
        description: error?.message || "Tente Novamente!",
        color: "danger",
      });
    },
  });


  useEffect(() => {
    if (isOpen) {
      if (isEditMode && product) {
        setValue("title", product.title);
        setValue("description", product.description);
        setValue("status", product.status);
      } else {
        reset();
        clearErrors();
      }
    }
  }, [isOpen, product, setValue, reset, clearErrors, isEditMode]);

  const handleCreate = async (data: TCreateProductSchema) => {
    try {
      if (!data.thumbnail) throw new Error("Thumbnail obrigatório");

      await executeCreate(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (data: TUpdateProductSchema) => {
    try {
      await executeEdit({ ...data, id: product?.id || "" });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data: TCreateProductSchema | TUpdateProductSchema) => {
    if (isEditMode) {
      await handleUpdate(data as TUpdateProductSchema);
    } else {
      await handleCreate(data as TCreateProductSchema);
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
          {isEditMode
            ? `Editar Produto ${product?.title ? `- ${product.title}` : ""}`
            : "Adicionar Produto"}
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
              value={watch("title")}
            />

            <Input
              label="Descrição *"
              placeholder="Digite a descrição"
              {...register("description")}
              variant="bordered"
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
              value={watch("description")}
            />

            {!isEditMode && (
              <FileInputField
                id="thumbnail"
                label="Thumbnail *"
                error={errors && "thumbnail" in errors ? errors.thumbnail : undefined}
                fileInputRef={fileInputRef}
                onChange={handleFileChange}
              />
            )}

            {isEditMode && (
              <>
                <StatusSwitch
                  isChecked={!!watch("status")}
                  onValueChange={handleStatusChange}
                  label="Produto ativo"
                />
                <input type="hidden" {...register("status")} />
              </>
            )}

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
                {isEditMode ? "Salvar Alterações" : "Salvar"}
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
