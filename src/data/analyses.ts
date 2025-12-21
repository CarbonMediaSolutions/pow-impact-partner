export interface Analysis {
  id: string;
  title: string;
  summary: string;
  category: 'Capital Allocation' | 'Governance' | 'Performance' | 'Operations' | 'Impact';
  date?: string;
  featured?: boolean;
}

export const analyses: Analysis[] = [
  {
    id: 'capital-allocation-frameworks',
    title: 'Capital Allocation Frameworks for Mission-Driven Organisations',
    summary: 'An examination of how leading institutions balance financial sustainability with programmatic investment, including trade-off matrices and decision protocols.',
    category: 'Capital Allocation',
    featured: true,
    date: '2024',
  },
  {
    id: 'board-effectiveness-study',
    title: 'Board Effectiveness in Complex Environments',
    summary: 'A structured review of governance practices across 40 organisations, identifying patterns that correlate with strategic clarity and execution.',
    category: 'Governance',
    date: '2024',
  },
  {
    id: 'performance-metrics-social-sector',
    title: 'Performance Metrics in the Social Sector',
    summary: 'Evaluating the validity and utility of common performance indicators, with recommendations for more meaningful measurement approaches.',
    category: 'Performance',
    date: '2024',
  },
  {
    id: 'operational-resilience',
    title: 'Operational Resilience Under Constraint',
    summary: 'How organisations maintain effectiveness during periods of resource scarcity, drawing on case evidence from the past decade.',
    category: 'Operations',
    date: '2023',
  },
  {
    id: 'impact-attribution-methods',
    title: 'Impact Attribution Methods',
    summary: 'A comparative analysis of approaches to attributing outcomes to interventions, with attention to methodological rigour and practical applicability.',
    category: 'Impact',
    date: '2023',
  },
  {
    id: 'governance-transition-patterns',
    title: 'Governance Transition Patterns',
    summary: 'Examining how organisations navigate leadership succession and board renewal while preserving institutional continuity.',
    category: 'Governance',
    date: '2023',
  },
];

export const analysisCategories = [
  'All',
  'Capital Allocation',
  'Governance',
  'Performance',
  'Operations',
  'Impact',
] as const;
