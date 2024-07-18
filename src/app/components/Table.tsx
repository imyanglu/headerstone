'use client';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
} from '@tanstack/react-table';

type Table<K> = {
  data: K[];
  columns: ColumnDef<K>[];
};

const Table = <T extends object>({ data, columns }: Table<T>) => {
  const table = useReactTable({
    data,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
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
