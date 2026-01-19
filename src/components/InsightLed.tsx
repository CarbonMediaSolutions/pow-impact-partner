import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const InsightLed = () => {
  const { t } = useTranslation('home');

  const themes = [
    {
      titleKey: 'themes.growth.title',
      descriptionKey: 'themes.growth.description',
    },
    {
      titleKey: 'themes.organisation.title',
      descriptionKey: 'themes.organisation.description',
    },
    {
      titleKey: 'themes.capital.title',
      descriptionKey: 'themes.capital.description',
    },
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="section-divider" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            {t('themes.sectionTitle')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 lg:p-12 bg-tile rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border/20 transition-colors duration-300"
            >
              <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground mb-4 group-hover:text-teal transition-colors">
                {t(theme.titleKey)}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {t(theme.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
