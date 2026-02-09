import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const emailSchema = z.string().trim().email().max(255);

export const NewsletterSignup = ({ className = '' }: { className?: string }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase
        .from('newsletter_subscribers' as any)
        .insert({ email: result.data } as any);

      // Treat unique violation as success
      if (dbError && !dbError.message.includes('duplicate')) {
        throw dbError;
      }
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <p className={`font-body text-sm text-muted-foreground ${className}`}>
        {t('newsletter.success')}
      </p>
    );
  }

  return (
    <div className={className}>
      <p className="font-body text-sm text-muted-foreground/80 mb-3">
        {t('newsletter.label')}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
        <Input
          type="email"
          placeholder={t('newsletter.placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 text-sm"
          disabled={loading}
        />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          disabled={loading}
          className="shrink-0"
        >
          {t('newsletter.subscribe')}
        </Button>
      </form>
      {error && <p className="font-body text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
};
