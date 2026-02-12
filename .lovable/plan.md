

## Three Updates

### 1. Remove Static Template Data

Delete the hardcoded template content from two files:

- **`src/data/perspectives.ts`** -- Remove all 6 static perspectives from the array (keep the interface and empty array so imports don't break). The Perspectives page will now show only database-sourced content.
- **`src/data/blogPosts.ts`** -- Remove all 8 static blog posts from the array (keep the interface and empty array). These are the template "Perspective" tiles appearing on the homepage and blog pages.

This means the homepage Featured Perspectives section and the /perspectives page will be driven entirely by the database.

### 2. Featured Perspectives on Homepage -- Database Only

The `FeaturedPerspectives` component currently merges static blogPosts with DB perspectives. After removing the static data, it will rely purely on perspectives marked `featured: true` in the database.

- Update `src/components/FeaturedPerspectives.tsx` to remove the static blogPost merging logic and source exclusively from the `perspectives` table where `featured = true`.
- The admin panel already has a "Featured" checkbox when creating/editing perspectives, so no admin changes are needed.

### 3. Make Client Logos 3-4x Larger

In `src/components/ClientLogos.tsx`:

- Increase logo height from `h-8 sm:h-10` to approximately `h-24 sm:h-32` (3-4x bigger)
- Increase max-width from `max-w-[120px]` to `max-w-[320px]`
- Increase container max-width to accommodate larger logos
- Adjust padding between slides

### Technical Details

**Files to modify:**
- `src/data/perspectives.ts` -- empty the array
- `src/data/blogPosts.ts` -- empty the array
- `src/components/FeaturedPerspectives.tsx` -- remove blogPosts dependency, use only DB perspectives
- `src/components/ClientLogos.tsx` -- scale up logo sizes ~3-4x

No database changes needed. The admin "Featured" toggle already exists and controls which perspectives appear in the homepage featured section.

