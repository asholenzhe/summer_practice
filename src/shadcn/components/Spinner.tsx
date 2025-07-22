export function Spinner({ sizeClass = 'w-16 h-16' }: { sizeClass?: string }) {
  return (
    <div
      className={`
        animate-spin
        rounded-full
        border-4 border-gray-200
        border-t-black-500
        ${sizeClass}
      `}
    />
  );
}
