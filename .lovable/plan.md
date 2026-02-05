

## Feature: PDF Upload for Analyses with Gated Download

### Overview

Add the ability to upload PDFs to analyses in the admin panel, and allow visitors to download the PDF only after providing their email address (using the existing email gate pattern).

---

### Database Changes

Add a new `pdf_url` column to the `analyses` table to store the URL of the uploaded PDF.

```sql
ALTER TABLE public.analyses ADD COLUMN pdf_url text;
```

---

### Storage Changes

Create a new storage bucket for analysis PDFs with appropriate RLS policies:

```sql
-- Create bucket for analysis PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('analysis-pdfs', 'analysis-pdfs', true);

-- Allow authenticated users to upload PDFs
CREATE POLICY "Authenticated users can upload analysis PDFs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'analysis-pdfs');

-- Allow public read access
CREATE POLICY "Public can view analysis PDFs"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'analysis-pdfs');
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Admin.tsx` | Add PDF upload field to analysis form, PDF upload handler, save PDF URL |
| `src/pages/AnalysisDetail.tsx` | Add gated PDF download button |
| `src/components/EmailGate.tsx` | Create variant or wrapper for download-specific gating |

---

### Admin Panel Changes

**1. Add PDF upload state:**
```typescript
const [pdfUploading, setPdfUploading] = useState(false);
```

**2. Update analysis form state:**
```typescript
const [analysisForm, setAnalysisForm] = useState({
  // ... existing fields
  pdfUrl: ''  // new field
});
```

**3. Add PDF upload handler:**
```typescript
const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  if (file.type !== 'application/pdf') {
    toast.error('Please upload a PDF file');
    return;
  }
  
  if (file.size > 20 * 1024 * 1024) {
    toast.error('PDF must be less than 20MB');
    return;
  }
  
  setPdfUploading(true);
  
  try {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`;
    
    const { data, error } = await supabase.storage
      .from('analysis-pdfs')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('analysis-pdfs')
      .getPublicUrl(fileName);
    
    setAnalysisForm(prev => ({ ...prev, pdfUrl: publicUrl }));
    toast.success('PDF uploaded successfully');
  } catch (err) {
    toast.error('Failed to upload PDF');
  } finally {
    setPdfUploading(false);
  }
};
```

**4. Add PDF upload UI to analysis form (after the Implications field):**
```tsx
<div className="space-y-2">
  <Label>PDF Report (optional)</Label>
  <div className="border-2 border-dashed rounded-lg p-4">
    {analysisForm.pdfUrl ? (
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground truncate">
          PDF uploaded
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setAnalysisForm(prev => ({ ...prev, pdfUrl: '' }))}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    ) : (
      <label className="cursor-pointer flex flex-col items-center">
        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
        <span className="text-sm text-muted-foreground">
          {pdfUploading ? 'Uploading...' : 'Click to upload PDF'}
        </span>
        <input
          type="file"
          accept=".pdf"
          onChange={handlePdfUpload}
          className="hidden"
          disabled={pdfUploading}
        />
      </label>
    )}
  </div>
</div>
```

**5. Update saveAnalysis to include pdf_url:**
```typescript
const data = {
  // ... existing fields
  pdf_url: analysisForm.pdfUrl || null
};
```

---

### Customer-Facing Download

On the AnalysisDetail page, add a download button that appears only when a PDF exists. The download is gated behind email capture.

**New Component: `GatedDownload.tsx`**

```tsx
import { useState, useEffect } from 'react';
import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GatedDownloadProps {
  pdfUrl: string;
  title: string;
  source: string;
}

const STORAGE_KEY = 'plexa_email_captured';

export const GatedDownload = ({ pdfUrl, title, source }: GatedDownloadProps) => {
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
      await supabase.from('email_captures').insert([{ email, name: name || null, source }]);
      localStorage.setItem(STORAGE_KEY, 'true');
      setHasAccess(true);
      setShowModal(false);
      window.open(pdfUrl, '_blank');
      toast.success('Download started');
    } catch {
      toast.error('Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={handleDownload} className="gap-2">
        <Download className="w-4 h-4" />
        Download Full Report
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Report</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com" />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Processing...' : 'Get Report'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
```

---

### AnalysisDetail Page Update

Add the download button in the header section (after social share):

```tsx
import { GatedDownload } from '@/components/GatedDownload';

// In the Analysis interface, add:
pdf_url?: string | null;

// In the header section, after SocialShare:
{analysis.pdf_url && (
  <div className="mt-6">
    <GatedDownload 
      pdfUrl={analysis.pdf_url}
      title={getTitle(analysis)}
      source={`analysis-pdf-${analysis.id}`}
    />
  </div>
)}
```

---

### Visual Layout

**Admin Form (Analysis):**
```text
┌─────────────────────────────────────────┐
│ Title: [                              ] │
│ Summary: [                            ] │
│ Category: [Dropdown] | Year: [2025   ] │
│ ☐ Featured                              │
│ Introduction: [                       ] │
│ Methodology: [                        ] │
│ Key Findings: [                       ] │
│ Implications: [                       ] │
│                                         │
│ PDF Report (optional)                   │
│ ┌─────────────────────────────────────┐ │
│ │  📄 Click to upload PDF             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Create Analysis]                       │
└─────────────────────────────────────────┘
```

**Customer View (Analysis Detail):**
```text
┌─────────────────────────────────────────┐
│ ← Back to Analysis                      │
│                                         │
│ GOVERNANCE · 2025                       │
│                                         │
│ Analysis Title                          │
│                                         │
│ Summary text...                         │
│                                         │
│ Share: [in] [𝕏] [f]                     │
│                                         │
│ [📥 Download Full Report]   ← NEW       │
│                                         │
│ (Article content - email gated)         │
└─────────────────────────────────────────┘
```

---

### Implementation Summary

| Component | Change |
|-----------|--------|
| Database | Add `pdf_url` column to `analyses` table |
| Storage | Create `analysis-pdfs` bucket with RLS |
| Admin.tsx | PDF upload field, handler, form state |
| GatedDownload.tsx | New component for email-gated downloads |
| AnalysisDetail.tsx | Integrate download button when PDF exists |

---

### Bilingual Support

Download button text:
- English: "Download Full Report"
- Chinese: "下載完整報告"

Email gate modal:
- English: "Download Report" / "Get Report"
- Chinese: "下載報告" / "獲取報告"

