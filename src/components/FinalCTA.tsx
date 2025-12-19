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
          <p className="font-body text-muted-foreground leading-relaxed">
            For inquiries regarding advisory engagements,<br />
            please contact us directly.
          </p>
          
          <a
            href="mailto:hello@plexapartners.com"
            className="inline-block font-body text-foreground border-b border-foreground/30 hover:border-foreground pb-1 transition-colors"
          >
            hello@plexapartners.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};
