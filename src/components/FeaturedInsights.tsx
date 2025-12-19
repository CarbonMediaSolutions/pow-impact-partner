import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import featuredHeroImage from '@/assets/featured-insight-hero.jpg';
import insightTile1 from '@/assets/insight-tile-1.jpg';
import insightTile2 from '@/assets/insight-tile-2.jpg';

const tileImages = [insightTile1, insightTile2];

export const FeaturedInsights = () => {
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);
  const mainPost = featuredPosts[0];
  const sidePosts = featuredPosts.slice(1, 3);

  if (!mainPost) return null;

  return (
    <section className="py-32 lg:py-40 border-t border-border/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            Perspectives
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-2xl">
            Original analysis exploring how strategy, governance, and capital decisions translate into measurable outcomes at scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <Link to={`/blog/${mainPost.id}`} className="group block">
              <div className="aspect-[16/10] overflow-hidden bg-muted mb-6">
                <img
                  src={featuredHeroImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                Research
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl font-medium text-foreground mt-3 leading-tight">
                {mainPost.title}
              </h3>
            </Link>
          </motion.div>

          {/* Side Posts */}
          <div className="lg:col-span-5 space-y-8">
            {sidePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="group flex gap-5">
                  <div className="w-28 h-28 flex-shrink-0 overflow-hidden bg-muted">
                    <img
                      src={tileImages[index] || tileImages[0]}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 py-1">
                    <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                      Perspective
                    </span>
                    <h4 className="font-serif text-base lg:text-lg font-medium text-foreground mt-2 leading-snug">
                      {post.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
