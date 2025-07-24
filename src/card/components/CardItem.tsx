import { useState } from 'react';
import type { Card } from '@/api/card/types.ts';

export function CardItem({ card }: { card: Card }) {
  const [imageError, setImageError] = useState(false);

  const examples = card.examples ?? [];
  const hasImage = Boolean(card.image_url?.trim()) && !imageError;

  return (
    <div className="border border-[#9810fa] rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 max-w-sm text-left">
      <h2 className="text-xl font-bold mb-2 text-[#9810fa]">{card.word}</h2>

      <p className="text-gray-800 text-sm mb-1">
        <span className="font-medium">Translation:</span> {card.russian_translation}
      </p>
      <p className="text-gray-800 text-sm mb-1">
        <span className="font-medium">Description:</span> {card.description}
      </p>
      <p className="text-gray-800 text-sm mb-2">
        <span className="font-medium">Part of speech:</span> {card.part_of_speech}
      </p>

      {examples.length > 0 && (
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
          {examples.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      )}

      {hasImage && (
        <img
          src={card.image_url}
          alt={card.word}
          onError={() => setImageError(true)}
          className="block mt-2 w-full h-32 object-contain rounded bg-gray-100"
        />
      )}
    </div>
  );
}
