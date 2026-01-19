import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const CaseStudies = () => {
  const { t } = useTranslation('home');

  const engagements = [
    {
      sectorKey: 'engagements.tech.sector',
      situationKey: 'engagements.tech.situation',
      outcomeKey: 'engagements.tech.outcome',
    },
    {
      sectorKey: 'engagements.professional.sector',
      situationKey: 'engagements.professional.situation',
      outcomeKey: 'engagements.professional.outcome',
    },
    {
      sectorKey: 'engagements.social.sector',
      situationKey: 'engagements.social.situation',
      outcomeKey: 'engagements.social.outcome',
    },
  ];

  return (
    <section id="impact" className="py-20 lg:py-24">
      <div className="container">
        <div className="section-divider" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            {t('engagements.sectionTitle')}
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-2xl">
            {t('engagements.sectionDescription')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.sectorKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 lg:p-8 bg-tile rounded-lg border border-border/20"
            >
              {/* Sector label */}
              <span className="inline-block font-body text-xs font-medium text-primary uppercase tracking-wider mb-4">
                {t(engagement.sectorKey)}
              </span>
              
              {/* Situation */}
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                {t(engagement.situationKey)}
              </p>

              {/* Outcome - punchy and bold */}
              <div className="pt-4 border-t border-border/30">
                <p className="font-serif text-foreground font-medium leading-relaxed">
                  {t(engagement.outcomeKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
