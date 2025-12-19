import { motion } from 'framer-motion';
import patricPortrait from '@/assets/patric-portrait.jpg';

export const About = () => {
  return (
    <section id="about" className="py-32 lg:py-40 border-t border-border/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            Leadership
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="aspect-[3/4] max-w-[240px] overflow-hidden bg-muted">
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
            className="lg:col-span-9 space-y-8"
          >
            <div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-1">
                Patric
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Founder & Principal
              </p>
            </div>

            <div className="space-y-6 font-body text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                Patric advises founders, leadership teams, and boards on strategic and 
                financial matters. His practice spans technology, professional services, 
                and social enterprise sectors.
              </p>
              <p>
                Prior to founding Plexa Partners, Patric held senior finance positions 
                in high-growth environments where he developed an approach that combines 
                analytical rigour with strategic perspective.
              </p>
              <p>
                He is a Chartered Accountant and works with leaders who seek clarity 
                in navigating growth, complexity, and transformation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
