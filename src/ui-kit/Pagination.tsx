import {
  Pagination as ShadcnPagination,
  PaginationContent as ShadcnPaginationContent,
  PaginationItem as ShadcnPaginationItem,
  PaginationLink as ShadcnPaginationLink,
  PaginationPrevious as ShadcnPaginationPrevious,
  PaginationNext as ShadcnPaginationNext,
} from '@/shadcn/components/Pagination.tsx';
import type { ComponentProps } from 'react';

export interface PaginationProps extends ComponentProps<typeof ShadcnPagination> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  siblings?: number;
  boundaries?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
  className,
  ...rest
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (p) => p >= 1 && p <= totalPages,
  );

  return (
    <ShadcnPagination className={className} {...rest}>
      <ShadcnPaginationContent>
        <ShadcnPaginationItem>
          <ShadcnPaginationPrevious onClick={onPrev} aria-disabled={currentPage <= 1} />
        </ShadcnPaginationItem>

        {pages.map((p) => (
          <ShadcnPaginationItem key={p}>
            <ShadcnPaginationLink onClick={() => onPageChange(p)} isActive={p === currentPage}>
              {p}
            </ShadcnPaginationLink>
          </ShadcnPaginationItem>
        ))}

        <ShadcnPaginationItem>
          <ShadcnPaginationNext onClick={onNext} aria-disabled={currentPage >= totalPages} />
        </ShadcnPaginationItem>
      </ShadcnPaginationContent>
    </ShadcnPagination>
  );
}
