"use client";

import { z } from "zod";
import { authFetch } from "@/lib/api";
import { CreateProductSchema } from "@/lib/validation";
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
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalProductProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: () => void;
}

export default function ModalProduct({ isOpen, onClose, onProductCreated }: ModalProductProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, clearErrors, formState: { errors }, reset, setValue } = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: { title: "", description: "", thumbnail: undefined },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      clearErrors();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isOpen, reset, clearErrors]);

  const onSubmit = async (data: z.infer<typeof CreateProductSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("thumbnail", data.thumbnail);

      const response = await authFetch("/products", {
        method: "POST",
        body: formData,
      });

      if(!response.ok) {
        addToast({
          title: "Error!",
          description: "Erro ao criar o produto!",
          color: "success", 
        });
      }

        addToast({
          title: "Produto criado!",
          description: `O produto "${data.title}" foi criado com sucesso.`,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      clearErrors("thumbnail");
      setValue("thumbnail", file); 
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={(open) => !open && onClose()}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Adicionar Produto</ModalHeader>

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

            <div>
              <label className={`text-xs text-foreground-600 ${
                  errors.thumbnail ? "!text-[hsl(339,90%,51%)]" : ""
                }`}>Thumbnail *</label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className={`w-full p-2 border-2 border-neutral-700 text-zinc-300 text-xs rounded-md mt-1 ${
                  errors.thumbnail ? "!border-[hsl(339,90%,51%)]" : ""
                }`}
              />
              {errors.thumbnail && (
                <p className="text-[hsl(339,90%,51%)] text-xs mt-1">{errors.thumbnail.message}</p>
              )}
            </div>

            <ModalFooter className="flex justify-end gap-2 mt-4">
              <Button color="danger" variant="flat" onPress={onClose} type="button">
                Fechar
              </Button>
              <Button color="primary" type="submit">
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}