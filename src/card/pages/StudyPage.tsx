import { useState, useEffect } from 'react';
import { useStudyCard } from '@/card/hooks/useStudyCard.ts';
import { Spinner } from '@/ui-kit/Spinner.tsx';
import { Button } from '@/ui-kit/Button.tsx';
import { Input } from '@/ui-kit/Input.tsx';

export default function StudyPage() {
  const { card, isLoading, error, updateLevel, hideWord, handleCheck } = useStudyCard();
  const [showTranslation, setShowTranslation] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [correctWord, setCorrectWord] = useState('');

  useEffect(() => {
    setUserInput('');
    setStatus('idle');
    setShowTranslation(false);
    setCorrectWord('');
  }, [card]);

  const handleCheckClick = () => {
    handleCheck(userInput, setStatus, setCorrectWord);
  };

  const handleTryAgain = () => {
    setStatus('idle');
  };

  const handleToggleTranslation = () => {
    setShowTranslation((prev) => !prev);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  if (error) return <p className="text-center text-gray-700">Some problems during cart loading!</p>;

  if (!card)
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <p className="text-center text-gray-700">You have learned all words for today!</p>
      </div>
    );

  return (
    <div className="w-[24rem] mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Definition</h2>
      <p className="text-gray-600">{card.description}</p>

      {card.examples && card.examples.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Examples</h2>
          {card.examples.map((ex: string, i: number) => (
            <p key={i} className="text-gray-700 mb-2">
              {hideWord(ex)}
            </p>
          ))}
        </>
      )}

      <div className="mt-6 mb-6">
        {showTranslation && (
          <div className="bg-gray-100 p-3 rounded-lg mb-3 text-gray-700">
            {card.russian_translation}
          </div>
        )}
        <Button onClick={handleToggleTranslation}>
          {showTranslation ? 'Hide translation' : 'Show translation'}
        </Button>
      </div>

      {status === 'idle' && (
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter the word"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button onClick={handleCheckClick} disabled={userInput.trim() === ''}>
            Check Answer
          </Button>
        </div>
      )}

      {status === 'correct' && (
        <div className="mt-6 space-y-4">
          <p className="text-green-600 font-semibold text-center"> Correct!</p>
          <Button
            onClick={() => updateLevel(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition"
          >
            Next (Increase Level)
          </Button>
        </div>
      )}

      {status === 'incorrect' && (
        <div className="mt-6 space-y-4">
          <p className="text-red-600 font-semibold text-center">
            Incorrect. Correct answer: <span className="font-medium">{correctWord}</span>
          </p>
          <Button
            onClick={handleTryAgain}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-3 rounded-lg transition"
          >
            Try Again
          </Button>
          <Button
            onClick={() => updateLevel(false)}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition"
          >
            Next (Decrease Level)
          </Button>
        </div>
      )}
    </div>
  );
}
