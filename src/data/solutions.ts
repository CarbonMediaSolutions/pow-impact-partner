export interface Solution {
  id: string;
  title: string;
  perspective: string;
  description: string;
  services: string[];
  price: string;
  priceNote?: string;
}

export const solutions: Solution[] = [
  {
    id: 'governance',
    title: 'Governance & Operating Model',
    perspective: 'Clarity creates capacity',
    description: 'Board effectiveness, governance design, and decision architecture for organisations navigating complexity.',
    services: [
      'Board Effectiveness Review',
      'Governance Framework Design',
      'Decision Architecture',
      'Operating Model Assessment',
      'Policy Development',
    ],
    price: 'Engagement-based pricing',
    priceNote: 'Scope dependent',
  },
  {
    id: 'capital',
    title: 'Capital Allocation & Performance',
    perspective: 'Capital with purpose',
    description: 'Financial strategy, performance frameworks, and capital discipline aligned with institutional objectives.',
    services: [
      'Capital Allocation Strategy',
      'Performance Framework Design',
      'Financial Planning & Analysis',
      'Investment Evaluation',
      'Stakeholder Reporting',
    ],
    price: 'Engagement-based pricing',
    priceNote: 'Scope dependent',
  },
  {
    id: 'growth',
    title: 'Growth & Transformation',
    perspective: 'Scale with coherence',
    description: 'Strategic expansion, institutional transition, and change management for organisations at inflection points.',
    services: [
      'Growth Strategy Development',
      'Organisational Transition',
      'Change Management',
      'Strategic Planning',
      'Market Entry Strategy',
    ],
    price: 'Engagement-based pricing',
    priceNote: 'Scope dependent',
  },
  {
    id: 'decision-support',
    title: 'Decision Systems & Executive Support',
    perspective: 'Leadership leverage',
    description: 'Executive advisory, decision support, and strategic facilitation for senior leadership teams.',
    services: [
      'Outsourced CFO',
      'Executive Decision Support',
      'Strategic Facilitation',
      'Leadership Advisory',
      'Board Presentation Support',
    ],
    price: 'Engagement-based pricing',
    priceNote: 'Retainer or project-based',
  },
  {
    id: 'data-insight',
    title: 'Data & Insight Products',
    perspective: 'Intelligence as infrastructure',
    description: 'Benchmarks, sector data, and commissioned analysis for evidence-based decision-making.',
    services: [
      'Sector Benchmarking',
      'Data Analysis & Reporting',
      'Commissioned Research',
      'Performance Metrics Design',
      'Insight Delivery',
    ],
    price: 'Engagement-based pricing',
    priceNote: 'Based on scope',
  },
];
