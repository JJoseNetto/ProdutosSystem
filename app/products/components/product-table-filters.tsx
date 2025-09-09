"use client"
import { Input, Select, SelectItem } from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ProductTableFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const ProductTableFilters = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: ProductTableFiltersProps) => {
  return (
    <div className="w-[300px] flex">
      <Input
        isClearable
        type="text"
        placeholder="Pesquise..."
        className="text-sm mr-2"
        variant="bordered"
        size="sm"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        startContent={<MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />}
      />

      <Select
        size="sm"
        variant="bordered"
        selectedKeys={[statusFilter]}
        onChange={(e) => onStatusFilterChange(e.target.value)}
      >
        <SelectItem key="all">Todos</SelectItem>
        <SelectItem key="active">Ativos</SelectItem>
        <SelectItem key="inactive">Inativos</SelectItem>
      </Select>
    </div>
  );
};