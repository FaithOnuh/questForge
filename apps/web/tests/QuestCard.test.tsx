import { render, screen } from '@testing-library/react';
import { QuestCard } from '@/components/QuestCard';
import type { Quest } from '@/lib/types';

const mockQuest: Quest = {
  id: 'q-001',
  title: 'Fix critical bug',
  description: 'Resolve the memory leak in the payout module.',
  rewardAsset: 'XLM',
  rewardAmount: 50,
  status: 'OPEN',
  createdAt: new Date().toISOString(),
};

describe('QuestCard', () => {
  it('renders quest title and reward', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText('Fix critical bug')).toBeInTheDocument();
    expect(screen.getByText('50 XLM')).toBeInTheDocument();
  });

  it('shows OPEN status badge', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText('OPEN')).toBeInTheDocument();
  });
});
