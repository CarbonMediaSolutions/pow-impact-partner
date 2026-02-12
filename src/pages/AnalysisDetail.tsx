import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { analyses as staticAnalyses } from '@/data/analyses';
import { ArrowLeft } from 'lucide-react';
 import { SocialShare } from '@/components/SocialShare';
 import { GatedDownload } from '@/components/GatedDownload';

interface AnalysisContent {
  introduction?: string;
  sections?: { heading: string; paragraphs: string[] }[];
  methodology?: string;
  keyFindings?: string[];
  implications?: string[];
}

interface Analysis {
  id: string;
  title: string;
  title_zh?: string | null;
  title_zh_hans?: string | null;
  summary: string;
  summary_zh?: string | null;
  summary_zh_hans?: string | null;
  category: string;
  date: string | null;
  content: AnalysisContent;
  content_zh?: AnalysisContent | null;
  content_zh_hans?: AnalysisContent | null;
   pdf_url?: string | null;
}

const AnalysisDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation(['analysis', 'common']);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const isZh = i18n.language.startsWith('zh');

  const getTitle = (a: Analysis) => {
    if (i18n.language === 'zh-Hant' && a.title_zh) return a.title_zh;
    if (i18n.language === 'zh-Hans') return a.title_zh_hans || a.title_zh || a.title;
    return a.title;
  };
  const getSummary = (a: Analysis) => {
    if (i18n.language === 'zh-Hant' && a.summary_zh) return a.summary_zh;
    if (i18n.language === 'zh-Hans') return a.summary_zh_hans || a.summary_zh || a.summary;
    return a.summary;
  };
  const getContent = (a: Analysis) => {
    if (i18n.language === 'zh-Hant' && a.content_zh) return a.content_zh;
    if (i18n.language === 'zh-Hans') return a.content_zh_hans || a.content_zh || a.content;
    return a.content;
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      // First try database
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', id!)
        .maybeSingle();

      if (data) {
        setAnalysis({
          ...data,
          content: data.content as AnalysisContent,
          content_zh: data.content_zh as AnalysisContent | null
        } as Analysis);
      } else {
        // Fallback to static data
        const staticAnalysis = staticAnalyses.find(a => a.id === id);
        if (staticAnalysis) {
          setAnalysis({
            id: staticAnalysis.id,
            title: staticAnalysis.title,
            summary: staticAnalysis.summary,
            category: staticAnalysis.category,
            date: staticAnalysis.date || null,
            content: staticAnalysis.content
          });
        } else {
          setNotFound(true);
        }
      }
      setLoading(false);
    };

    if (id) {
      fetchAnalysis();
    }
  }, [id]);

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

  if (notFound || !analysis) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-serif text-foreground mb-4">
              {t('analysis:notFound')}
            </h1>
            <Link to="/analysis" className="text-primary hover:underline">
              {t('analysis:returnToList')}
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
            to="/analysis" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('analysis:backToList')}
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {analysis.category}
            </span>
            {analysis.date && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-xs text-muted-foreground">{analysis.date}</span>
              </>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-tight mb-6">
            {getTitle(analysis)}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {getSummary(analysis)}
          </p>
         
         {/* Social Share */}
         <div className="mt-6">
           <SocialShare 
             url={`https://pow-impact-partner.lovable.app/analysis/${analysis.id}`}
             title={getTitle(analysis)}
           />
         </div>
          
          {/* Gated PDF Download */}
          {analysis.pdf_url && (
            <div className="mt-6">
              <GatedDownload 
                pdfUrl={analysis.pdf_url}
                title={getTitle(analysis)}
                source={`analysis-pdf-${analysis.id}`}
              />
            </div>
          )}
        </header>

        {/* Gated Content */}
        {/* Content - freely accessible */}
        <article className="max-w-3xl mx-auto px-6">
          {/* Introduction */}
          {getContent(analysis).introduction && (
            <p className="text-lg text-foreground/90 leading-relaxed font-light mb-12">
              {getContent(analysis).introduction}
            </p>
          )}

          {/* Sections */}
          {getContent(analysis).sections && getContent(analysis).sections!.length > 0 && (
            <div className="space-y-12">
              {getContent(analysis).sections!.map((section, index) => (
                <section key={index}>
                  <h2 className="text-2xl font-serif text-foreground mb-6">
                    {section.heading}
                  </h2>
                  <div className="space-y-6">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p 
                        key={pIndex} 
                        className="text-lg text-foreground/90 leading-relaxed font-light"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Methodology */}
          {getContent(analysis).methodology && (
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="text-lg font-medium text-foreground mb-4">
                {t('analysis:methodology')}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {getContent(analysis).methodology}
              </p>
            </section>
          )}

          {/* Key Findings */}
          {getContent(analysis).keyFindings && getContent(analysis).keyFindings!.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-medium text-foreground mb-6">
                {t('analysis:keyFindings')}
              </h2>
              <ul className="space-y-4">
                {getContent(analysis).keyFindings!.map((finding, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-primary/60 font-serif text-lg">•</span>
                    <span className="text-foreground/80 leading-relaxed">{finding}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Implications */}
          {getContent(analysis).implications && getContent(analysis).implications!.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-medium text-foreground mb-6">
                {t('analysis:implications')}
              </h2>
              <ul className="space-y-4">
                {getContent(analysis).implications!.map((implication, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-primary/60 font-serif text-lg">•</span>
                    <span className="text-foreground/80 leading-relaxed">{implication}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* Footer note */}
        <div className="max-w-3xl mx-auto px-6 mt-20">
          <div className="border-t border-border pt-12">
            <p className="text-sm text-muted-foreground italic">
              {t('analysis:disclaimerNote')}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnalysisDetail;