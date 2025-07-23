type BaseCard = {
  word: string;
  russian_translation: string;
  description: string;
  examples?: string[];
  part_of_speech: string;
  image_url?: string;
};

export type CreateCardRequest = BaseCard;

export interface Card extends BaseCard {
  id: string;
  user_id: string;
  current_level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
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
