export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection';

type BaseCard = {
  word: string;
  russian_translation: string;
  description: string;
  examples?: string[];
  part_of_speech: PartOfSpeech;
  image_url?: string;
};

export type CreateCardRequest = BaseCard;

export interface Card extends BaseCard {
  id: string;
  user_id: string;
  current_level: number;
  next_review_date: string;
  created_at: string;
  updated_at: string;
}

export interface ListCardsResponse {
  cards: Card[];
  has_next: boolean;
  has_prev: boolean;
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface GetCardsParams {
  page?: number;
  limit?: number;
  sort_by?: 'created_at' | 'updated_at' | 'word' | 'current_level' | 'next_review_date';
  sort_order?: 'asc' | 'desc';
  filter_by_level?: number;
  filter_by_ready?: boolean;
  search_word?: string;
}
