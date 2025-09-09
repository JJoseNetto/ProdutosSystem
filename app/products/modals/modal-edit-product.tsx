"use client";

import { z } from "zod";
import { authFetch } from "@/lib/api";
import { UpdateProductSchema } from "@/lib/validation";
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
  const [isStatusChecked, setIsStatusChecked] = useState(true);
  
  const { register, handleSubmit, clearErrors, formState: { errors }, reset, setValue} = useForm<z.infer<typeof UpdateProductSchema>>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: { 
      title: "", 
      description: "", 
      status: true 
    },
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("status", product.status);
      setIsStatusChecked(product.status);
    }
  }, [product, setValue]);

  const handleStatusChange = (checked: boolean) => {
    setIsStatusChecked(checked);
    setValue("status", checked, { shouldValidate: true });
  };

  const onSubmit = async (data: z.infer<typeof UpdateProductSchema>) => {
    try {
      if (!product) return;

      const requestBody = JSON.stringify({
        title: data.title,
        description: data.description,
        status: data.status
      });

      const response = await authFetch(`/products/${product.id}`, {
        method: "PUT",
        body: requestBody,
      });

      if (!response.ok) {
        addToast({
            title: "Error!",
            description: "Erro ao editar o produto",
            color: "success", 
        });
        return;
      }

        addToast({
            title: "Produto editado!",
            description: `O produto foi editado com sucesso.`,
            color: "success", 
        });

      onProductCreated();
      onClose();
    } catch (err: any) {
      addToast({
        title: "Error ao criar o produto!",
        description: `${err}`,
        color: "success", 
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
          Editar Produto {product?.title ? `- ${product.title}` : ''}
        </ModalHeader>

        <ModalBody className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Título *"
              placeholder="Digite o título"
              {...register("title")}
              variant="bordered"
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message ? errors.title.message : undefined}
            />

            <Input
              label="Descrição *"
              placeholder="Digite a descrição"
              {...register("description")}
              variant="bordered"
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message ? errors.description.message : undefined}
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
              <Button color="danger" variant="flat" onPress={onClose} type="button">
                Fechar
              </Button>
              <Button color="primary" type="submit">
                Salvar Alterações
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}