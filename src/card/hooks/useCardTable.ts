import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type CardsState, CardsStore } from '@/card/store/CardsStore.ts';
import { getCardsWithParams } from '@/api/card/getCardsWithParams.ts';
import type { Card } from '@/api/card/types.ts';

export function useCardTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    cards,
    isLoading,
    error,
    page,
    limit,
    totalPages,
    sortBy,
    sortOrder,
    setCards,
    setIsLoading,
    setError,
    setSortBy,
    setSortOrder,
    setTotalPages,
    setPage: rawSetPage,
  } = CardsStore((state) => state);

  const updateSearchParams = useCallback(
    (newPage: number, newSortBy: CardsState['sortBy'], newSortOrder: CardsState['sortOrder']) => {
      setSearchParams({
        page: newPage.toString(),
        sort_by: newSortBy,
        sort_order: newSortOrder,
      });
    },
    [setSearchParams],
  );

  const onSort = useCallback(
    (field: CardsState['sortBy']) => {
      if (field === sortBy) {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        updateSearchParams(page, field, newOrder);
      } else {
        setSortBy(field);
        setSortOrder('asc');
        rawSetPage(1);
        updateSearchParams(1, field, 'asc');
      }
    },
    [sortBy, sortOrder, page, setSortBy, setSortOrder, rawSetPage, updateSearchParams],
  );

  useEffect(() => {
    const pageParam = Number(searchParams.get('page')) || 1;
    const sortByParam = (searchParams.get('sort_by') as CardsState['sortBy']) || 'created_at';
    const sortOrderParam = (searchParams.get('sort_order') as CardsState['sortOrder']) || 'asc';

    const fetchCards = async () => {
      rawSetPage(pageParam);
      setSortBy(sortByParam);
      setSortOrder(sortOrderParam);
      setIsLoading(true);
      setError(null);

      try {
        const result = await getCardsWithParams({
          page: pageParam,
          limit,
          sort_by: sortByParam,
          sort_order: sortOrderParam,
        });
        const normalized: Card[] = result.cards.map((card) => ({
          ...card,
          examples: card.examples ?? [],
        }));
        setCards(normalized);
        setTotalPages(Math.ceil(result.total_pages));
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [
    searchParams,
    limit,
    rawSetPage,
    setSortBy,
    setSortOrder,
    setIsLoading,
    setError,
    setCards,
    setTotalPages,
  ]);

  const goNext = useCallback(() => {
    const next = Math.min(page + 1, totalPages);
    rawSetPage(next);
    updateSearchParams(next, sortBy, sortOrder);
  }, [page, totalPages, rawSetPage, sortBy, sortOrder, updateSearchParams]);

  const goPrev = useCallback(() => {
    const prev = Math.max(page - 1, 1);
    rawSetPage(prev);
    updateSearchParams(prev, sortBy, sortOrder);
  }, [page, rawSetPage, sortBy, sortOrder, updateSearchParams]);

  const goToPage = useCallback(
    (newPage: number) => {
      rawSetPage(newPage);
      updateSearchParams(newPage, sortBy, sortOrder);
    },
    [rawSetPage, sortBy, sortOrder, updateSearchParams],
  );

  return {
    cards,
    isLoading,
    error,
    page,
    totalPages,
    sortBy,
    sortOrder,
    onSort,
    goNext,
    goPrev,
    goToPage,
    limit,
  };
}
