import type { ReactNode } from 'react';
import type { Card } from '@/api/card/types.ts';
import type { CardsState } from '@/card/store/CardStore.ts';

export type ColumnConfig = {
  key: keyof Card;
  label: string | ReactNode;
  render?(row: Card): ReactNode;
  sortKey?: CardsState['sortBy'];
  widthClass?: string;
};

export const cardTableColumns: ColumnConfig[] = [
  {
    key: 'word',
    label: 'Word',
    sortKey: 'word',
  },
  {
    key: 'russian_translation',
    label: 'Translation',
  },
  {
    key: 'current_level',
    label: 'Level',
    sortKey: 'current_level',
  },
  {
    key: 'created_at',
    label: 'Created At',
    sortKey: 'created_at',
    render: (row) => new Date(row.created_at).toLocaleDateString(),
  },

  {
    key: 'next_review_date',
    label: 'Next Review',
    sortKey: 'next_review_date',
    render: (row) => new Date(row.next_review_date).toLocaleDateString(),
  },
  {
    key: 'examples',
    label: 'Examples',
    widthClass: 'w-36 truncate px-2 text-center px-4',
    render: (row) => (row.examples?.length ? row.examples.join(', ') : '-'),
  },
  {
    key: 'image_url',
    label: 'Image',
    render: (row) =>
      row.image_url ? (
        <img src={row.image_url} alt={row.word} className="h-8 w-8 object-cover rounded mx-auto" />
      ) : (
        '-'
      ),
  },
];
