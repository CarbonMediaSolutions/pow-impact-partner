import { motion } from 'framer-motion';

export const HeroExtension = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-body text-lg sm:text-xl text-muted-foreground text-center leading-relaxed"
        >
          Advising leaders, institutions, and mission-driven organisations on choices with long-term economic, social, and regulatory consequences.
        </motion.p>
      </div>
    </section>
  );
};
