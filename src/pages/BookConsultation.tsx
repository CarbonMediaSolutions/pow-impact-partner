import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Shield, Clock, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(['book', 'common']);
  const [searchParams] = useSearchParams();
  const solutionId = searchParams.get('solution');
  const selectedSolution = solutionId ? solutions.find(s => s.id === solutionId) : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    role: '',
    company_website: '',
    linkedin_profile: '',
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
          website_linkedin: [formData.company_website, formData.linkedin_profile].filter(Boolean).join(' | ') || null,
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
            website_linkedin: [formData.company_website, formData.linkedin_profile].filter(Boolean).join(' | '),
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
        title: t('book:toast.successTitle'),
        description: t('book:toast.successMessage'),
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: t('book:toast.errorTitle'),
        description: t('book:toast.errorMessage'),
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
              {t('book:pageTitle')}
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              {t('book:pageDescription')}
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground/70 font-body mb-4">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                {t('book:trustIndicators.confidential')}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {t('book:trustIndicators.reviewed')}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                {t('book:trustIndicators.timezone')}
              </span>
            </div>
            
            <p className="font-body text-sm text-muted-foreground/60 italic">
              {t('book:reviewNote')}
            </p>

            {selectedSolution && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <p className="font-body text-sm text-muted-foreground">
                  {t('book:enquiringAbout')} <span className="font-medium text-foreground">{selectedSolution.title}</span>
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
                  {t('book:success.title')}
                </h3>
                <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
                  {t('book:success.message')}
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', organisation: '', role: '', company_website: '', linkedin_profile: '', problem_statement: '', desired_outcome: '' });
                  }}
                  variant="outline"
                  className="font-body"
                >
                  {t('book:success.submitAnother')}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body text-sm">{t('book:form.fullName')} *</Label>
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
                    <Label htmlFor="email" className="font-body text-sm">{t('book:form.email')} *</Label>
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
                    <Label htmlFor="organisation" className="font-body text-sm">{t('book:form.organisation')}</Label>
                    <Input
                      id="organisation"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      className="font-body"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="font-body text-sm">{t('book:form.role')}</Label>
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="font-body"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company_website" className="font-body text-sm">{t('book:form.companyWebsite')}</Label>
                    <Input
                      id="company_website"
                      name="company_website"
                      value={formData.company_website}
                      onChange={handleChange}
                      placeholder={t('book:form.companyWebsitePlaceholder')}
                      className="font-body"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin_profile" className="font-body text-sm">{t('book:form.linkedinProfile')}</Label>
                    <Input
                      id="linkedin_profile"
                      name="linkedin_profile"
                      value={formData.linkedin_profile}
                      onChange={handleChange}
                      placeholder={t('book:form.linkedinProfilePlaceholder')}
                      className="font-body"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem_statement" className="font-body text-sm">
                    {t('book:form.challengeQuestion')} *
                  </Label>
                  <Textarea
                    id="problem_statement"
                    name="problem_statement"
                    value={formData.problem_statement}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder={t('book:form.challengePlaceholder')}
                    className="font-body resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desired_outcome" className="font-body text-sm">
                    {t('book:form.outcomeQuestion')} *
                  </Label>
                  <Textarea
                    id="desired_outcome"
                    name="desired_outcome"
                    value={formData.desired_outcome}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder={t('book:form.outcomePlaceholder')}
                    className="font-body resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-emerald font-body px-8"
                >
                  {isSubmitting ? (
                    <span>{t('book:form.submitting')}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('book:form.submit')}
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
