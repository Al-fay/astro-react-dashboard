import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type Updater,
  type VisibilityState,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  ChevronDown,
  PlusCircle,
  Search,
  SquarePen,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem } from "../ui/select";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Product = {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
};

const data: Product[] = [
  { id: 1, name: "Pensil", category: "Alat Tulis", stock: 120, price: 2000 },
  { id: 2, name: "Pulpen", category: "Alat Tulis", stock: 80, price: 3500 },
  { id: 3, name: "Buku Tulis", category: "Buku", stock: 45, price: 8000 },
  { id: 4, name: "Penghapus", category: "Alat Tulis", stock: 20, price: 1500 },
  { id: 5, name: "Spidol", category: "Alat Tulis", stock: 25, price: 12000 },
  { id: 6, name: "Penggaris", category: "Alat Tulis", stock: 30, price: 15000 },
  { id: 7, name: "Buku Gambar", category: "Buku", stock: 20, price: 5000 },
];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: () => (
      <span className="font-medium text-foreground">Nama Produk</span>
    ),
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "category",
    header: () => <span className="font-medium text-foreground">Kategori</span>,
    cell: ({ getValue }) => (
      <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: () => <span className="font-medium">Stok</span>,
    cell: ({ getValue }) => {
      const stock = getValue<number>();
      return (
        <span
          className={
            stock < 30
              ? "font-semibold text-destructive"
              : "font-semibold text-emerald-600 dark:text-emerald-400"
          }
        >
          {stock}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <span className="font-medium">Harga</span>,
    cell: ({ getValue }) => (
      <span>Rp {getValue<number>().toLocaleString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <span className="font-medium">Aksi</span>,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              console.log("Hapus : ", product);
            }}
            size="sm"
            variant="destructive"
            className="cursor-pointer"
          >
            <Trash />
            Hapus
          </Button>
          <Button
            onClick={() => {
              console.log("Edit : ", product);
            }}
            size="sm"
            className="bg-amber-600/80 hover:bg-amber-500/90 cursor-pointer"
          >
            <SquarePen />
            Edit
          </Button>
        </div>
      );
    },
  },
];

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-3">
        <Input
          placeholder="filter Email"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Kolom <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headGroup) => (
              <TableRow key={headGroup.id}>
                {headGroup.headers.map((header) => {
                  return (
                    <TableHead>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} dari
          {table.getFilteredRowModel().rows.length}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage}
            disabled={!table.getCanPreviousPage}
          >
            {"<"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage}
            disabled={!table.getCanNextPage}
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
}
