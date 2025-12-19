import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import insightTile1 from '@/assets/insight-tile-1.jpg';
import insightTile2 from '@/assets/insight-tile-2.jpg';
import capabilityStrategy from '@/assets/capability-strategy.jpg';
import capabilityOrganisation from '@/assets/capability-organisation.jpg';

const postImages = [insightTile1, insightTile2, capabilityStrategy, capabilityOrganisation];

export const LatestThinking = () => {
  const latestPosts = blogPosts.filter(post => !post.featured).slice(0, 3);

  return (
    <section className="py-32 lg:py-40">
      <div className="container">
        <div className="section-divider" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
                Recent Analysis
              </h2>
              <p className="font-body text-sm text-muted-foreground mt-3">
                Selected publications addressing complex organisational and policy challenges.
              </p>
            </div>
            <Link 
              to="/blog" 
              className="hidden md:block font-body text-sm text-primary hover:text-teal-dark transition-colors hover:underline underline-offset-2"
            >
              View archive
            </Link>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                  <img
                    src={postImages[index % postImages.length]}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 font-body text-xs text-white bg-foreground/80 backdrop-blur-sm px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-serif text-base lg:text-lg font-medium text-foreground mt-2 leading-snug">
                  {post.title}
                </h3>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link 
            to="/blog" 
            className="font-body text-sm text-primary hover:text-teal-dark transition-colors hover:underline underline-offset-2"
          >
            View archive
          </Link>
        </div>
      </div>
    </section>
  );
};
