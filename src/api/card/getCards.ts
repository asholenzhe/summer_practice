import type { ListCardsResponse } from './types.ts';
import { axiosInstance } from '../shared/axiosInstance.ts';

export async function getCards(): Promise<ListCardsResponse> {
  const response = await axiosInstance.get('/cards');
  return response.data;
}
