export interface CaseStudy {
  id: string;
  company: string;
  type: string;
  challenge: string;
  perspective: string;
  solution: string;
  results: string[];
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
  role: string;
  fullStory: string;
  image: string;
  color: 'primary' | 'secondary' | 'emerald';
  validationLinks?: { label: string; url: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'offploy-group',
    company: 'Offploy Group',
    type: 'Social Enterprise',
    challenge: 'Navigate cost-of-living crisis while maintaining mission',
    perspective: 'Financial resilience as a mission enabler—seeing tax strategy not as compliance, but as a tool to protect purpose during economic turbulence.',
    solution: 'Strategic tax planning and financial restructuring to maximize reinvestment capacity while protecting the team.',
    results: [
      'Restructured finances to absorb cost increases without layoffs',
      'Implemented tax-efficient compensation strategies',
      'Created sustainable growth framework for the next 5 years',
      'Enabled continued investment in social impact programs'
    ],
    metrics: [
      { value: '£500k+', label: 'Reinvested in Impact' },
      { value: '100%', label: 'Team Retained' },
      { value: '32%', label: 'Tax Savings' },
      { value: '3x', label: 'Impact Growth' },
    ],
    quote: 'Patric has transformed the way we scale our impact. His strategic approach to tax planning means we can reinvest more into what matters most—our mission.',
    author: 'Jacob Hill',
    role: 'Managing Director',
    fullStory: `When the cost-of-living crisis hit, Offploy Group faced a critical decision: cut staff or cut programs. Neither option aligned with their mission of supporting ex-offenders into employment.

Patric worked closely with the leadership team to find a third way. Through strategic tax planning and financial restructuring, we identified over £500,000 that could be reinvested into the business without compromising stability.

The approach included optimizing the company's tax position, implementing salary sacrifice schemes that benefited employees, and creating a sustainable financial framework that could weather economic uncertainty.

The result? Not a single team member was let go. Every impact program continued. And Offploy Group emerged stronger, with a clearer financial picture and more resources to fulfill their mission.`,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    color: 'primary',
  },
  {
    id: 'city-guilds-group',
    company: 'City & Guilds Group',
    type: 'Education Organisation',
    challenge: 'Scaling from startup to established organization',
    perspective: 'Financial infrastructure as competitive advantage—recognising that investor confidence is built on operational clarity, not just commercial promise.',
    solution: 'Comprehensive financial systems implementation and growth strategy development.',
    results: [
      'Implemented cloud-based financial systems',
      'Established robust compliance frameworks',
      'Created scalable financial processes',
      'Developed investor-ready reporting structures'
    ],
    metrics: [
      { value: '10x', label: 'Growth Achieved' },
      { value: '14 days', label: 'Reporting Turnaround' },
      { value: '99%', label: 'Compliance Score' },
      { value: '£2M+', label: 'Investment Secured' },
    ],
    quote: 'He is a very passionate and driven individual who genuinely cares about helping businesses succeed. His expertise goes far beyond numbers.',
    author: 'Kirstie Donnelly',
    role: 'CEO',
    fullStory: `City & Guilds Group had ambitious growth plans but lacked the financial infrastructure to support them. Their existing systems were manual, time-consuming, and couldn't provide the real-time visibility needed for strategic decision-making.

We began with a comprehensive audit of their financial processes, identifying bottlenecks and opportunities for automation. The implementation of cloud-based accounting systems reduced their monthly reporting time from 6 weeks to just 14 days.

But the real transformation came in how leadership could now use financial data. With real-time dashboards and predictive modeling, they could make faster, more informed decisions about investments, hiring, and expansion.

The robust financial framework also made them investor-ready. When they went to market for their next funding round, they secured over £2M—in large part because investors could see a well-organized, transparent financial operation.`,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    color: 'secondary',
  },
  {
    id: 'walcot-foundation',
    company: 'The Walcot Foundation',
    type: 'Not-for-Profit',
    challenge: 'Measuring and amplifying social impact',
    perspective: 'Impact visibility as a funding mechanism—understanding that funders invest in clarity, and that measurement is not bureaucracy but storytelling.',
    solution: 'Impact measurement framework design and stakeholder reporting systems.',
    results: [
      'Designed comprehensive impact metrics',
      'Created stakeholder-friendly reporting',
      'Aligned board around measurable goals',
      'Attracted new funding based on proven impact'
    ],
    metrics: [
      { value: '+200%', label: 'Impact Footprint' },
      { value: '100%', label: 'Board Alignment' },
      { value: '£1.5M', label: 'New Funding' },
      { value: '50+', label: 'Impact Metrics Tracked' },
    ],
    quote: 'Focused on making a positive difference in the world. Patric helps organizations increase their social and environmental footprint while maintaining financial health.',
    author: 'Marcia Asare',
    role: 'Executive Director',
    fullStory: `The Walcot Foundation knew they were making a difference, but they couldn't prove it. Without clear impact metrics, they struggled to communicate their value to funders, the board, and the communities they served.

Our engagement began with understanding what impact meant for them—not just outputs (grants given, programs run) but outcomes (lives changed, communities strengthened). We developed a comprehensive measurement framework that captured both quantitative and qualitative data.

The reporting system we implemented made impact visible at every level. Board members could see real-time dashboards. Program managers could track progress against goals. And funders received compelling reports that demonstrated clear return on their investment.

The results spoke for themselves. Within 18 months, The Walcot Foundation had attracted £1.5M in new funding, with funders specifically citing the clarity of their impact reporting as a deciding factor.`,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    color: 'emerald',
  },
];
