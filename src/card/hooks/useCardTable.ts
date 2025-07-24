import { useSearchParams } from 'react-router-dom';
import { useEffect, useCallback, useRef } from 'react';
import { type CardsState, CardsStore } from '@/card/store/CardStore.ts';
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
    setPage,
    setSortBy,
    setSortOrder,
    setTotalPages,
  } = CardsStore((state) => state);

  const isFirstLoad = useRef(true);

  const fetchCards = useCallback(async () => {
    if (isFirstLoad.current) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const result = await getCardsWithParams({
        page,
        limit,
        sort_by: sortBy,
        sort_order: sortOrder,
      });
      const normalized: Card[] = result.cards.map((card) => ({
        ...card,
        examples: card.examples ?? [],
      }));
      setCards(normalized);
      setTotalPages(result.total_pages);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      if (isFirstLoad.current) {
        setIsLoading(false);
        isFirstLoad.current = false;
      }
    }
  }, [page, limit, sortBy, sortOrder, setCards, setIsLoading, setError, setTotalPages]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const updateSearchParams = useCallback(
    (page: number, sortBy: CardsState['sortBy'], sortOrder: CardsState['sortOrder']) => {
      setSearchParams({
        page: page.toString(),
        sort_by: sortBy,
        sort_order: sortOrder,
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
        setPage(1);
        updateSearchParams(1, field, 'asc');
      }
    },
    [sortBy, sortOrder, page, setPage, updateSearchParams, setSortBy, setSortOrder],
  );

  useEffect(() => {
    const pageParam = Number(searchParams.get('page')) || 1;
    const sortByParam = (searchParams.get('sort_by') as CardsState['sortBy']) || 'created_at';
    const sortOrderParam = (searchParams.get('sort_order') as CardsState['sortOrder']) || 'asc';

    setPage(pageParam);
    setSortBy(sortByParam);
    setSortOrder(sortOrderParam);
  }, [searchParams, setPage, setSortBy, setSortOrder]);

  const goNext = () => {
    const newPage = Math.min(page + 1, totalPages);
    setPage(newPage);
    updateSearchParams(newPage, sortBy, sortOrder);
  };

  const goPrev = () => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
    updateSearchParams(newPage, sortBy, sortOrder);
  };

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
  };
}
