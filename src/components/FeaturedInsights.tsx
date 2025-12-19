import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import featuredHeroImage from '@/assets/featured-insight-hero.jpg';
import insightTile1 from '@/assets/insight-tile-1.jpg';
import insightTile2 from '@/assets/insight-tile-2.jpg';

const tileImages = [insightTile1, insightTile2];

export const FeaturedInsights = () => {
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);
  const displayPosts = featuredPosts.length >= 3 ? featuredPosts : blogPosts.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 border-t border-border/50">
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
              Featured
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-3">
              Perspectives That Shape Strategy
            </h2>
          </div>
          <Link 
            to="/blog" 
            className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            View all insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Featured Tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <Link 
              to={`/blog/${displayPosts[0]?.id}`}
              className="group block h-full"
            >
              <div className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-colors">
                {/* Background Image */}
                <img 
                  src={featuredHeroImage} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                
                <div className="relative h-full p-8 lg:p-12 flex flex-col justify-end">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-background/90 rounded-full w-fit mb-4">
                    {displayPosts[0]?.category}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl font-medium text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    {displayPosts[0]?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">
                    {displayPosts[0]?.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{displayPosts[0]?.author}</span>
                    <span>·</span>
                    <span>{displayPosts[0]?.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smaller Tiles */}
          {displayPosts.slice(1, 3).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
            >
              <Link 
                to={`/blog/${post.id}`}
                className="group block h-full"
              >
                <div className="h-full min-h-[240px] rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  {/* Image Header */}
                  <div className="h-28 relative overflow-hidden">
                    <img 
                      src={tileImages[index]} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
                      {post.category}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
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
            View all insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
