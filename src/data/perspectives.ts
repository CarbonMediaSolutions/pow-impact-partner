export interface Perspective {
  id: string;
  title: string;
  summary: string;
  topic: 'Governance' | 'Impact' | 'Growth' | 'Strategy' | 'Risk';
  featured?: boolean;
  image?: string;
}

export const perspectives: Perspective[] = [
  {
    id: 'governance-as-strategic-lever',
    title: 'Governance as a Strategic Lever',
    summary: 'How board structures shape organisational capacity for long-term decision-making.',
    topic: 'Governance',
    featured: true,
  },
  {
    id: 'impact-beyond-measurement',
    title: 'Impact Beyond Measurement',
    summary: 'Why the most significant outcomes often resist quantification—and what that means for strategy.',
    topic: 'Impact',
  },
  {
    id: 'risk-appetite-in-mission-driven-orgs',
    title: 'Risk Appetite in Mission-Driven Organisations',
    summary: 'Balancing institutional preservation with the imperative to create meaningful change.',
    topic: 'Risk',
  },
  {
    id: 'the-long-view-on-growth',
    title: 'The Long View on Growth',
    summary: 'Sustainable expansion as a function of clarity, not ambition.',
    topic: 'Growth',
  },
  {
    id: 'strategic-patience',
    title: 'Strategic Patience',
    summary: 'The discipline of waiting for conditions to align before committing resources.',
    topic: 'Strategy',
  },
  {
    id: 'institutional-memory',
    title: 'Institutional Memory and Continuity',
    summary: 'How organisations preserve wisdom across leadership transitions.',
    topic: 'Governance',
  },
];
