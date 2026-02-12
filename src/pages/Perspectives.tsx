import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { perspectives as staticPerspectives } from '@/data/perspectives';

interface Perspective {
  id: string;
  title: string;
  title_zh?: string | null;
  title_zh_hans?: string | null;
  summary: string;
  summary_zh?: string | null;
  summary_zh_hans?: string | null;
  topic: string;
  featured: boolean | null;
  content: string[];
  content_zh?: string[] | null;
}

const Perspectives = () => {
  const { t, i18n } = useTranslation(['perspectives', 'common']);
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTopic, setActiveTopic] = useState('All');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const getTitle = (p: Perspective) => {
    if (i18n.language === 'zh-Hant' && p.title_zh) return p.title_zh;
    if (i18n.language === 'zh-Hans') return p.title_zh_hans || p.title_zh || p.title;
    return p.title;
  };
  const getSummary = (p: Perspective) => {
    if (i18n.language === 'zh-Hant' && p.summary_zh) return p.summary_zh;
    if (i18n.language === 'zh-Hans') return p.summary_zh_hans || p.summary_zh || p.summary;
    return p.summary;
  };

  const topics = [
    { key: 'all', label: t('perspectives:topics.all') },
    { key: 'governance', label: t('perspectives:topics.governance') },
    { key: 'growth', label: t('perspectives:topics.growth') },
    { key: 'impact', label: t('perspectives:topics.impact') },
    { key: 'risk', label: t('perspectives:topics.risk') },
    { key: 'strategy', label: t('perspectives:topics.strategy') },
  ];

  useEffect(() => {
    const fetchPerspectives = async () => {
      const { data, error } = await supabase
        .from('perspectives')
        .select('*')
        .order('created_at', { ascending: false });

      const dbPerspectives: Perspective[] = (data || []) as Perspective[];
      const dbIds = new Set(dbPerspectives.map(p => p.id));

      const staticMapped = staticPerspectives
        .filter(p => !dbIds.has(p.id))
        .map(p => ({ ...p, featured: p.featured || null }));

      setPerspectives([...dbPerspectives, ...staticMapped]);
      setLoading(false);
    };

    fetchPerspectives();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from('email_captures')
        .insert([{ email, source: 'newsletter_perspectives' }]);

      if (error) throw error;

      toast({
        title: t('perspectives:newsletter.subscribed'),
        description: t('perspectives:newsletter.subscribedMessage'),
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const filteredPerspectives = activeTopic === 'All' 
    ? perspectives 
    : perspectives.filter(p => p.topic.toLowerCase().includes(activeTopic.toLowerCase()));

  const featuredPerspective = filteredPerspectives.find((p) => p.featured);
  const otherPerspectives = filteredPerspectives.filter((p) => !p.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-40 pb-20 px-6 text-center">
          <p className="text-muted-foreground">{t('perspectives:loading')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight mb-8"
          >
            {t('perspectives:pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground font-light mb-4"
          >
            {t('perspectives:pageSubtitle')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground/70 font-light"
          >
            {t('perspectives:pageDescription')}
          </motion.p>
        </div>
      </section>

      {/* Topic Filters */}
      <section className="pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {topics.map((topic) => (
              <button
                key={topic.key}
                onClick={() => setActiveTopic(topic.key === 'all' ? 'All' : topic.key.charAt(0).toUpperCase() + topic.key.slice(1))}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                  (topic.key === 'all' && activeTopic === 'All') || activeTopic.toLowerCase() === topic.key
                    ? 'text-foreground border-b border-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Introductory Text */}
      <section className="pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-foreground/80 font-light leading-relaxed">
            {t('perspectives:introText')}
          </p>
        </div>
      </section>

      {/* Featured Perspective */}
      {featuredPerspective && (
        <section className="pb-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border-t border-divider pt-12"
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                {featuredPerspective.topic}
              </span>
              <Link to={`/perspectives/${featuredPerspective.id}`}>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 hover:text-foreground/70 transition-colors">
                  {getTitle(featuredPerspective)}
                </h2>
              </Link>
              <p className="text-muted-foreground font-light text-lg leading-relaxed max-w-2xl">
                {getSummary(featuredPerspective)}
              </p>
            </motion.article>
          </div>
        </section>
      )}

      {/* Additional Perspectives */}
      <section className="pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            {otherPerspectives.map((perspective, index) => (
              <motion.article
                key={perspective.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="border-t border-divider py-10"
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">
                  {perspective.topic}
                </span>
                <Link to={`/perspectives/${perspective.id}`}>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-foreground mb-2 hover:text-foreground/70 transition-colors">
                    {getTitle(perspective)}
                  </h3>
                </Link>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {getSummary(perspective)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-xl mx-auto">
          <div className="bg-tile rounded-lg p-8 border border-border/20 text-center">
            <h3 className="font-serif text-xl font-medium text-foreground mb-2">
              {t('perspectives:newsletter.title')}
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6">
              {t('perspectives:newsletter.description')}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder={t('perspectives:newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-body flex-1"
                required
              />
              <Button type="submit" disabled={isSubscribing} className="btn-emerald font-body">
                {isSubscribing ? '...' : t('perspectives:newsletter.subscribe')}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Service CTA */}
      <section className="pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-body text-muted-foreground mb-4">
            {t('perspectives:serviceCTA')}
          </p>
          <Button asChild className="btn-emerald font-body">
            <Link to="/book">
              {t('common:cta.bookConsultation')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto border-t border-divider pt-12">
          <p className="text-sm text-muted-foreground/60 font-light text-center italic">
            {t('perspectives:footerNote')}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Perspectives;
