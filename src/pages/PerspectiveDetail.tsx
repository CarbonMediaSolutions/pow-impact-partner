import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { perspectives as staticPerspectives } from '@/data/perspectives';
import { ArrowLeft } from 'lucide-react';

interface Perspective {
  id: string;
  title: string;
  title_zh?: string | null;
  summary: string;
  summary_zh?: string | null;
  topic: string;
  content: string[];
  content_zh?: string[] | null;
}

const PerspectiveDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation(['perspectives', 'common']);
  const [perspective, setPerspective] = useState<Perspective | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const isZh = i18n.language === 'zh';

  const getTitle = (p: Perspective) => (isZh && p.title_zh) ? p.title_zh : p.title;
  const getSummary = (p: Perspective) => (isZh && p.summary_zh) ? p.summary_zh : p.summary;
  const getContent = (p: Perspective) => (isZh && p.content_zh && p.content_zh.length > 0) ? p.content_zh : p.content;

  useEffect(() => {
    const fetchPerspective = async () => {
      // First try database
      const { data, error } = await supabase
        .from('perspectives')
        .select('*')
        .eq('id', id!)
        .maybeSingle();

      if (data) {
        setPerspective(data as Perspective);
      } else {
        // Fallback to static data
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
          <p className="text-muted-foreground">Loading...</p>
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
      
      <main className="pt-32 pb-24">
        {/* Back link */}
        <div className="max-w-3xl mx-auto px-6 mb-12">
          <Link 
            to="/perspectives" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isZh ? '返回觀點' : 'Back to Perspectives'}
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 mb-16">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
            {perspective.topic}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-tight mb-6">
            {getTitle(perspective)}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {getSummary(perspective)}
          </p>
        </header>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-6">
          <div className="space-y-8">
            {getContent(perspective).map((paragraph, index) => (
              <p 
                key={index} 
                className="text-lg text-foreground/90 leading-relaxed font-light"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Footer divider */}
        <div className="max-w-3xl mx-auto px-6 mt-20">
          <div className="border-t border-border pt-12">
            <p className="text-sm text-muted-foreground italic">
              {isZh 
                ? '此觀點反映了我們理解複雜決策的方式。它作為思考的視角提供，而非行動的處方。'
                : 'This perspective reflects our approach to understanding complex decisions. It is offered as a lens for consideration, not a prescription for action.'}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerspectiveDetail;