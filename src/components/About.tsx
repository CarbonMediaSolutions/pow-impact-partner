import { motion } from 'framer-motion';
import patricPortrait from '@/assets/patric-portrait.jpg';

export const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-body text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Leadership
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-3">
            Leadership & Perspective
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={patricPortrait}
                alt="Patric - Founder"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            <div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                Patric
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Founder & Principal Advisor
              </p>
            </div>

            <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
              <p>
                With over 15 years advising founders, leadership teams, and boards across 
                technology, professional services, and social enterprise, I bring a perspective 
                shaped by both rigorous financial discipline and strategic ambition.
              </p>
              <p>
                My approach combines the analytical precision of a Chartered Accountant with 
                the strategic thinking of an advisor who has helped organisations navigate 
                growth, complexity, and transformation. I work with leaders who want more 
                than compliance—they want clarity and direction.
              </p>
              <p>
                Before founding Plexa Partners, I held senior finance roles in high-growth 
                environments where I learned that the best strategies are built on sound 
                financial intelligence, aligned teams, and a clear sense of purpose.
              </p>
            </div>

            <div className="pt-6 border-t border-border/50">
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <div>
                  <p className="font-body text-sm text-muted-foreground">Qualification</p>
                  <p className="font-body text-foreground">ICAEW Chartered Accountant</p>
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Experience</p>
                  <p className="font-body text-foreground">15+ years</p>
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Clients served</p>
                  <p className="font-body text-foreground">80+ organisations</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
