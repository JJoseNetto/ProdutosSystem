"use client";

import React, { useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination,
} from "@heroui/react";
import {
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { useProducts } from "@/app/(painel)/products/hooks/useProducts";
import { useProductFilters } from "@/app/(painel)/products/hooks/useProductFilters";
import { ProductTableHeader } from "@/app/(painel)/products/components/product-table-header";
import { ProductTableFilters } from "@/app/(painel)/products/components/product-table-filters";
import ModalProduct from "./modals/modal-product";
import { Product } from "@/types/Product";
import ModalDeleteProduct from "./modals/modal-delete-product";

export const columns = [
  { name: "Titulo", uid: "title" },
  { name: "Descrição", uid: "description" },
  { name: "Status", uid: "status" },
  { name: "Ações", uid: "actions" },
];

export default function TabelaProducts() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const { products, loading, refetch, meta, page, setPage, pageSize } = useProducts();
  const filteredProducts = useProductFilters(products, search, statusFilter);

  const handleProductCreated = () => refetch({ page, pageSize });

  const totalPages = meta?.totalPages || 1;

  const renderCell = useCallback((product: Product, columnKey: string) => {
    const cellValue = (product as any)[columnKey];

    switch (columnKey) {
      case "title":
        return <p className="text-sm capitalize">{cellValue}</p>;
      case "description":
        return <p className="text-sm text-default-400">{cellValue}</p>;
      case "status":
        return (
          <Chip
            className="capitalize text-xs px-2"
            color={cellValue ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {cellValue ? "Ativo" : "Inativo"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center justify-center gap-2">
            <Tooltip content="Editar">
              <span
                className="cursor-pointer"
                onClick={() => {
                  setEditingProduct(product);
                  setIsModalOpen(true);
                }}
              >
                <PencilSquareIcon className="w-4 h-4 text-zinc-500" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Excluir">
              <span className="cursor-pointer">
                <TrashIcon
                  onClick={() => setDeleteProduct(product)}
                  className="w-4 h-4 text-red-500"
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <span>{cellValue}</span>;
    }
  }, []);

  return (
    <div>
      <ProductTableHeader onAddProduct={() => setIsModalOpen(true)} />

      <div className="flex justify-between mb-4">
        <ProductTableFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      <div className="overflow-x-auto w-full">
        <Table
          removeWrapper
          className="border border-zinc-900 rounded-xl text-sm [&_td]:py-2 [&_th]:py-2 min-w-[600px]"
          aria-label="Tabela de produtos"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={filteredProducts}
            loadingState={loading ? "loading" : "idle"}
            emptyContent={"Nenhum produto cadastrado"}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey as string)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="py-2 px-2 flex justify-between items-center overflow-hidden">
          <span className="text-sm text-default-400">
            Página {page} de {totalPages}
          </span>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={setPage}
          />
        </div>

        <ModalProduct
          isOpen={isModalOpen || !!editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onProductCreated={handleProductCreated}
          product={editingProduct}
          mode={editingProduct ? "edit" : "create"}
        />

        <ModalDeleteProduct
          isOpen={!!deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onProductCreated={handleProductCreated}
          product={deleteProduct}
        />
      </div>
    </div>
  );
}
