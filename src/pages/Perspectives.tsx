import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { perspectives } from '@/data/perspectives';

const Perspectives = () => {
  const featuredPerspective = perspectives.find((p) => p.featured);
  const otherPerspectives = perspectives.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight mb-8"
          >
            Perspectives
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground font-light mb-4"
          >
            Interpretive essays on strategy, governance, and long-term impact.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground/70 font-light"
          >
            How we frame complexity, risk, and institutional choice.
          </motion.p>
        </div>
      </section>

      {/* Introductory Text */}
      <section className="pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-foreground/80 font-light leading-relaxed">
            Perspectives reflect how we approach decisions that shape systems — offering clarity, 
            context, and long-range thinking rather than prescriptions.
          </p>
        </div>
      </section>

      {/* Featured Perspective */}
      {featuredPerspective && (
        <section className="pb-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border-t border-divider pt-12"
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                {featuredPerspective.topic}
              </span>
              <Link to={`/perspectives/${featuredPerspective.id}`}>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 hover:text-foreground/70 transition-colors">
                  {featuredPerspective.title}
                </h2>
              </Link>
              <p className="text-muted-foreground font-light text-lg leading-relaxed max-w-2xl">
                {featuredPerspective.summary}
              </p>
            </motion.article>
          </div>
        </section>
      )}

      {/* Additional Perspectives */}
      <section className="pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            {otherPerspectives.map((perspective, index) => (
              <motion.article
                key={perspective.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="border-t border-divider py-10"
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">
                  {perspective.topic}
                </span>
                <Link to={`/perspectives/${perspective.id}`}>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-foreground mb-2 hover:text-foreground/70 transition-colors">
                    {perspective.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {perspective.summary}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto border-t border-divider pt-12">
          <p className="text-sm text-muted-foreground/60 font-light text-center italic">
            Perspectives are not position papers. They are lenses through which we examine complex decisions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Perspectives;
