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
    title: 'Essential Tax Planning Strategies for Mission-Driven Businesses in 2024',
    excerpt: 'Discover how to optimize your tax position while staying true to your social and environmental mission.',
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
    title: 'The Complete Guide to Measuring Social Impact',
    excerpt: 'Learn how to quantify and communicate your organization\'s impact to stakeholders and funders.',
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
    title: 'Scaling Your Social Enterprise: Financial Considerations',
    excerpt: 'Key financial strategies to consider when growing your impact-driven organization.',
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
    title: 'Why Cloud-Based Accounting is Essential for Modern Businesses',
    excerpt: 'Explore the benefits of moving your financial systems to the cloud for real-time visibility.',
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
    title: 'Understanding ESG Reporting Requirements for SMEs',
    excerpt: 'A practical guide to environmental, social, and governance reporting for small and medium enterprises.',
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
    title: 'Building Strong Financial Foundations for Your Startup',
    excerpt: 'Essential financial practices every startup should implement from day one.',
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
    title: 'Maximizing Tax Benefits Through Strategic Charitable Giving',
    excerpt: 'How businesses can optimize their charitable contributions for both impact and tax efficiency.',
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
    title: 'Cash Flow Management for Not-for-Profits',
    excerpt: 'Practical strategies to maintain healthy cash flow in mission-driven organizations.',
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
