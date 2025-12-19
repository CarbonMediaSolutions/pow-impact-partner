import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';

export const Hero = () => {
  // Get latest 3 posts for editorial tiles
  const editorialTiles = blogPosts.slice(0, 3);

  return (
    <section id="home" className="relative min-h-[70vh] flex flex-col justify-center pt-32 pb-16">
      <div className="container max-w-5xl">
        <div className="text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground leading-[1.1] tracking-tight"
          >
            Shaping the Decisions
            <br />
            That Matter
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8"
          >
            <Link 
              to="/blog"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-muted-foreground/30 hover:border-foreground pb-1"
            >
              Explore our perspectives
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Editorial Tiles Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container mt-20"
      >
        <div className="grid md:grid-cols-3 gap-px bg-border/30">
          {editorialTiles.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group block p-6 lg:p-8 bg-background hover:bg-muted/20 transition-colors duration-300"
            >
              <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                {post.category}
              </span>
              <h3 className="font-serif text-base lg:text-lg font-medium text-foreground mt-3 leading-snug group-hover:text-foreground/80 transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
