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
