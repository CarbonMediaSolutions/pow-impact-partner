import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EmailGateProps {
  children: React.ReactNode;
  source: string;
}

const STORAGE_KEY = 'plexa_email_captured';

export const EmailGate = ({ children, source }: EmailGateProps) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const captured = localStorage.getItem(STORAGE_KEY);
    if (captured) {
      setHasAccess(true);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('email_captures')
        .insert([{
          email,
          name: name || null,
          source,
        }]);

      if (error) throw error;

      localStorage.setItem(STORAGE_KEY, 'true');
      setHasAccess(true);
      setShowModal(false);
      toast({
        title: "Welcome",
        description: "You now have full access to our analysis content.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setHasAccess(true);
    setShowModal(false);
  };

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Blurred Preview */}
      <div className="relative">
        <div className="blur-sm pointer-events-none select-none">
          {children}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <p className="font-body text-muted-foreground">
              Enter your email to access full analysis
            </p>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-card border border-border rounded-lg p-8 shadow-lg"
            >
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Skip"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h2 className="font-serif text-2xl font-medium text-foreground mb-2">
                  Access Full Analysis
                </h2>
                <p className="font-body text-sm text-muted-foreground">
                  Enter your email to unlock the complete analysis and receive our latest insights.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gate-name" className="font-body text-sm">Name</Label>
                  <Input
                    id="gate-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gate-email" className="font-body text-sm">Email *</Label>
                  <Input
                    id="gate-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@company.com"
                    className="font-body"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-emerald font-body"
                >
                  {isSubmitting ? (
                    <span>Unlocking...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Unlock Content
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-4 font-body text-xs text-muted-foreground text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
