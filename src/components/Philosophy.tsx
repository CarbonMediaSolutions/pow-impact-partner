import { motion } from 'framer-motion';

export const Philosophy = () => {
  return (
    <section className="py-20 lg:py-28 border-t border-border/10">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center"
        >
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            We work at the intersection of strategy, policy, and performance — supporting organisations whose decisions influence markets, institutions, and communities.
          </p>
          <p className="font-body text-sm text-muted-foreground/70 leading-relaxed">
            Our work is confidential, research-led, and grounded in real operating environments.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
