import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import insightTile1 from '@/assets/insight-tile-1.jpg';
import insightTile2 from '@/assets/insight-tile-2.jpg';
import capabilityStrategy from '@/assets/capability-strategy.jpg';
import capabilityOrganisation from '@/assets/capability-organisation.jpg';

const tileImages = [insightTile1, insightTile2, capabilityStrategy, capabilityOrganisation];

export const LatestThinking = () => {
  // Get the most recent non-featured posts
  const latestPosts = blogPosts
    .filter(post => !post.featured)
    .slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="font-body text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Latest Thinking
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-3">
              Insights for Leaders
            </h2>
          </div>
          <Link 
            to="/blog" 
            className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            Explore all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Four Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/blog/${post.id}`}
                className="group block h-full"
              >
                <article className="h-full rounded-lg overflow-hidden bg-background border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  {/* Image Header */}
                  <div className="h-36 relative overflow-hidden">
                    <img 
                      src={tileImages[index % tileImages.length]} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-background/90 rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-serif text-base font-medium text-foreground group-hover:text-primary transition-colors leading-snug mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 md:hidden">
          <Link 
            to="/blog" 
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
