import { motion } from 'framer-motion';

export const FinalCTA = () => {
  return (
    <section className="py-32 lg:py-40 border-t border-border/30">
      <div className="container max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="font-body text-sm text-muted-foreground/80 tracking-wide">
            For advisory inquiries
          </p>
          
          <a
            href="mailto:hello@plexapartners.com"
            className="inline-block font-body text-foreground text-sm"
          >
            hello@plexapartners.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};
