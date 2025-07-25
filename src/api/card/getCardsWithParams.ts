import type { GetCardsParams, ListCardsResponse } from './types.ts';
import { axiosInstance } from '@/api/shared/axiosInstance.ts';

export async function getCardsWithParams(params: GetCardsParams = {}): Promise<ListCardsResponse> {
  const query = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null),
  ) as GetCardsParams;

  const response = await axiosInstance.get<ListCardsResponse>('/cards', {
    params: query,
  });

  return response.data;
}
