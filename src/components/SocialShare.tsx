import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface SocialShareProps {
  url: string;
  title: string;
  image?: string;
}

const SITE_URL = 'https://plexapartners.com';

export const SocialShare = ({ url, title, image }: SocialShareProps) => {
  const { t } = useTranslation('common');

  // Build the OG proxy URL for social crawlers
  const path = url.replace(SITE_URL, '');
  const ogUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/og-meta?path=${encodeURIComponent(path)}`;
  
  const encodedOgUrl = encodeURIComponent(ogUrl);
  const encodedTitle = encodeURIComponent(title);
  
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedOgUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedOgUrl}`
  };
  
  const openShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">
        {t('common:share')}:
      </span>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => openShare('linkedin')}
        className="hover:text-[#0077B5]"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => openShare('twitter')}
        className="hover:text-foreground"
        aria-label="Share on X"
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => openShare('facebook')}
        className="hover:text-[#1877F2]"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </Button>
    </div>
  );
};
