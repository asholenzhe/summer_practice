import {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
  TableBody as ShadcnTableBody,
  TableHead as ShadcnTableHead,
  TableCell as ShadcnTableCell,
} from '@/shadcn/components/Table';
import type { ReactNode } from 'react';

export type Column<Row> = {
  key: keyof Row;
  label: ReactNode;
  widthClass?: string;
  render?(row: Row): ReactNode;
};

export interface TableProps<Row> {
  columns: Column<Row>[];
  data: Row[];
}

export function Table<Row extends { id: string | number }>({ columns, data }: TableProps<Row>) {
  return (
    <ShadcnTable className="table-fixed w-full">
      <ShadcnTableHeader>
        <ShadcnTableRow className="bg-gray-100 divide-x divide-gray-200">
          {columns.map(({ key, label, widthClass }) => (
            <ShadcnTableHead
              key={String(key)}
              className={widthClass ?? 'font-medium py-4 text-center'}
            >
              {label}
            </ShadcnTableHead>
          ))}
        </ShadcnTableRow>
      </ShadcnTableHeader>
      <ShadcnTableBody>
        {data.map((row) => (
          <ShadcnTableRow key={row.id} className="h-14 odd:bg-white even:bg-gray-50">
            {columns.map(({ key, widthClass, render }) => {
              const content = render
                ? render(row)
                : (() => {
                    const v = row[key];
                    if (v == null) return '-';
                    if (Array.isArray(v)) return v.join(', ');
                    return v.toString();
                  })();

              return (
                <ShadcnTableCell
                  key={String(key)}
                  className={widthClass ?? 'truncate text-center text-sm'}
                  title={typeof content === 'string' && content.length > 20 ? content : undefined}
                >
                  {content}
                </ShadcnTableCell>
              );
            })}
          </ShadcnTableRow>
        ))}
      </ShadcnTableBody>
    </ShadcnTable>
  );
}
