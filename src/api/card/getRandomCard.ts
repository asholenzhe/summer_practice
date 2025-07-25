import type { Card } from '@/api/card/types.ts';
import { axiosInstance } from '@/api/shared/axiosInstance.ts';

export async function getRandomCard(): Promise<Card> {
  const response = await axiosInstance.get<Card>('/cards/random');
  return response.data;
}
