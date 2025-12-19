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
            That Shape Systems
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Advising leaders, institutions, and mission-driven organisations on choices with long-term economic, social, and regulatory consequences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-4"
          >
            <p className="font-body text-xs text-muted-foreground/60 tracking-[0.25em] uppercase">
              Strategy · Governance · Impact · Capital Allocation
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="pt-12 max-w-2xl mx-auto space-y-4"
          >
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              We work at the intersection of strategy, policy, and performance — supporting organisations whose decisions influence markets, institutions, and communities.
            </p>
            <p className="font-body text-sm text-muted-foreground/80 leading-relaxed">
              Our work is confidential, research-led, and grounded in real operating environments.
            </p>
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
        <div className="grid md:grid-cols-3 gap-6">
          {editorialTiles.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group block p-6 lg:p-8 bg-background hover:bg-muted/20 transition-colors duration-300 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border/20"
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
