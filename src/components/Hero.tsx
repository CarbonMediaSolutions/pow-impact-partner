import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const { t } = useTranslation(['home', 'common']);

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
            {t('home:hero.headline')}
            <br />
            {t('home:hero.headlineLine2')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto font-body text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {t('home:hero.subheadline')}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto font-body text-sm sm:text-base text-muted-foreground/80 leading-relaxed"
          >
            {t('home:hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild className="btn-emerald font-body px-8 py-6 text-base">
              <Link to="/book">
                {t('common:cta.bookConsultation')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="font-body px-8 py-6 text-base border-foreground/20 hover:bg-foreground hover:text-background">
              <Link to="/solutions">
                {t('common:cta.viewEngagementModels')}
              </Link>
            </Button>
          </motion.div>

          {/* Credibility Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground/60 font-body"
          >
            <span>{t('common:credentials.regulatedByIcaew')}</span>
            <span className="hidden sm:inline text-muted-foreground/30">•</span>
            <span>{t('common:credentials.locations')}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
