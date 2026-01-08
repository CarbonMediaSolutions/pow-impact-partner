import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Gift } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const topics = [
  { value: 'governance', label: 'Governance' },
  { value: 'impact', label: 'Impact' },
  { value: 'growth', label: 'Growth' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'risk', label: 'Risk' },
  { value: 'finance', label: 'Finance' },
  { value: 'other', label: 'Other' },
];

export default function SubmitPerspective() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    perspective_text: '',
    topic: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTopicChange = (value: string) => {
    setFormData(prev => ({ ...prev, topic: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('perspective_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          organisation: formData.organisation || null,
          perspective_text: formData.perspective_text,
          topic: formData.topic,
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Perspective received",
        description: "Thank you for sharing your insight. We review all submissions monthly.",
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
              Share Your Perspective
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              We believe the best insights come from leaders in the field. Share your perspective on governance, impact, strategy, or growth—and contribute to the conversation.
            </p>
            
            {/* Reward Banner */}
            <div className="flex items-start gap-4 p-6 bg-teal/5 border border-teal/20 rounded-lg">
              <Gift className="w-6 h-6 text-teal flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                  Monthly Reward
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Each month, we select the most compelling perspective and award its author a <span className="font-medium text-foreground">£100 Amazon voucher</span>. Selected perspectives may also be featured in our publications.
                </p>
              </div>
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
              Your Perspective
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
                  Thank You
                </h3>
                <p className="font-body text-muted-foreground mb-8">
                  Your perspective has been received. We review all submissions monthly and will be in touch if your insight is selected for publication or the monthly reward.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', organisation: '', perspective_text: '', topic: '' });
                  }}
                  variant="outline"
                  className="font-body"
                >
                  Submit Another Perspective
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
                    <Label className="font-body text-sm">Topic *</Label>
                    <Select value={formData.topic} onValueChange={handleTopicChange} required>
                      <SelectTrigger className="font-body">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value}>
                            {topic.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="perspective_text" className="font-body text-sm">
                    Your Perspective * <span className="text-muted-foreground">(max 500 words)</span>
                  </Label>
                  <Textarea
                    id="perspective_text"
                    name="perspective_text"
                    value={formData.perspective_text}
                    onChange={handleChange}
                    required
                    rows={8}
                    placeholder="Share your insight, observation, or point of view on a challenge facing organisations today..."
                    className="font-body resize-none"
                  />
                  <p className="font-body text-xs text-muted-foreground">
                    {formData.perspective_text.split(/\s+/).filter(Boolean).length} / 500 words
                  </p>
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
                      Submit Perspective
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Guidelines */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                Submission Guidelines
              </h3>
              <ul className="space-y-2">
                <li className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-teal">•</span>
                  Focus on a specific insight, challenge, or opportunity
                </li>
                <li className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-teal">•</span>
                  Draw from real experience where possible
                </li>
                <li className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-teal">•</span>
                  Be concise and actionable
                </li>
                <li className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-teal">•</span>
                  Original content only
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
