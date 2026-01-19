import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Lightbulb, BarChart3, Briefcase } from 'lucide-react';

export const ThreePillars = () => {
  const { t } = useTranslation(['home', 'common']);

  const pillars = [
    {
      icon: Lightbulb,
      titleKey: 'home:pillars.perspective.title',
      descriptionKey: 'home:pillars.perspective.description',
      ctaKey: 'common:cta.readPerspectives',
      href: '/perspectives',
    },
    {
      icon: BarChart3,
      titleKey: 'home:pillars.dataAnalysis.title',
      descriptionKey: 'home:pillars.dataAnalysis.description',
      ctaKey: 'common:cta.exploreAnalysis',
      href: '/analysis',
    },
    {
      icon: Briefcase,
      titleKey: 'home:pillars.solutions.title',
      descriptionKey: 'home:pillars.solutions.description',
      ctaKey: 'common:cta.viewSolutions',
      href: '/solutions',
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
          className="mb-12"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            {t('home:pillars.sectionTitle')}
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-2xl">
            {t('home:pillars.sectionDescription')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 lg:p-10 bg-tile rounded-lg border border-border/20 hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground mb-3">
                {t(pillar.titleKey)}
              </h3>
              
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                {t(pillar.descriptionKey)}
              </p>
              
              <Link 
                to={pillar.href}
                className="inline-flex items-center font-body text-sm text-primary hover:text-primary/80 transition-colors group-hover:underline underline-offset-2"
              >
                {t(pillar.ctaKey)}
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
