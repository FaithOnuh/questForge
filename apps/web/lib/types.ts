export interface Quest {
  id: string;
  title: string;
  description: string;
  rewardAsset: string;
  rewardAmount: number;
  status: 'OPEN' | 'IN_REVIEW' | 'COMPLETED' | 'CANCELLED';
  deadline?: string;
  createdAt: string;
}

export interface UserStats {
  address: string;
  xp: number;
  questsCompleted: number;
  badges: string[];
  totalEarned: number;
}
