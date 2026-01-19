import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Calendar, Shield, Clock, Globe } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { solutions } from '@/data/solutions';

export default function BookConsultation() {
  const [searchParams] = useSearchParams();
  const solutionId = searchParams.get('solution');
  const selectedSolution = solutionId ? solutions.find(s => s.id === solutionId) : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    role: '',
    website_linkedin: '',
    problem_statement: '',
    desired_outcome: '',
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
      // Insert into database
      const { error: dbError } = await supabase
        .from('consultation_leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          organisation: formData.organisation || null,
          role: formData.role || null,
          website_linkedin: formData.website_linkedin || null,
          problem_statement: selectedSolution 
            ? `[${selectedSolution.title}] ${formData.problem_statement}`
            : formData.problem_statement,
          desired_outcome: formData.desired_outcome || null,
          status: 'Reviewing',
        }]);

      if (dbError) throw dbError;

      // Send email notification
      try {
        await supabase.functions.invoke('send-consultation-notification', {
          body: {
            name: formData.name,
            email: formData.email,
            organisation: formData.organisation,
            role: formData.role,
            website_linkedin: formData.website_linkedin,
            problem_statement: selectedSolution 
              ? `[${selectedSolution.title}] ${formData.problem_statement}`
              : formData.problem_statement,
            desired_outcome: formData.desired_outcome,
          }
        });
      } catch (emailError) {
        // Log but don't fail the submission if email fails
        console.error('Email notification failed:', emailError);
      }

      setIsSubmitted(true);
      toast({
        title: "Request submitted",
        description: "We'll review your request and respond within 1 business day.",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email hello@plexapartners.com directly.",
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
      <section className="pt-32 pb-12">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6">
              Request a Consultation
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              We offer a complimentary 30-minute discovery discussion to understand your context and determine whether an engagement would be appropriate.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground/70 font-body mb-4">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Confidential
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Reviewed prior to scheduling
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                Timezone: London (GMT)
              </span>
            </div>
            
            <p className="font-body text-sm text-muted-foreground/60 italic">
              All consultation requests are reviewed to ensure alignment and relevance.
            </p>

            {selectedSolution && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <p className="font-body text-sm text-muted-foreground">
                  Enquiring about: <span className="font-medium text-foreground">{selectedSolution.title}</span>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Form Section - Primary */}
      <section className="pb-12">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 bg-tile rounded-lg border border-border/20 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  Request Submitted
                </h3>
                <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
                  We'll review your request and respond within 1 business day. If approved, you'll receive a link to schedule your consultation.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', organisation: '', role: '', website_linkedin: '', problem_statement: '', desired_outcome: '' });
                  }}
                  variant="outline"
                  className="font-body"
                >
                  Submit Another Request
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body text-sm">Full Name *</Label>
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
                    <Label htmlFor="email" className="font-body text-sm">Email Address *</Label>
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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                    <Label htmlFor="role" className="font-body text-sm">Role / Position</Label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="font-body"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website_linkedin" className="font-body text-sm">Organisation Website or LinkedIn</Label>
                  <Input
                    id="website_linkedin"
                    name="website_linkedin"
                    value={formData.website_linkedin}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem_statement" className="font-body text-sm">
                    What challenge or decision are you currently navigating? *
                  </Label>
                  <Textarea
                    id="problem_statement"
                    name="problem_statement"
                    value={formData.problem_statement}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe the key challenge or opportunity you're navigating..."
                    className="font-body resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desired_outcome" className="font-body text-sm">
                    What outcome would success look like for you? *
                  </Label>
                  <Textarea
                    id="desired_outcome"
                    name="desired_outcome"
                    value={formData.desired_outcome}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="What would success look like for you?"
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
                      Submit Consultation Request
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
