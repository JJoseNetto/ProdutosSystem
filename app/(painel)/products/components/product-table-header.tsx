import { Divider, Button } from "@heroui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface ProductTableHeaderProps {
  onAddProduct: () => void;
}

export const ProductTableHeader = ({ onAddProduct }: ProductTableHeaderProps) => {
  return (
    <div className="mb-8 text-2xl">
      <div className="flex justify-between items-center mb-2">
        <h1>Produtos</h1>
        <Button variant="ghost" size="sm" 
          className="text-sm flex items-center gap-1" 
          onPress={onAddProduct}>
          Adicionar <PlusCircleIcon className="w-4 h-4" />
        </Button>
      </div>
      <Divider />
    </div>
  );
};