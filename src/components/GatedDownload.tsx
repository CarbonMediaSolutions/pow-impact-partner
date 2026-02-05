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
   const { i18n } = useTranslation();
   const isZh = i18n.language === 'zh';
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
       toast.success(isZh ? '下載已開始' : 'Download started');
     } catch {
       toast.error(isZh ? '請再試一次' : 'Please try again');
     } finally {
       setIsSubmitting(false);
     }
   };
 
   return (
     <>
       <Button onClick={handleDownload} className="gap-2">
         <Download className="w-4 h-4" />
         {isZh ? '下載完整報告' : 'Download Full Report'}
       </Button>
 
       <Dialog open={showModal} onOpenChange={setShowModal}>
         <DialogContent className="sm:max-w-md">
           <DialogHeader>
             <DialogTitle>{isZh ? '下載報告' : 'Download Report'}</DialogTitle>
           </DialogHeader>
           <form onSubmit={handleSubmit} className="space-y-4">
             <p className="text-sm text-muted-foreground">
               {isZh 
                 ? '請提供您的聯繫方式以下載完整報告。' 
                 : 'Please provide your contact details to download the full report.'}
             </p>
             <div className="space-y-2">
               <Label htmlFor="gated-name">{isZh ? '姓名' : 'Name'}</Label>
               <Input 
                 id="gated-name"
                 value={name} 
                 onChange={(e) => setName(e.target.value)} 
                 placeholder={isZh ? '您的姓名' : 'Your name'} 
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="gated-email">{isZh ? '電子郵件 *' : 'Email *'}</Label>
               <Input 
                 id="gated-email"
                 type="email" 
                 value={email} 
                 onChange={(e) => setEmail(e.target.value)} 
                 required 
                 placeholder={isZh ? 'you@company.com' : 'you@company.com'} 
               />
             </div>
             <Button type="submit" disabled={isSubmitting} className="w-full">
               {isSubmitting 
                 ? (isZh ? '處理中...' : 'Processing...') 
                 : (isZh ? '獲取報告' : 'Get Report')}
             </Button>
           </form>
         </DialogContent>
       </Dialog>
     </>
   );
 };