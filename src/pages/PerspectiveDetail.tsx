import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { perspectives } from '@/data/perspectives';
import { ArrowLeft } from 'lucide-react';

const PerspectiveDetail = () => {
  const { id } = useParams<{ id: string }>();
  const perspective = perspectives.find(p => p.id === id);

  if (!perspective) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-serif text-foreground mb-4">Perspective not found</h1>
            <Link to="/perspectives" className="text-primary hover:underline">
              Return to Perspectives
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
            Back to Perspectives
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 mb-16">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
            {perspective.topic}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-tight mb-6">
            {perspective.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {perspective.summary}
          </p>
        </header>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-6">
          <div className="space-y-8">
            {perspective.content.map((paragraph, index) => (
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
              This perspective reflects our approach to understanding complex decisions. 
              It is offered as a lens for consideration, not a prescription for action.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerspectiveDetail;
