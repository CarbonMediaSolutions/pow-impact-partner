import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center pt-20">
      <div className="container max-w-5xl flex-1 flex items-center justify-center">
        <div className="text-center">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 max-w-2xl font-body text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Advising leaders, institutions, and mission-driven organisations on choices with long-term economic, social, and regulatory consequences.
          </motion.p>
          
          {/* Subtle horizontal rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto mt-10 w-16 h-px bg-foreground/10"
          />
        </div>
      </div>
    </section>
  );
};
