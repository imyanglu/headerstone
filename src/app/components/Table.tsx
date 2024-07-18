'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useState } from 'react';

type Table<K> = {
  data: K[];
  columns: ColumnDef<K>[];
};

const Table = <T extends object>({ data, columns }: Table<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
  });
  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} className="w-[fit-content]">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="relative">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="w-[fit-content]">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
            <div className="h-[1px] w-full bg-[#000] absolute bottom-0 left-0"></div>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
