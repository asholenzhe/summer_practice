import type { GetCardsParams, ListCardsResponse } from './types.ts';
import { axiosInstance } from '@/api/shared/axiosInstance.ts';

export async function getCardsWithParams(params: GetCardsParams = {}): Promise<ListCardsResponse> {
  const query: Record<string, string | number | boolean> = {};

  if (params.page != null) query.page = params.page;
  if (params.limit != null) query.limit = params.limit;
  if (params.sort_by) query.sort_by = params.sort_by;
  if (params.sort_order) query.sort_order = params.sort_order;
  if (params.filter_by_level != null) query.filter_by_level = params.filter_by_level;
  if (params.filter_by_ready != null) query.filter_by_ready = params.filter_by_ready;
  if (params.search_word) query.search_word = params.search_word;

  const response = await axiosInstance.get<ListCardsResponse>('/cards', {
    params: query,
  });

  return response.data;
}
