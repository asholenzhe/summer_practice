import { useCardTable } from '@/card/hooks/useCardTable.ts';
import { cardTableColumns } from '@/card/constants/cardTableColumns.tsx';
import { Label } from '@/ui-kit/Label.tsx';
import { Spinner } from '@/ui-kit/Spinner.tsx';
import { Table } from '@/ui-kit/Table.tsx';
import { Pagination } from '@/ui-kit/Pagination.tsx';
import downArrow from '@/assets/arrow-down-logo.svg';
import upArrow from '@/assets/arrow-up-logo.svg';

export function CardTable() {
  const { cards, isLoading, error, page, totalPages, sortBy, sortOrder, onSort, goPrev, goNext } =
    useCardTable();

  const columns = cardTableColumns.map((col) => ({
    ...col,
    label: col.sortKey ? (
      <Label
        onClick={() => onSort(col.sortKey!)}
        aria-sort={
          sortBy !== col.sortKey ? 'none' : sortOrder === 'asc' ? 'ascending' : 'descending'
        }
        className="flex items-center justify-center cursor-pointer select-none"
      >
        {col.label}
        <div className="ml-2 flex space-x-1">
          <img
            src={downArrow}
            alt="Sort descending"
            className={`w-5 h-5 ${sortBy === col.sortKey && sortOrder === 'desc' ? 'opacity-100' : 'opacity-30'}`}
          />
          <img
            src={upArrow}
            alt="Sort ascending"
            className={`w-5 h-5 ${sortBy === col.sortKey && sortOrder === 'asc' ? 'opacity-100' : 'opacity-30'}`}
          />
        </div>
      </Label>
    ) : (
      col.label
    ),
  }));

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!cards.length) return <p>No cards for review.</p>;

  return (
    <div className="space-y-4 mt-6">
      <div className="border rounded-lg">
        <Table columns={columns} data={cards} />
      </div>
      <Pagination page={page} totalPages={totalPages} onPrev={goPrev} onNext={goNext} />
    </div>
  );
}
