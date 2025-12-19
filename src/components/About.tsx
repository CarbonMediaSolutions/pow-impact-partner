import { motion } from 'framer-motion';
import patricPortrait from '@/assets/patric-portrait.jpg';

export const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-border/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl font-medium text-foreground tracking-tight">
            Leadership
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="aspect-[3/4] max-w-[160px] overflow-hidden bg-muted">
              <img
                src={patricPortrait}
                alt="Patric"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                Patric
              </h3>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                Founder & Principal
              </p>
            </div>

            <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
              <p>
                Patric advises founders, leadership teams, and boards on strategic, operational, and financial matters.
              </p>
              <p>
                His work focuses on navigating complexity, strengthening decision-making, and long-term organisational performance across mission-driven and commercial contexts.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
