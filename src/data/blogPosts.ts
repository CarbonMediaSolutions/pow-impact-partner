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

export const blogPosts: BlogPost[] = [];

export const categories = [...new Set(blogPosts.map(post => post.category))];
export const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
