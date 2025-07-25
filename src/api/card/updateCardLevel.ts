import type { Card, UpdateLevelRequest } from '@/api/card/types.ts';
import { axiosInstance } from '@/api/shared/axiosInstance.ts';

export async function updateCardLevel(id: string, data: UpdateLevelRequest): Promise<Card> {
  const response = await axiosInstance.post<Card>(`/cards/${id}/update_level`, data);
  return response.data;
}
