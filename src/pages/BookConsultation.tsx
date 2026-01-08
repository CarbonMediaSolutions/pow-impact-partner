import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Calendar } from 'lucide-react';
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
      const { error } = await supabase
        .from('consultation_leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          organisation: formData.organisation || null,
          role: formData.role || null,
          problem_statement: selectedSolution 
            ? `[${selectedSolution.title}] ${formData.problem_statement}`
            : formData.problem_statement,
          desired_outcome: formData.desired_outcome || null,
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Request received",
        description: "We'll be in touch shortly to schedule your consultation.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
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
              Book a Consultation
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              We offer a complimentary 30-minute discovery session to understand your challenges and explore how we might help.
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

      {/* Form Section */}
      <section className="pb-16">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="section-divider" />
            
            <h2 className="font-serif text-xl font-medium text-foreground mb-8">
              Tell us about your challenge
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
                  Request Received
                </h3>
                <p className="font-body text-muted-foreground mb-8">
                  We'll review your inquiry and be in touch within 2 business days to schedule your consultation.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', organisation: '', role: '', problem_statement: '', desired_outcome: '' });
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
                    <Label htmlFor="name" className="font-body text-sm">Name *</Label>
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
                    <Label htmlFor="email" className="font-body text-sm">Email *</Label>
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
                    <Label htmlFor="role" className="font-body text-sm">Role</Label>
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
                  <Label htmlFor="problem_statement" className="font-body text-sm">
                    What challenge are you facing? *
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
                    What outcome are you hoping for?
                  </Label>
                  <Textarea
                    id="desired_outcome"
                    name="desired_outcome"
                    value={formData.desired_outcome}
                    onChange={handleChange}
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
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Cal.com Embed Section */}
      <section className="pb-24">
        <div className="container max-w-3xl">
          <div className="section-divider" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-teal" />
              <h2 className="font-serif text-xl font-medium text-foreground">
                Or schedule directly
              </h2>
            </div>
            <p className="font-body text-muted-foreground mb-6">
              If you prefer, you can book a time directly in our calendar.
            </p>
            <Button
              asChild
              variant="outline"
              className="font-body"
            >
              <a 
                href="https://cal.com/patric-wong" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Open Calendar
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
