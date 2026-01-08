import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { analyses as staticAnalyses, analysisCategories } from '@/data/analyses';

interface Analysis {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string | null;
  featured: boolean | null;
}

const Analysis = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const fetchAnalyses = async () => {
      const { data, error } = await supabase
        .from('analyses')
        .select('id, title, summary, category, date, featured')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to static data if no database entries
        setAnalyses(staticAnalyses.map(a => ({
          id: a.id,
          title: a.title,
          summary: a.summary,
          category: a.category,
          date: a.date || null,
          featured: a.featured || null
        })));
      } else {
        setAnalyses(data as Analysis[]);
      }
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
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - More compact than Perspectives */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl font-light text-foreground tracking-tight mb-6"
          >
            Analysis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground font-light mb-3"
          >
            Structured examinations of strategic, institutional, and operational challenges.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground/70 font-light"
          >
            Evidence-led insights grounded in real operating environments.
          </motion.p>
        </div>
      </section>

      {/* Introductory Text */}
      <section className="pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-foreground/80 font-light leading-relaxed">
            Our analysis applies disciplined frameworks, empirical reasoning, and contextual 
            understanding to evaluate decisions, trade-offs, and outcomes.
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
                  {featuredAnalysis.title}
                </h2>
              </Link>
              <p className="text-muted-foreground font-light leading-relaxed max-w-3xl mb-4">
                {featuredAnalysis.summary}
              </p>
              <Link 
                to={`/analysis/${featuredAnalysis.id}`}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Read analysis →
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
                    {analysis.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-3">
                  {analysis.summary}
                </p>
                <Link 
                  to={`/analysis/${analysis.id}`}
                  className="text-xs text-foreground/60 hover:text-foreground transition-colors"
                >
                  Read analysis →
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
            Analysis reflects our commitment to rigor, discipline, and evidence-based judgment.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Analysis;