import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmailGate } from '@/components/EmailGate';
import { supabase } from '@/integrations/supabase/client';
import { analyses as staticAnalyses } from '@/data/analyses';
import { ArrowLeft } from 'lucide-react';

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
  summary: string;
  category: string;
  date: string | null;
  content: AnalysisContent;
}

const AnalysisDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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
          content: data.content as AnalysisContent
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
          <p className="text-muted-foreground">Loading...</p>
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
            <h1 className="text-2xl font-serif text-foreground mb-4">Analysis not found</h1>
            <Link to="/analysis" className="text-primary hover:underline">
              Return to Analysis
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
            Back to Analysis
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
            {analysis.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {analysis.summary}
          </p>
        </header>

        {/* Gated Content */}
        <EmailGate source={`analysis-${analysis.id}`}>
          {/* Introduction */}
          <article className="max-w-3xl mx-auto px-6">
            {analysis.content.introduction && (
              <p className="text-lg text-foreground/90 leading-relaxed font-light mb-12">
                {analysis.content.introduction}
              </p>
            )}

            {/* Sections */}
            {analysis.content.sections && analysis.content.sections.length > 0 && (
              <div className="space-y-12">
                {analysis.content.sections.map((section, index) => (
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
            {analysis.content.methodology && (
              <section className="mt-16 pt-12 border-t border-border">
                <h2 className="text-lg font-medium text-foreground mb-4">Methodology</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {analysis.content.methodology}
                </p>
              </section>
            )}

            {/* Key Findings */}
            {analysis.content.keyFindings && analysis.content.keyFindings.length > 0 && (
              <section className="mt-12">
                <h2 className="text-lg font-medium text-foreground mb-6">Key Findings</h2>
                <ul className="space-y-4">
                  {analysis.content.keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="text-primary/60 font-serif text-lg">•</span>
                      <span className="text-foreground/80 leading-relaxed">{finding}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Implications */}
            {analysis.content.implications && analysis.content.implications.length > 0 && (
              <section className="mt-12">
                <h2 className="text-lg font-medium text-foreground mb-6">Implications</h2>
                <ul className="space-y-4">
                  {analysis.content.implications.map((implication, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="text-primary/60 font-serif text-lg">•</span>
                      <span className="text-foreground/80 leading-relaxed">{implication}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </EmailGate>

        {/* Footer note */}
        <div className="max-w-3xl mx-auto px-6 mt-20">
          <div className="border-t border-border pt-12">
            <p className="text-sm text-muted-foreground italic">
              This analysis reflects our commitment to rigour, discipline, and evidence-based judgment. 
              Findings should be considered in context of specific organisational circumstances.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnalysisDetail;