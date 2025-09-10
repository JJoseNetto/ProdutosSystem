"use client";

import { authFetch } from "@/lib/api";
import { CreateProductFormData, CreateProductSchema } from "@/lib/validation";
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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiError, throwApiError } from "@/utils/errorHandler";

interface ModalProductProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: () => void;
}

export default function ModalProduct({ isOpen, onClose, onProductCreated }: ModalProductProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, clearErrors, formState: { errors }, reset, setValue } = useForm<CreateProductFormData>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: { title: "", description: "", thumbnail: undefined },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  const onSubmit = async (data: CreateProductFormData) => {
    if (!data.thumbnail) {
      addToast({
        title: "Erro",
        description: "O arquivo de thumbnail é obrigatório",
        color: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("thumbnail", data.thumbnail);

      const response = await authFetch("/products", { method: "POST", body: formData });

      if (!response.ok) throwApiError(response);

      addToast({
        title: "Produto criado!",
        description: `O produto "${data.title}" foi criado com sucesso.`,
        color: "success",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      addToast({ title: "Erro", description: "Somente imagens são permitidas.", color: "warning" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      addToast({ title: "Erro", description: "O arquivo deve ter no máximo 5MB.", color: "warning" });
      return;
    }

    clearErrors("thumbnail");
    setValue("thumbnail", file);
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
              <Button color="danger" variant="flat" onPress={onClose} type="button" disabled={isSubmitting}>
                Fechar
              </Button>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}