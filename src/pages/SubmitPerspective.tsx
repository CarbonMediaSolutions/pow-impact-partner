import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

export default function SubmitPerspective() {
  const { t } = useTranslation('submit');

  const topics = [
    { value: 'governance', labelKey: 'submit:topics.governance' },
    { value: 'impact', labelKey: 'submit:topics.impact' },
    { value: 'growth', labelKey: 'submit:topics.growth' },
    { value: 'strategy', labelKey: 'submit:topics.strategy' },
    { value: 'risk', labelKey: 'submit:topics.risk' },
    { value: 'finance', labelKey: 'submit:topics.finance' },
    { value: 'other', labelKey: 'submit:topics.other' },
  ];

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
        title: t('toast.successTitle'),
        description: t('toast.successMessage'),
      });
    } catch (error) {
      toast({
        title: t('toast.errorTitle'),
        description: t('toast.errorMessage'),
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
              {t('pageTitle')}
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              {t('pageDescription')}
            </p>
            
            {/* Reward Banner */}
            <div className="flex items-start gap-4 p-6 bg-teal/5 border border-teal/20 rounded-lg">
              <Gift className="w-6 h-6 text-teal flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                  {t('reward.title')}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {t('reward.description').split('<bold>').map((part, i) => 
                    i === 1 ? <span key={i} className="font-medium text-foreground">{part.split('</bold>')[0]}</span> : part.replace('</bold>', '')
                  )}
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
              {t('form.sectionTitle')}
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
                  {t('success.title')}
                </h3>
                <p className="font-body text-muted-foreground mb-8">
                  {t('success.message')}
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', organisation: '', perspective_text: '', topic: '' });
                  }}
                  variant="outline"
                  className="font-body"
                >
                  {t('success.submitAnother')}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body text-sm">{t('form.name')} *</Label>
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
                    <Label htmlFor="email" className="font-body text-sm">{t('form.email')} *</Label>
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
                    <Label htmlFor="organisation" className="font-body text-sm">{t('form.organisation')}</Label>
                    <Input
                      id="organisation"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      className="font-body"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body text-sm">{t('form.topic')} *</Label>
                    <Select value={formData.topic} onValueChange={handleTopicChange} required>
                      <SelectTrigger className="font-body">
                        <SelectValue placeholder={t('form.topicPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value}>
                            {t(topic.labelKey)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="perspective_text" className="font-body text-sm">
                    {t('form.perspectiveLabel')} * <span className="text-muted-foreground">{t('form.perspectiveLimit')}</span>
                  </Label>
                  <Textarea
                    id="perspective_text"
                    name="perspective_text"
                    value={formData.perspective_text}
                    onChange={handleChange}
                    required
                    rows={8}
                    placeholder={t('form.perspectivePlaceholder')}
                    className="font-body resize-none"
                  />
                  <p className="font-body text-xs text-muted-foreground">
                    {t('form.wordCount', { count: formData.perspective_text.split(/\s+/).filter(Boolean).length })}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-emerald font-body px-8"
                >
                  {isSubmitting ? (
                    <span>{t('form.submitting')}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('form.submit')}
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Guidelines */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                {t('guidelines.title')}
              </h3>
              <ul className="space-y-2">
                <li className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-teal">•</span>
                  {t('guidelines.g1')}
                </li>
                <li className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-teal">•</span>
                  {t('guidelines.g2')}
                </li>
                <li className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-teal">•</span>
                  {t('guidelines.g3')}
                </li>
                <li className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-teal">•</span>
                  {t('guidelines.g4')}
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
