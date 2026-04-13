import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Quest<span className="text-stellar-blue">Forge</span>
      </h1>
      <p className="text-xl text-gray-400 max-w-xl">
        Complete quests, earn Stellar rewards, and build your on-chain reputation.
      </p>
      <div className="flex gap-4">
        <Link
          href="/quests"
          className="px-6 py-3 bg-stellar-blue rounded-lg font-semibold hover:opacity-90 transition"
        >
          Browse Quests
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-3 border border-gray-600 rounded-lg font-semibold hover:border-gray-400 transition"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
