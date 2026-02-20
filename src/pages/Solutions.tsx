import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock, MessageSquare, Users, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface SolutionData {
  id: string;
  sort_order: number;
  title: string;
  perspective: string;
  description: string;
  services: string[];
  detail_content: string;
  price: string;
  price_note: string;
  image_url: string | null;
  pdf_url: string | null;
  payment_link: string | null;
  title_zh_hant: string;
  title_zh_hans: string;
  description_zh_hant: string;
  description_zh_hans: string;
  detail_content_zh_hant: string;
  detail_content_zh_hans: string;
  services_zh_hant: string[];
  services_zh_hans: string[];
  perspective_zh_hant: string;
  perspective_zh_hans: string;
  price_zh_hant: string;
  price_zh_hans: string;
  price_note_zh_hant: string;
  price_note_zh_hans: string;
}

export default function Solutions() {
  const { t, i18n } = useTranslation(['solutions', 'common']);
  const [solutions, setSolutions] = useState<SolutionData[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('solutions' as any)
        .select('*')
        .order('sort_order', { ascending: true });
      if (data) setSolutions(data as any);
      setLoading(false);
    };
    fetch();
  }, []);

  const lang = i18n.language;

  const localized = (s: SolutionData, field: 'title' | 'perspective' | 'description' | 'detail_content' | 'price' | 'price_note') => {
    if (lang.startsWith('zh-Hant') || lang === 'zh') {
      const v = s[`${field}_zh_hant` as keyof SolutionData] as string;
      return v || s[field];
    }
    if (lang.startsWith('zh-Hans') || lang.startsWith('zh')) {
      const v = s[`${field}_zh_hans` as keyof SolutionData] as string;
      return v || s[field];
    }
    return s[field];
  };

  const localizedServices = (s: SolutionData) => {
    if (lang.startsWith('zh-Hant') || lang === 'zh') {
      return s.services_zh_hant?.length ? s.services_zh_hant : s.services;
    }
    if (lang.startsWith('zh-Hans') || lang.startsWith('zh')) {
      return s.services_zh_hans?.length ? s.services_zh_hans : s.services;
    }
    return s.services;
  };

  const supportFeatures = [
    {
      icon: MessageSquare,
      titleKey: 'solutions:howWeWork.directAccess.title',
      descriptionKey: 'solutions:howWeWork.directAccess.description',
    },
    {
      icon: Clock,
      titleKey: 'solutions:howWeWork.response.title',
      descriptionKey: 'solutions:howWeWork.response.description',
    },
    {
      icon: Users,
      titleKey: 'solutions:howWeWork.specialists.title',
      descriptionKey: 'solutions:howWeWork.specialists.description',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8">
              {t('solutions:pageTitle')}
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {t('solutions:pageDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="pb-24">
        <div className="container">
          {loading ? (
            <p className="text-muted-foreground text-center">Loading...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => {
                const services = localizedServices(solution);
                const isExpanded = expandedId === solution.id;
                
                return (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg flex flex-col overflow-hidden"
                  >
                    {/* Card image */}
                    {solution.image_url && (
                      <img
                        src={solution.image_url}
                        alt={localized(solution, 'title')}
                        className="w-full h-40 object-cover"
                      />
                    )}

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="mb-6">
                        <h2 className="font-serif text-xl font-medium text-foreground mb-2">
                          {localized(solution, 'title')}
                        </h2>
                        <p className="font-body text-sm text-primary italic">
                          "{localized(solution, 'perspective')}"
                        </p>
                      </div>
                      
                      <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                        {localized(solution, 'description')}
                      </p>

                      <div className="space-y-2 mb-6 flex-grow">
                        {services.slice(0, 4).map((service, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="font-body text-sm text-muted-foreground">{service}</span>
                          </div>
                        ))}
                        {services.length > 4 && (
                          <p className="font-body text-xs text-muted-foreground/70 pl-6">
                            {t('solutions:moreServices', { count: services.length - 4 })}
                          </p>
                        )}
                      </div>

                      <div className="border-t border-border pt-6 mt-auto">
                        <p className="font-serif text-base font-medium text-foreground mb-1">
                          {localized(solution, 'price')}
                        </p>
                        <p className="font-body text-xs text-muted-foreground mb-4">
                          {localized(solution, 'price_note')}
                        </p>
                        {solution.payment_link ? (
                          <Button asChild className="w-full font-body btn-emerald">
                            <a href={solution.payment_link} target="_blank" rel="noopener noreferrer">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {t('solutions:purchase', { defaultValue: 'Purchase' })}
                            </a>
                          </Button>
                        ) : (
                          <Button asChild variant="outline" className="w-full font-body">
                            <Link to={`/book?solution=${solution.id}`}>
                              {t('common:cta.bookConsultation')}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Partner Support */}
      <section className="pb-24">
        <div className="container max-w-4xl">
          <div className="section-divider" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl font-medium text-foreground mb-8">
              {t('solutions:howWeWork.title')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {supportFeatures.map((feature, index) => (
                <motion.div
                  key={feature.titleKey}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-body text-sm font-medium text-foreground mb-2">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <Button asChild className="btn-emerald font-body">
              <Link to="/book">
                {t('common:cta.bookConsultation')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
