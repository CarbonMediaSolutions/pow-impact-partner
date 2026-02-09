import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Database, FileText, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { analyses as staticAnalyses, analysisCategories } from '@/data/analyses';

interface Analysis {
  id: string;
  title: string;
  title_zh?: string | null;
  summary: string;
  summary_zh?: string | null;
  category: string;
  date: string | null;
  featured: boolean | null;
}

const Analysis = () => {
  const { t, i18n } = useTranslation(['analysis', 'common']);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const isZh = i18n.language === 'zh';

  const getTitle = (a: Analysis) => (isZh && a.title_zh) ? a.title_zh : a.title;
  const getSummary = (a: Analysis) => (isZh && a.summary_zh) ? a.summary_zh : a.summary;

  const dataProducts = [
    {
      icon: FileText,
      titleKey: 'analysis:dataBenchmarks.benchmark.title',
      descriptionKey: 'analysis:dataBenchmarks.benchmark.description',
    },
    {
      icon: Database,
      titleKey: 'analysis:dataBenchmarks.dataset.title',
      descriptionKey: 'analysis:dataBenchmarks.dataset.description',
    },
    {
      icon: BarChart3,
      titleKey: 'analysis:dataBenchmarks.commission.title',
      descriptionKey: 'analysis:dataBenchmarks.commission.description',
    },
  ];

  useEffect(() => {
    const fetchAnalyses = async () => {
      const { data, error } = await supabase
        .from('analyses')
        .select('id, title, title_zh, summary, summary_zh, category, date, featured')
        .order('created_at', { ascending: false });

      const dbAnalyses: Analysis[] = (error || !data) ? [] : (data as Analysis[]);
      const staticMapped: Analysis[] = staticAnalyses.map(a => ({
        id: a.id,
        title: a.title,
        summary: a.summary,
        category: a.category,
        date: a.date || null,
        featured: a.featured || null
      }));
      const dbIds = new Set(dbAnalyses.map(a => a.id));
      const merged = [
        ...dbAnalyses,
        ...staticMapped.filter(a => !dbIds.has(a.id))
      ];
      setAnalyses(merged);
      setLoading(false);
    };

    fetchAnalyses();
  }, []);

  const filteredAnalyses = activeCategory === 'All' 
    ? analyses 
    : analyses.filter((a) => a.category === activeCategory);

  const featuredAnalysis = filteredAnalyses.find((a) => a.featured);
  const otherAnalyses = filteredAnalyses.filter((a) => !a.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 px-6 text-center">
          <p className="text-muted-foreground">{t('analysis:loading')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl font-light text-foreground tracking-tight mb-6"
          >
            {t('analysis:pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground font-light mb-3"
          >
            {t('analysis:pageSubtitle')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground/70 font-light"
          >
            {t('analysis:pageDescription')}
          </motion.p>
        </div>
      </section>

      {/* Data & Benchmarks Section */}
      <section className="pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-tile rounded-lg border border-border/20 p-8 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="font-serif text-xl lg:text-2xl font-medium text-foreground mb-2">
                {t('analysis:dataBenchmarks.title')}
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                {t('analysis:dataBenchmarks.description')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {dataProducts.map((product, index) => (
                <motion.div
                  key={product.titleKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <product.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-body text-sm font-medium text-foreground mb-1">
                    {t(product.titleKey)}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground">
                    {t(product.descriptionKey)}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild className="btn-emerald font-body">
                <Link to="/book?type=data">
                  {t('analysis:dataBenchmarks.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introductory Text */}
      <section className="pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-foreground/80 font-light leading-relaxed">
            {t('analysis:introText')}
          </p>
        </div>
      </section>

      {/* Subtle Filters */}
      <section className="pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {analysisCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                  activeCategory === category
                    ? 'text-foreground border-b border-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Featured Analysis */}
          {featuredAnalysis && activeCategory === 'All' && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border-t border-divider pt-10 pb-12 mb-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {featuredAnalysis.category}
                </span>
                {featuredAnalysis.date && (
                  <span className="text-xs text-muted-foreground/50">
                    {featuredAnalysis.date}
                  </span>
                )}
              </div>
              <Link to={`/analysis/${featuredAnalysis.id}`}>
                <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-4 hover:text-foreground/70 transition-colors">
                  {getTitle(featuredAnalysis)}
                </h2>
              </Link>
              <p className="text-muted-foreground font-light leading-relaxed max-w-3xl mb-4">
                {getSummary(featuredAnalysis)}
              </p>
              <Link 
                to={`/analysis/${featuredAnalysis.id}`}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {t('analysis:readAnalysis')}
              </Link>
            </motion.article>
          )}

          {/* Grid of Other Analyses */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
            {otherAnalyses.map((analysis, index) => (
              <motion.article
                key={analysis.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                className="border-t border-divider py-8"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {analysis.category}
                  </span>
                  {analysis.date && (
                    <span className="text-xs text-muted-foreground/50">
                      {analysis.date}
                    </span>
                  )}
                </div>
                <Link to={`/analysis/${analysis.id}`}>
                  <h3 className="font-serif text-lg md:text-xl font-light text-foreground mb-2 hover:text-foreground/70 transition-colors">
                    {getTitle(analysis)}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-3">
                  {getSummary(analysis)}
                </p>
                <Link
                  to={`/analysis/${analysis.id}`}
                  className="text-xs text-foreground/60 hover:text-foreground transition-colors"
                >
                  {t('analysis:readAnalysis')}
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto border-t border-divider pt-12">
          <p className="text-sm text-muted-foreground/60 font-light text-center italic">
            {t('analysis:footerNote')}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Analysis;
