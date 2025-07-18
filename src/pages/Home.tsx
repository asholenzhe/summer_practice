import { Header } from '@/components/header/Header.tsx';

export function Home() {
  return (
    <>
      <Header />
      <main className="mt-10 px-6">
        <h1 className="text-2xl font-bold text-gray-800">App for english learning</h1>
      </main>
    </>
  );
}
