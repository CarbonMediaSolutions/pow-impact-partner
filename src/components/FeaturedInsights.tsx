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
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="section-divider" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            Perspectives
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-2xl">
            Original analysis exploring how strategy, governance, and capital decisions translate into measurable outcomes at scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Featured Post - Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <Link to={`/blog/${mainPost.id}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-muted mb-5 relative rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
                <img
                  src={featuredHeroImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl" />
              </div>
              <span className="font-body text-xs text-primary uppercase tracking-wider font-medium">
                Research
              </span>
              <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground mt-2 leading-tight group-hover:text-primary transition-colors">
                {mainPost.title}
              </h3>
            </Link>
          </motion.div>

          {/* Side Posts - Right (Stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sidePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="group flex gap-5 items-start">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0 overflow-hidden bg-muted rounded-xl shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-0.5 group-hover:scale-[1.02]">
                    <img
                      src={tileImages[index] || tileImages[0]}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 py-1">
                    <span className="font-body text-xs text-primary uppercase tracking-wider font-medium">
                      Perspective
                    </span>
                    <h4 className="font-serif text-base lg:text-lg font-medium text-foreground mt-2 leading-snug group-hover:text-primary transition-colors">
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
