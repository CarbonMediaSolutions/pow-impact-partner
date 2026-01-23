import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Users, Leaf, TrendingUp, Check, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import patricPortrait from '@/assets/patric-portrait.jpg';

// Team member type
interface TeamMember {
  id: string;
  nameKey: string;
  roleKey: string;
  focusKey: string;
  image?: string;
}

// Team members data with translation keys
const teamMembers: TeamMember[] = [
  { id: 'patric', nameKey: 'patric', roleKey: 'patric', focusKey: 'patric', image: patricPortrait },
  { id: 'rakesh', nameKey: 'rakesh', roleKey: 'rakesh', focusKey: 'rakesh' },
  { id: 'pengLi', nameKey: 'pengLi', roleKey: 'pengLi', focusKey: 'pengLi' },
  { id: 'chiara', nameKey: 'chiara', roleKey: 'chiara', focusKey: 'chiara' },
  { id: 'gabriel', nameKey: 'gabriel', roleKey: 'gabriel', focusKey: 'gabriel' },
  { id: 'nicole', nameKey: 'nicole', roleKey: 'nicole', focusKey: 'nicole' },
  { id: 'stephen', nameKey: 'stephen', roleKey: 'stephen', focusKey: 'stephen' },
  { id: 'mandy', nameKey: 'mandy', roleKey: 'mandy', focusKey: 'mandy' },
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

  const professionalStandards = [
    t('about:professionalStandards.items.icaew'),
    t('about:professionalStandards.items.chartered'),
    t('about:professionalStandards.items.independent'),
    t('about:professionalStandards.items.confidentiality'),
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
      
      {/* Hero Section - Firm-Level Introduction */}
      <section className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-8">
              {t('about:pageTitle')}
            </h1>
            <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
              <p>{t('about:hero.intro')}</p>
              <p>{t('about:hero.intro2')}</p>
            </div>
            <p className="mt-8 font-body text-base text-muted-foreground/80 leading-relaxed max-w-3xl mx-auto">
              {t('about:hero.supporting')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Think - Philosophy */}
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

      {/* The Firm - Collective Identity */}
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
              <p>{t('about:theFirm.p3')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team - Visual Grid */}
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
              {t('about:leadershipTeam.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Photo */}
                <div className="aspect-[4/5] bg-muted overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={t(`about:leadershipTeam.members.${member.nameKey}.name`)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/50">
                      <User className="w-16 h-16 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                    {t(`about:leadershipTeam.members.${member.nameKey}.name`)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-2">
                    {t(`about:leadershipTeam.members.${member.roleKey}.role`)}
                  </p>
                  <p className="font-body text-xs text-primary/80">
                    {t(`about:leadershipTeam.members.${member.focusKey}.focus`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Standards */}
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
              {t('about:professionalStandards.title')}
            </h2>
            <ul className="space-y-3">
              {professionalStandards.map((standard, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 font-body text-muted-foreground"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{standard}</span>
                </motion.li>
              ))}
            </ul>
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

      {/* Closing CTA */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-body text-lg text-muted-foreground mb-8">
              {t('about:closingCTA.text')}
            </p>
            <Button asChild size="lg" variant="outline" className="font-body">
              <Link to="/book">
                {t('about:closingCTA.button')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
