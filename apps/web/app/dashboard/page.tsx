'use client';

import useSWR from 'swr';
import type { UserStats } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DashboardPage() {
  // In a real app, address comes from connected wallet
  const address = typeof window !== 'undefined' ? localStorage.getItem('walletAddress') : null;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';
  const { data: stats } = useSWR<UserStats>(
    address ? `${apiBase}/users/${address}/stats` : null,
    fetcher,
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      {!address && (
        <p className="text-gray-400">Connect your Stellar wallet to view your stats.</p>
      )}
      {stats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="XP" value={stats.xp} />
          <StatCard label="Quests Completed" value={stats.questsCompleted} />
          <StatCard label="Badges" value={stats.badges.length} />
          <StatCard label="Total Earned" value={`${stats.totalEarned} XLM`} />
        </div>
      )}
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-900 rounded-xl p-5 flex flex-col gap-1">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
