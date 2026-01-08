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
    id: 'foundation',
    title: 'Foundation Package',
    perspective: 'Regulatory clarity as a foundation for growth',
    description: 'Essential compliance and setup services that establish the structural foundation for sustainable operations.',
    services: [
      'Company Formation and Registration',
      'Registered Office',
      'Secretarial Services',
      'Payroll Services',
      'VAT Returns',
      'Annual Accounts & Corporation Tax Return',
      "Directors' Returns & Self-assessment",
    ],
    price: 'From £500/month',
    priceNote: 'Based on complexity and volume',
  },
  {
    id: 'continuous-finance',
    title: 'Continuous Finance',
    perspective: 'Financial operations that scale with ambition',
    description: 'Transactional services that ensure your financial operations run smoothly and efficiently as you grow.',
    services: [
      'Systems and Processes Setup',
      'Bookkeeping and Accounting Support',
      'Outsourced AP (P2P) and AR (O2C) Functions',
      'Continuous Improvement',
    ],
    price: 'From £1,500/month',
    priceNote: 'Based on transaction volume',
  },
  {
    id: 'core-finance',
    title: 'Core Finance',
    perspective: 'Control and assurance as strategic assets',
    description: 'Controllership and assurance services that provide the oversight and governance required for institutional confidence.',
    services: [
      'Governance Controls Review and Advisory',
      'Reconciliation Support',
      'Outsourced Specialist Technical Support',
      'Tax Planning',
      'Statutory Compliance',
      'Internal / External Financial and Non-financial Reporting (R2R) and Assurance',
    ],
    price: 'From £2,500/month',
    priceNote: 'Based on scope and complexity',
  },
  {
    id: 'business-finance',
    title: 'Business Finance',
    perspective: 'Data-driven decisions for sustainable growth',
    description: 'Insight and decision support services that translate financial data into strategic intelligence.',
    services: [
      'Stakeholder Engagement & Facilitation',
      'Internal Insights Reporting',
      'Commercial & Business Transaction Support',
    ],
    price: 'From £3,500/month',
    priceNote: 'Based on engagement scope',
  },
  {
    id: 'strategic-advisory',
    title: 'Strategic Advisory',
    perspective: 'Strategic partnership for transformation',
    description: 'Specialist consultancy services for organisations navigating significant change or growth.',
    services: [
      'Outsourced CFO',
      'Start-up Advisory & Growth Strategy',
      'Valuations',
      'Sustainability Consulting',
      'Ad hoc Consulting',
    ],
    price: 'Custom pricing',
    priceNote: 'Engagement-based',
  },
];
