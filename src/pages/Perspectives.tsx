import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';
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
  summary: string;
  topic: string;
  featured: boolean | null;
  content: string[];
}

const topics = ['All', 'Governance', 'Growth', 'Impact', 'Risk', 'Strategy'];

const Perspectives = () => {
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTopic, setActiveTopic] = useState('All');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPerspectives = async () => {
      const { data, error } = await supabase
        .from('perspectives')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setPerspectives(staticPerspectives.map(p => ({
          ...p,
          featured: p.featured || null
        })));
      } else {
        setPerspectives(data as Perspective[]);
      }
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
        title: "Subscribed",
        description: "You'll receive new Perspectives monthly.",
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
          <p className="text-muted-foreground">Loading...</p>
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
            Perspectives
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground font-light mb-4"
          >
            Interpretive essays on strategy, governance, and long-term impact.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground/70 font-light"
          >
            How we frame complexity, risk, and institutional choice.
          </motion.p>
        </div>
      </section>

      {/* Topic Filters */}
      <section className="pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                  activeTopic === topic
                    ? 'text-foreground border-b border-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Introductory Text */}
      <section className="pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-foreground/80 font-light leading-relaxed">
            Perspectives reflect how we approach decisions that shape systems — offering clarity, 
            context, and long-range thinking rather than prescriptions.
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
                  {featuredPerspective.title}
                </h2>
              </Link>
              <p className="text-muted-foreground font-light text-lg leading-relaxed max-w-2xl">
                {featuredPerspective.summary}
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
                    {perspective.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {perspective.summary}
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
              Receive New Perspectives
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Monthly essays on strategy, governance, and long-term impact.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-body flex-1"
                required
              />
              <Button type="submit" disabled={isSubscribing} className="btn-emerald font-body">
                {isSubscribing ? '...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Service CTA */}
      <section className="pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-body text-muted-foreground mb-4">
            If this matches what you're navigating, we'd welcome a conversation.
          </p>
          <Button asChild className="btn-emerald font-body">
            <Link to="/book">
              Book a Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto border-t border-divider pt-12">
          <p className="text-sm text-muted-foreground/60 font-light text-center italic">
            Perspectives are not position papers. They are lenses through which we examine complex decisions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Perspectives;
