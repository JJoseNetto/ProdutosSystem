import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addToast } from '@heroui/react';
import { CreateProductSchema, TCreateProductSchema, TUpdateProductSchema, UpdateProductSchema } from '@/utils/schemas/product.schema';

export const useProductForm = (mode: 'create' | 'edit') => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatusChecked, setIsStatusChecked] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const isEditMode = mode === 'edit';
  const schema = isEditMode ? UpdateProductSchema : CreateProductSchema;

  const { register, handleSubmit, setValue, reset, clearErrors, formState: { errors }, watch } = useForm<TCreateProductSchema | TUpdateProductSchema>({
    resolver: zodResolver(schema),
    defaultValues: { 
      title: "", 
      description: "", 
      thumbnail: undefined,
      status: true 
    }
  });

  const handleStatusChange = (checked: boolean) => {
    setIsStatusChecked(checked);
    console.log(checked);
    setValue("status", checked, { shouldValidate: true });
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

  return {
    isEditMode,
    isSubmitting,
    setIsSubmitting,
    isStatusChecked,
    fileInputRef,
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    errors,
    watch,
    handleStatusChange,
    handleFileChange
  };
};