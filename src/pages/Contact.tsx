import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          organisation: formData.organisation || null,
          email: formData.email,
          message: formData.message || null,
        }]);

      if (dbError) throw dbError;

      // Send email notification (non-blocking)
      try {
        await supabase.functions.invoke('send-consultation-notification', {
          body: {
            name: formData.name,
            email: formData.email,
            organisation: formData.organisation || undefined,
            problem_statement: `[Contact Form] ${formData.message || 'No message provided'}`,
          },
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      setIsSubmitted(true);
      toast({
        title: "Inquiry received",
        description: "We will review and respond where appropriate.",
      });
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8">
              Contact
            </h1>
            <div className="space-y-4">
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                For inquiries related to advisory engagements, research, or firm matters, please contact us directly.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                We work with founders, leadership teams, and boards navigating growth, transformation, and strategic complexity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="section-divider" />
            
            <h2 className="font-serif text-xl font-medium text-foreground mb-8">
              General Inquiries
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12"
              >
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  Inquiry Received
                </h3>
                <p className="font-body text-muted-foreground mb-8">
                  We will review your message and respond where there is a clear strategic fit.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', organisation: '', email: '', message: '' });
                  }}
                  variant="outline"
                  className="font-body"
                >
                  Submit Another Inquiry
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-body text-sm">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organisation" className="font-body text-sm">Organisation</Label>
                  <Input
                    id="organisation"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body text-sm">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-body text-sm">Message (optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="font-body resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-emerald font-body px-8"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Helper Text */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                Please note that engagements are selective and tailored to context.
                We review all inquiries and respond where there is a clear strategic fit.
              </p>
              
              <p className="font-body text-sm text-muted-foreground">
                You may also contact us directly at{' '}
                <a 
                  href="mailto:hello@plexapartners.com" 
                  className="text-teal hover:underline underline-offset-2"
                >
                  hello@plexapartners.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing */}
      <section className="pb-24">
        <div className="container max-w-3xl">
          <p className="font-body text-xs text-muted-foreground/60 tracking-wide">
            Plexa Partners advises leaders on decisions that shape long-term outcomes.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
