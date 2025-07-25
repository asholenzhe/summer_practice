import { useCardTable } from '@/card/hooks/useCardTable.ts';
import { cardTableColumns } from '@/card/constants/cardTableColumns.tsx';
import { Label } from '@/ui-kit/Label.tsx';
import { Table } from '@/ui-kit/Table.tsx';
import { Pagination } from '@/ui-kit/Pagination.tsx';
import downArrow from '@/assets/arrow-down-logo.svg';
import upArrow from '@/assets/arrow-up-logo.svg';
import { useMemo } from 'react';
import { Spinner } from '@/ui-kit/Spinner.tsx';

export function CardsTable() {
  const {
    cards,
    error,
    isLoading,
    page,
    totalPages,
    sortBy,
    sortOrder,
    onSort,
    goPrev,
    goNext,
    goToPage,
  } = useCardTable();

  const columns = useMemo(() => {
    return cardTableColumns.map((col) => {
      if (!col.sortKey) return col;

      const isActive = sortBy === col.sortKey;
      const isAsc = sortOrder === 'asc';

      return {
        ...col,
        label: (
          <Label
            onClick={() => onSort(col.sortKey!)}
            aria-sort={isActive ? (isAsc ? 'ascending' : 'descending') : 'none'}
            className="flex items-center justify-center cursor-pointer select-none"
          >
            {col.label}
            <div className="ml-2 flex space-x-1">
              <img
                src={downArrow}
                alt="Sort descending"
                className={`w-5 h-5 ${isActive && !isAsc ? 'opacity-100' : 'opacity-30'}`}
              />
              <img
                src={upArrow}
                alt="Sort ascending"
                className={`w-5 h-5 ${isActive && isAsc ? 'opacity-100' : 'opacity-30'}`}
              />
            </div>
          </Label>
        ),
      };
    });
  }, [sortBy, sortOrder, onSort]);

  if (error) return <p className="text-red-600">Error during cards loading.</p>;
  if (!isLoading && !cards.length) return <p>No cards for learning.</p>;

  return (
    <div className="space-y-4 mt-6">
      <div className="border rounded-lg">
        <Table columns={columns} data={cards} />
        {isLoading && cards.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <Spinner />
          </div>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPrev={goPrev}
        onNext={goNext}
        onPageChange={goToPage}
        siblings={1}
        boundaries={1}
        className="mt-4"
      />
    </div>
  );
}
