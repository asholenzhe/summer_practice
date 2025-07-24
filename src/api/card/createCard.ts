import { axiosInstance } from '../shared/axiosInstance.ts';
import type { Card, CreateCardRequest } from './types.ts';

export async function createCard(payload: CreateCardRequest): Promise<Card> {
  const response = await axiosInstance.post('/cards', payload);
  return response.data;
}
