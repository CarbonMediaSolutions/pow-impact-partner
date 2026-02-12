 import { useState, useEffect } from 'react';
 import { useParams, Link } from 'react-router-dom';
 import { useTranslation } from 'react-i18next';
 import { motion } from 'framer-motion';
 import { Header } from '@/components/Header';
 import { Footer } from '@/components/Footer';
 import { supabase } from '@/integrations/supabase/client';
 import { perspectives as staticPerspectives } from '@/data/perspectives';
 import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { format } from 'date-fns';
 import { FormattedContent } from '@/components/FormattedContent';
 import { SocialShare } from '@/components/SocialShare';

interface Perspective {
  id: string;
  title: string;
  title_zh?: string | null;
  title_zh_hans?: string | null;
  summary: string;
  summary_zh?: string | null;
  summary_zh_hans?: string | null;
  topic: string;
  content: string[];
  content_zh?: string[] | null;
  content_zh_hans?: string[] | null;
  image?: string | null;
  tags?: string[] | null;
  created_at?: string;
}

const PerspectiveDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation(['perspectives', 'common']);
  const [perspective, setPerspective] = useState<Perspective | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const isZh = i18n.language.startsWith('zh');

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
  const getContent = (p: Perspective) => {
    if (i18n.language === 'zh-Hant' && p.content_zh && p.content_zh.length > 0) return p.content_zh;
    if (i18n.language === 'zh-Hans') {
      if (p.content_zh_hans && p.content_zh_hans.length > 0) return p.content_zh_hans;
      if (p.content_zh && p.content_zh.length > 0) return p.content_zh;
    }
    return p.content;
  };

  useEffect(() => {
    const fetchPerspective = async () => {
      const { data, error } = await supabase
        .from('perspectives')
        .select('*')
        .eq('id', id!)
        .maybeSingle();

      if (data) {
        setPerspective(data as Perspective);
      } else {
        const staticPerspective = staticPerspectives.find(p => p.id === id);
        if (staticPerspective) {
          setPerspective(staticPerspective);
        } else {
          setNotFound(true);
        }
      }
      setLoading(false);
    };

    if (id) {
      fetchPerspective();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 px-6 text-center">
          <p className="text-muted-foreground">{t('perspectives:loading')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !perspective) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-serif text-foreground mb-4">
              {isZh ? '找不到觀點' : 'Perspective not found'}
            </h1>
            <Link to="/perspectives" className="text-primary hover:underline">
              {isZh ? '返回觀點' : 'Return to Perspectives'}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container max-w-4xl">
          <Link to="/perspectives" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-body">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isZh ? '返回觀點' : 'Back to Perspectives'}
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="outline" className="font-body">{perspective.topic}</Badge>
              {perspective.created_at && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground font-body">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(perspective.created_at), 'dd MMMM yyyy')}
                </span>
              )}
              <span className="flex items-center gap-1 text-sm text-muted-foreground font-body">
                <Clock className="w-4 h-4" />
                {Math.ceil(getContent(perspective).join(' ').split(' ').length / 200)} min read
              </span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {getTitle(perspective)}
            </h1>
            
            <p className="font-body text-xl text-muted-foreground mb-8">
              {getSummary(perspective)}
            </p>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-body font-semibold text-foreground">Plexa Partners</p>
                <p className="font-body text-sm text-muted-foreground">Advisory</p>
              </div>
            </div>
           
           {/* Social Share */}
           <SocialShare 
             url={`https://pow-impact-partner.lovable.app/perspectives/${perspective.id}`}
             title={getTitle(perspective)}
           />
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {perspective.image && (
        <section className="pb-12">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={perspective.image}
                alt={getTitle(perspective)}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </section>
      )}

       {/* Article Content */}
       <section className="pb-16">
         <div className="container max-w-3xl">
           <motion.article
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.3 }}
             className="prose prose-lg max-w-none font-body"
           >
             <FormattedContent content={getContent(perspective)} />
           </motion.article>

          {/* Tags */}
          {perspective.tags && perspective.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h4 className="font-body font-semibold text-foreground mb-4">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {perspective.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="font-body">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
            {isZh ? '想進一步討論這些想法？' : 'Want to discuss these ideas further?'}
          </h3>
          <p className="font-body text-muted-foreground mb-6">
            {isZh 
              ? '預約免費諮詢，探討這些策略如何適用於您的組織。' 
              : 'Book a free consultation to explore how these strategies could work for your organization.'}
          </p>
          <Link to="/book">
            <Button className="btn-emerald font-body font-semibold px-8 py-6">
              {isZh ? '預約免費諮詢' : 'Book Your Free Consultation'}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer divider */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="border-t border-border pt-12">
            <p className="text-sm text-muted-foreground italic">
              {isZh 
                ? '此觀點反映了我們理解複雜決策的方式。它作為思考的視角提供，而非行動的處方。'
                : 'This perspective reflects our approach to understanding complex decisions. It is offered as a lens for consideration, not a prescription for action.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PerspectiveDetail;
