

## Admin Enhancements and Bug Fixes

This plan addresses five key areas: URL routing issue, image uploads, custom topics, AI auto-summarization, featured perspectives on homepage, and tagging functionality.

---

### Issue 1: Direct URL Navigation Loads Forever

**Problem Analysis:**
When navigating directly to `/admin` via URL (e.g., `https://pow1.carbonmediasolutions.com/admin`), the page loads indefinitely. This happens because the Supabase auth check gets stuck during initial page load when accessed directly.

**Root Cause:**
The `checkAuth` function in the Admin component makes an async call to `supabase.auth.getSession()` followed by `checkAdminRole()`. When accessing via direct URL, the auth state listener and initial session check may race, causing infinite loading.

**Solution:**
- Add proper loading state handling and timeout fallback
- Ensure the auth state is properly initialized before rendering
- Add error boundary for failed auth checks

---

### Issue 2: Image Upload for Perspectives

**Current State:**
- The `perspectives` table already has an `image` column (text, nullable)
- The perspective form does not include image upload functionality
- The PerspectiveDetail page does not display images

**Solution:**
1. Create a Supabase storage bucket `perspective-images` for storing uploaded images
2. Add image upload UI to the perspective form in Admin.tsx
3. Save the public URL to the `image` column
4. Update PerspectiveDetail.tsx to display the image (matching the BlogPost design with hero image)

**Database Changes:**
```sql
-- Create storage bucket for perspective images
INSERT INTO storage.buckets (id, name, public)
VALUES ('perspective-images', 'perspective-images', true);

-- Allow authenticated users to upload
CREATE POLICY "Admins can upload perspective images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'perspective-images' AND auth.role() = 'authenticated');

-- Allow public read access
CREATE POLICY "Public read access for perspective images"
ON storage.objects FOR SELECT
USING (bucket_id = 'perspective-images');

-- Allow admins to delete images
CREATE POLICY "Admins can delete perspective images"
ON storage.objects FOR DELETE
USING (bucket_id = 'perspective-images' AND auth.role() = 'authenticated');
```

---

### Issue 3: Custom Topic Input

**Current State:**
- Topics are limited to a fixed dropdown: `['Governance', 'Impact', 'Growth', 'Strategy', 'Risk']`
- Admin cannot type their own topic

**Solution:**
- Replace the Select dropdown with a Combobox that allows both selection from existing topics AND custom text input
- The topic field in the database is already `text` type, so it can accept any value

---

### Issue 4: AI Auto-Summarization

**Current State:**
- The summary field must be manually written
- No AI integration for auto-generating summaries

**Solution:**
1. Create a new edge function `summarize-perspective` that uses Lovable AI to generate a summary from content
2. Add a "Generate Summary" button next to the summary field
3. When clicked, send the content to the edge function and populate the summary field with the AI response

**Edge Function:**
```typescript
// supabase/functions/summarize-perspective/index.ts
// Uses Lovable AI (google/gemini-3-flash-preview) to summarize content
// Prompt: "Summarize this perspective article in 1-2 sentences for a consulting firm website. Keep it professional and concise."
```

---

### Issue 5: Featured Toggle to Homepage

**Current State:**
- The `featured` checkbox exists in the form and saves to the database
- The homepage `FeaturedPerspectives` component uses static `blogPosts` data, not the `perspectives` table
- There's no connection between admin-created perspectives and homepage featured section

**Solution:**
- Create a new homepage component `FeaturedPerspectivesFromDB` that fetches from the `perspectives` table where `featured = true`
- Alternatively, update the existing `FeaturedPerspectives` component to check BOTH static blogPosts AND database perspectives
- The component should display featured perspectives in the same visual style as the blog reference image

**Visual Style (from reference screenshot):**
- Hero image at top
- Topic badge
- Title in serif font
- Summary text
- Author avatar and name
- Tags displayed at bottom

---

### Issue 6: Tagging System

**Current State:**
- The `perspectives` table does not have a `tags` column
- BlogPost has a `tags` field that displays as badges

**Solution:**
1. Add a `tags` column to the `perspectives` table (text array)
2. Add a tag input field to the perspective form (comma-separated or tag chips)
3. Update PerspectiveDetail.tsx to display tags matching the BlogPost style

**Database Changes:**
```sql
-- Add tags column to perspectives table
ALTER TABLE perspectives ADD COLUMN tags text[] DEFAULT '{}';
```

---

### File Changes Summary

| File | Changes |
|------|---------|
| `src/pages/Admin.tsx` | Fix auth loading, add image upload, add combobox for topics, add AI summary button, add tags input |
| `src/pages/PerspectiveDetail.tsx` | Add hero image display, add tags section, add author info, match BlogPost visual style |
| `src/components/FeaturedPerspectives.tsx` | Fetch featured perspectives from database, merge with static data |
| `supabase/functions/summarize-perspective/index.ts` | New edge function for AI summarization |
| `supabase/migrations/*.sql` | Create storage bucket, add tags column |

---

### Technical Implementation Details

**1. Image Upload Component:**
```tsx
// In Admin.tsx perspective form
<Input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
/>
// Upload to storage bucket, get public URL, save to perspectiveForm.image
```

**2. Combobox for Topics:**
```tsx
// Replace Select with Combobox component
// Allow typing custom value or selecting from suggestions
// Suggestions include existing topics from database + default topics
```

**3. AI Summary Button:**
```tsx
<Button onClick={generateSummary} disabled={!perspectiveForm.content}>
  <Sparkles className="w-4 h-4 mr-2" />
  Generate Summary
</Button>
```

**4. Tags Input:**
```tsx
// Multi-tag input with chips
// Type tag and press Enter to add
// Click X on chip to remove
```

**5. Updated PerspectiveDetail Layout (matching BlogPost):**
- Back link
- Topic badge + date + read time
- Title (serif, large)
- Summary
- Author section with avatar
- Hero image (full width, rounded)
- Content paragraphs
- Tags section at bottom
- CTA section
- Related perspectives

---

### Form State Updates

Current:
```typescript
const [perspectiveForm, setPerspectiveForm] = useState({
  title: '',
  summary: '',
  topic: 'Governance',
  featured: false,
  content: ''
});
```

Updated:
```typescript
const [perspectiveForm, setPerspectiveForm] = useState({
  title: '',
  summary: '',
  topic: 'Governance',
  featured: false,
  content: '',
  image: '',      // New: image URL
  tags: [] as string[]  // New: tags array
});
```

---

### Homepage Featured Integration

The `FeaturedPerspectives` component will be updated to:
1. Fetch perspectives from database where `featured = true`
2. Combine with static blogPosts that are featured
3. Display all featured content in the existing bento grid layout
4. Perspectives link to `/perspectives/:id`, blogs link to `/blog/:id`

