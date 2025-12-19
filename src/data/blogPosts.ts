export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'tax-planning-strategies-2024',
    title: 'Tax Strategy in Mission-Driven Organisations',
    excerpt: 'Considerations for optimising tax position while maintaining organisational mission.',
    content: 'Full article content here...',
    author: 'Patric',
    date: '2024-12-01',
    readTime: '8 min read',
    category: 'Tax Planning',
    tags: ['Tax', 'Strategy', 'Social Enterprise'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    featured: true,
  },
  {
    id: 'impact-measurement-guide',
    title: 'Measuring Social Impact at Scale',
    excerpt: 'Frameworks for quantifying and communicating organisational impact.',
    content: 'Full article content here...',
    author: 'Patric',
    date: '2024-11-15',
    readTime: '12 min read',
    category: 'Impact',
    tags: ['Impact', 'Measurement', 'Reporting', 'Social Enterprise'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    featured: true,
  },
  {
    id: 'scaling-social-enterprise',
    title: 'Growth Decisions in Social Enterprises',
    excerpt: 'Financial considerations when scaling impact-driven organisations.',
    content: 'Full article content here...',
    author: 'Patric',
    date: '2024-11-01',
    readTime: '10 min read',
    category: 'Growth',
    tags: ['Growth', 'Scaling', 'Finance', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  },
  {
    id: 'cloud-accounting-benefits',
    title: 'Cloud-Based Financial Systems in Modern Organisations',
    excerpt: 'Infrastructure considerations for real-time financial visibility.',
    content: 'Full article content here...',
    author: 'Patric',
    date: '2024-10-20',
    readTime: '6 min read',
    category: 'Compliance',
    tags: ['Compliance', 'Technology', 'Cloud', 'Efficiency'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  },
  {
    id: 'esg-reporting-requirements',
    title: 'ESG Reporting Considerations for Emerging Organisations',
    excerpt: 'Environmental, social, and governance reporting frameworks.',
    content: 'Full article content here...',
    author: 'Patric',
    date: '2024-10-05',
    readTime: '9 min read',
    category: 'Impact',
    tags: ['ESG', 'Reporting', 'Compliance', 'Sustainability'],
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800',
  },
  {
    id: 'startup-financial-foundations',
    title: 'Financial Foundations in Early-Stage Organisations',
    excerpt: 'Core financial practices for emerging organisations.',
    content: 'Full article content here...',
    author: 'Patric',
    date: '2024-09-25',
    readTime: '7 min read',
    category: 'Growth',
    tags: ['Startup', 'Finance', 'Foundations', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
  },
  {
    id: 'charitable-giving-tax-benefits',
    title: 'Tax Considerations in Strategic Charitable Giving',
    excerpt: 'Approaches to charitable contributions for impact and efficiency.',
    content: 'Full article content here...',
    author: 'Patric',
    date: '2024-09-10',
    readTime: '8 min read',
    category: 'Tax Planning',
    tags: ['Tax', 'Charity', 'Giving', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800',
  },
  {
    id: 'cash-flow-management',
    title: 'Cash Flow in Mission-Driven Organisations',
    excerpt: 'Approaches to maintaining liquidity in mission-driven contexts.',
    content: 'Full article content here...',
    author: 'Patric',
    date: '2024-08-28',
    readTime: '6 min read',
    category: 'Compliance',
    tags: ['Cash Flow', 'Not-for-Profit', 'Management', 'Finance'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
  },
];

export const categories = [...new Set(blogPosts.map(post => post.category))];
export const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
