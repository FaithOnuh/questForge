import Link from 'next/link';
import type { Quest } from '@/lib/types';

interface Props {
  quest: Quest;
}

export function QuestCard({ quest }: Props) {
  return (
    <Link
      href={`/quests/${quest.id}`}
      className="block bg-gray-900 rounded-xl p-5 hover:ring-1 hover:ring-stellar-blue transition"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-lg leading-tight">{quest.title}</h2>
        <span className="shrink-0 text-xs bg-stellar-blue/20 text-stellar-blue px-2 py-0.5 rounded-full">
          {quest.rewardAmount} {quest.rewardAsset}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-400 line-clamp-2">{quest.description}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span
          className={`px-2 py-0.5 rounded-full ${
            quest.status === 'OPEN' ? 'bg-green-900/40 text-green-400' : 'bg-gray-800 text-gray-400'
          }`}
        >
          {quest.status}
        </span>
        {quest.deadline && <span>Due {new Date(quest.deadline).toLocaleDateString()}</span>}
      </div>
    </Link>
  );
}
