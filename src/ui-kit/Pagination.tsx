import { Button } from './Button.tsx';
import type { FC } from 'react';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev(): void;
  onNext(): void;
}

export const Pagination: FC<PaginationProps> = ({ page, totalPages, onPrev, onNext }) => (
  <div className="flex justify-between items-center mt-4">
    <Button disabled={page <= 1} onClick={onPrev} className="text-sm px-4 py-2">
      Previous
    </Button>
    <span className="text-sm">
      Page {page} of {totalPages}
    </span>
    <Button disabled={page >= totalPages} onClick={onNext} className="text-sm px-4 py-2">
      Next
    </Button>
  </div>
);
