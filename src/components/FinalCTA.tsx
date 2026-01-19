import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const FinalCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-24">
      <div className="container max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="font-body text-sm text-muted-foreground/80 tracking-wide">
            {t('cta.forAdvisoryInquiries')}
          </p>
          
          <a
            href="mailto:hello@plexapartners.com"
            className="inline-block font-body text-primary text-sm hover:text-teal-dark transition-colors hover:underline underline-offset-2"
          >
            hello@plexapartners.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};
