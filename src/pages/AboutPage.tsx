import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Quote, Users, Leaf, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import patricPortrait from '@/assets/patric-portrait.jpg';

const credentials = [
  'ICAEW Chartered Accountant',
  'Regulated by ICAEW',
];

export default function AboutPage() {
  const { t } = useTranslation(['about', 'common']);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: t('about:clientPerspectives.testimonials.t1.quote'),
      author: t('about:clientPerspectives.testimonials.t1.author'),
      company: t('about:clientPerspectives.testimonials.t1.company'),
    },
    {
      quote: t('about:clientPerspectives.testimonials.t2.quote'),
      author: t('about:clientPerspectives.testimonials.t2.author'),
      company: t('about:clientPerspectives.testimonials.t2.company'),
    },
    {
      quote: t('about:clientPerspectives.testimonials.t3.quote'),
      author: t('about:clientPerspectives.testimonials.t3.author'),
      company: t('about:clientPerspectives.testimonials.t3.company'),
    },
  ];

  const values = [
    {
      icon: Users,
      titleKey: 'about:howWeThink.people.title',
      descriptionKey: 'about:howWeThink.people.description',
    },
    {
      icon: Leaf,
      titleKey: 'about:howWeThink.planet.title',
      descriptionKey: 'about:howWeThink.planet.description',
    },
    {
      icon: TrendingUp,
      titleKey: 'about:howWeThink.performance.title',
      descriptionKey: 'about:howWeThink.performance.description',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl -z-10" />
                <div className="relative overflow-hidden rounded-2xl border-4 border-background shadow-2xl">
                  <img
                    src={patricPortrait}
                    alt="Patric - Founder, Plexa Partners"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-secondary text-secondary-foreground px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="font-body text-sm font-medium">{t('about:icaewChartered')}</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6">
                {t('about:pageTitle')}
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                {t('about:heroDescription')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {credentials.map((credential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 bg-background px-5 py-3 rounded-lg border border-border"
              >
                <Award className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="font-body text-foreground font-medium">{credential}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Firm */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
              {t('about:theFirm.title')}
            </h2>
            <div className="font-body text-lg text-muted-foreground space-y-4 leading-relaxed">
              <p>{t('about:theFirm.p1')}</p>
              <p>{t('about:theFirm.p2')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Think */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
              {t('about:howWeThink.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">{t(value.titleKey)}</h3>
                <p className="font-body text-muted-foreground">{t(value.descriptionKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Firm Origins */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
              {t('about:firmOrigins.title')}
            </h2>
            <div className="font-body text-lg text-muted-foreground space-y-4 leading-relaxed">
              <p>{t('about:firmOrigins.p1')}</p>
              <p>{t('about:firmOrigins.p2')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Perspectives */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
              {t('about:clientPerspectives.title')}
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto bg-secondary/10 rounded-2xl p-8 lg:p-12 border-l-4 border-secondary">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-secondary/30" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <blockquote className="font-body text-lg lg:text-xl text-foreground leading-relaxed mb-6 pl-8">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <footer>
                  <p className="font-serif text-lg font-medium text-primary">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].company}
                  </p>
                </footer>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-background border border-border hover:border-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-border hover:bg-primary/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-background border border-border hover:border-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Thought Leaders */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
              {t('about:founder.title')}
            </h2>
            <div className="font-body text-lg text-muted-foreground space-y-4 leading-relaxed">
              <p>{t('about:founder.p1')}</p>
              <p>{t('about:founder.p2')}</p>
              <p>{t('about:founder.p3')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-muted-foreground mb-4">
              {t('about:closingCTA.text')}
            </p>
            <a 
              href="mailto:hello@plexapartners.com" 
              className="font-body text-teal hover:underline underline-offset-2"
            >
              hello@plexapartners.com
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
