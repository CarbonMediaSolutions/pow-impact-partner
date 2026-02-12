import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface GatedDownloadProps {
  pdfUrl: string;
  title: string;
  source: string;
}

const STORAGE_KEY = 'plexa_email_captured';

export const GatedDownload = ({ pdfUrl, title, source }: GatedDownloadProps) => {
  const { t } = useTranslation('common');
  const [hasAccess, setHasAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const captured = localStorage.getItem(STORAGE_KEY);
    if (captured) setHasAccess(true);
  }, []);

  const handleDownload = () => {
    if (hasAccess) {
      window.open(pdfUrl, '_blank');
    } else {
      setShowModal(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('email_captures').insert([{ 
        email, 
        name: name || null, 
        source 
      }]);
      
      if (error) throw error;
      
      localStorage.setItem(STORAGE_KEY, 'true');
      setHasAccess(true);
      setShowModal(false);
      window.open(pdfUrl, '_blank');
      toast.success(t('common:download.started'));
    } catch {
      toast.error(t('common:download.tryAgain'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={handleDownload} className="gap-2">
        <Download className="w-4 h-4" />
        {t('common:download.fullReport')}
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('common:download.reportTitle')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('common:download.contactPrompt')}
            </p>
            <div className="space-y-2">
              <Label htmlFor="gated-name">{t('common:download.name')}</Label>
              <Input 
                id="gated-name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder={t('common:download.namePlaceholder')} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gated-email">{t('common:download.emailRequired')}</Label>
              <Input 
                id="gated-email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="you@company.com" 
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting 
                ? t('common:download.processing')
                : t('common:download.getReport')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
