

## Feature: Preview Links & Social Sharing

### Overview

Add two enhancements:
1. **Preview buttons in Admin panel** - Quick links to view published Perspectives and Analyses directly from the admin tables
2. **Social share buttons on detail pages** - Allow readers to share articles to LinkedIn, Twitter (X), and Facebook

---

### Part 1: Admin Preview Links

Add an "eye" icon button next to the edit/delete actions in the Perspectives and Analyses tables that opens the public article page in a new tab.

**Visual Example (Perspectives table):**

```text
| Title                                    | Topic   | Featured | Actions       |
|------------------------------------------|---------|----------|---------------|
| Founder Mental Health Isn't Just...      | Risk    | Yes      | 👁 ✏️ 🗑️      |
```

The eye icon (👁) opens `/perspectives/{id}` in a new tab.

---

### Part 2: Social Share Buttons on Detail Pages

Add share buttons after the article metadata (below the author section) on both Perspective and Analysis detail pages.

**Design:**
- Row of 3 icon buttons: LinkedIn, Twitter/X, Facebook
- Subtle styling that matches the institutional tone
- Opens native share dialogs in new windows

**Share URLs:**
- **LinkedIn**: `https://www.linkedin.com/sharing/share-offsite/?url={url}`
- **Twitter/X**: `https://twitter.com/intent/tweet?url={url}&text={title}`
- **Facebook**: `https://www.facebook.com/sharer/sharer.php?u={url}`

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Admin.tsx` | Add Eye/ExternalLink preview button to Perspectives and Analyses tables |
| `src/pages/PerspectiveDetail.tsx` | Add social share component below author section |
| `src/pages/AnalysisDetail.tsx` | Add social share component below header |
| `src/components/SocialShare.tsx` | **New** - Reusable share button component |

---

### Technical Details

**New Component: `SocialShare.tsx`**

```tsx
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialShareProps {
  url: string;
  title: string;
}

export const SocialShare = ({ url, title }: SocialShareProps) => {
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
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      <Button variant="ghost" size="sm" onClick={() => openShare('linkedin')}>
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => openShare('twitter')}>
        <Twitter className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => openShare('facebook')}>
        <Facebook className="w-4 h-4" />
      </Button>
    </div>
  );
};
```

**Admin.tsx Changes:**

Add preview button to Perspectives table (line ~1308):
```tsx
<div className="flex gap-2">
  <Button 
    variant="ghost" 
    size="sm" 
    onClick={() => window.open(`/perspectives/${perspective.id}`, '_blank')}
    title="Preview"
  >
    <Eye className="w-4 h-4" />
  </Button>
  <Button variant="ghost" size="sm" onClick={() => openEditPerspective(perspective)}>
    <Pencil className="w-4 h-4" />
  </Button>
  // ... delete button
</div>
```

Add preview button to Analyses table (line ~1483):
```tsx
<div className="flex gap-2">
  <Button 
    variant="ghost" 
    size="sm" 
    onClick={() => window.open(`/analysis/${analysis.id}`, '_blank')}
    title="Preview"
  >
    <Eye className="w-4 h-4" />
  </Button>
  <Button variant="ghost" size="sm" onClick={() => openEditAnalysis(analysis)}>
    <Pencil className="w-4 h-4" />
  </Button>
  // ... delete button
</div>
```

**PerspectiveDetail.tsx Changes:**

Add share buttons below the author section (after line ~147):
```tsx
import { SocialShare } from '@/components/SocialShare';

// Inside the component, after author section:
<SocialShare 
  url={`https://pow-impact-partner.lovable.app/perspectives/${perspective.id}`}
  title={getTitle(perspective)}
/>
```

**AnalysisDetail.tsx Changes:**

Add share buttons below the header section (after line ~147):
```tsx
import { SocialShare } from '@/components/SocialShare';

// Inside the component, after the summary:
<SocialShare 
  url={`https://pow-impact-partner.lovable.app/analysis/${analysis.id}`}
  title={getTitle(analysis)}
/>
```

---

### Visual Layout

**Perspective Detail Page:**
```text
┌─────────────────────────────────────────┐
│ ← Back to Perspectives                  │
│                                         │
│ [Topic Badge]  📅 Date  🕐 X min read   │
│                                         │
│ Article Title                           │
│                                         │
│ Summary text here...                    │
│                                         │
│ 👤 Pow Consulting Team                  │
│    Impact Partners                      │
│                                         │
│ Share: [in] [𝕏] [f]    ← NEW           │
│                                         │
│ [Featured Image]                        │
│                                         │
│ Article content...                      │
└─────────────────────────────────────────┘
```

---

### Bilingual Support

The share buttons don't require translation as they use icons only. The "Share:" label will be:
- English: "Share"
- Chinese: "分享"

---

### Implementation Summary

| Feature | Location | Component |
|---------|----------|-----------|
| Preview link (Perspectives) | Admin table | Eye icon → opens `/perspectives/{id}` |
| Preview link (Analyses) | Admin table | Eye icon → opens `/analysis/{id}` |
| Share to LinkedIn | Detail pages | SocialShare component |
| Share to Twitter/X | Detail pages | SocialShare component |
| Share to Facebook | Detail pages | SocialShare component |

