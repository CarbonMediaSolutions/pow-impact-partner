export interface Perspective {
  id: string;
  title: string;
  summary: string;
  topic: 'Governance' | 'Impact' | 'Growth' | 'Strategy' | 'Risk';
  featured?: boolean;
  image?: string;
  content: string[];
}

export const perspectives: Perspective[] = [];

export const perspectiveTopics = ['All', 'Governance', 'Impact', 'Growth', 'Strategy', 'Risk'] as const;
