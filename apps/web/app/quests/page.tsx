'use client';

import useSWR from 'swr';
import { QuestCard } from '@/components/QuestCard';
import type { Quest } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function QuestsPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';
  const { data: quests, error, isLoading } = useSWR<Quest[]>(`${apiBase}/quests`, fetcher);

  if (isLoading) return <p className="p-8 text-gray-400">Loading quests…</p>;
  if (error) return <p className="p-8 text-red-400">Failed to load quests.</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Open Quests</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {quests?.map((q) => <QuestCard key={q.id} quest={q} />)}
      </div>
    </main>
  );
}
