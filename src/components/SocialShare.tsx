 import { Linkedin, Twitter, Facebook } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { useTranslation } from 'react-i18next';
 
 interface SocialShareProps {
   url: string;
   title: string;
 }
 
 export const SocialShare = ({ url, title }: SocialShareProps) => {
   const { i18n } = useTranslation();
   const isZh = i18n.language.startsWith('zh');
   
   const encodedUrl = encodeURIComponent(url);
   const encodedTitle = encodeURIComponent(title);
   
   const shareLinks = {
     linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
     twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
   };
   
   const openShare = (platform: keyof typeof shareLinks) => {
     window.open(shareLinks[platform], '_blank', 'width=600,height=400');
   };
   
   return (
     <div className="flex items-center gap-2">
       <span className="text-sm text-muted-foreground mr-2">
         {isZh ? '分享' : 'Share'}:
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