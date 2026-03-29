

## Plan: Social Sharing Fixes + Homepage Performance Optimisation

This covers two areas: (A) fixing social sharing for perspectives/analyses, and (B) a comprehensive homepage performance pass. No visual changes.

---

### A. Social Sharing Fixes

**Problem**: When sharing a perspective or analysis on LinkedIn/Twitter/Facebook, the shared link shows the generic site og:image and metadata instead of the post's own image and title. This is because Open Graph meta tags are set statically in `index.html` and never updated per-page. Also, the Twitter share URL currently points to the `pow-impact-partner.lovable.app` domain (Lovable branding).

**Solution**: Since this is a client-side SPA, social crawlers (LinkedIn, Facebook, Twitter) do not execute JavaScript — they only read the initial HTML. The only reliable way to get per-page OG tags is server-side rendering. We will use a **backend function** that acts as an OG metadata proxy:

1. **Create a backend function `og-meta`** — When called with a path like `/perspectives/:id` or `/analysis/:id`, it queries the database for the post's title, summary, and image, then returns an HTML page with the correct `og:title`, `og:description`, `og:image`, and `og:url` meta tags plus a JavaScript redirect to the real SPA page.

2. **Update `SocialShare.tsx`** — Change share URLs to use `https://plexapartners.com` (not `pow-impact-partner.lovable.app`). Pass the post's image URL as a new prop so it can be included in the share URL parameters. Remove any Lovable branding from the Twitter/X share text.

3. **Update `PerspectiveDetail.tsx` and `AnalysisDetail.tsx`** — Pass the post's `image` to `SocialShare` as a new prop.

---

### B. Homepage Performance Optimisation

**1. Vite build config** — `vite.config.ts`
- Add `build.rollupOptions.output.manualChunks` to split `react`, `react-dom`, `framer-motion`, `@tanstack/react-query`, `react-router-dom` into a `vendor` chunk
- Set `build.cssCodeSplit: true` and `build.chunkSizeWarningLimit: 1000`

**2. Lazy load all routes** — `src/App.tsx`
- Convert every page import except `Index` to `React.lazy()`
- Wrap `<Routes>` in `<Suspense fallback={...}>`

**3. Lazy load below-fold homepage sections** — `src/pages/Index.tsx`
- The Hero is above the fold — keep eagerly loaded
- Lazy-load: `ThreePillars`, `FeaturedPerspectives`, `InsightLed`, `CaseStudies`, `ClientLogos`, `FinalCTA` using `React.lazy` + `Suspense`

**4. Image optimisation** — `src/components/ClientLogos.tsx`, `FeaturedPerspectives.tsx`
- Add `loading="lazy"`, `width`, and `height` attributes to all `<img>` tags in below-fold components

**5. No loading spinner delay found** — The codebase has no artificial splash screen or setTimeout delay on the homepage. No changes needed.

**6. Font preloading** — `index.html`
- Fonts are loaded via `@fontsource` (bundled, not Google Fonts), so no preconnect needed. No changes required here — Vite handles these as local imports.

**7. Preload hero assets** — The hero section is text-only (no background image). The logo in the Header (`logo.png`) is the only critical image. Add `<link rel="preload" as="image">` for it in `index.html` if the Vite asset hash is stable, otherwise skip (Vite hashes asset filenames).

**8. Audit unused imports** — `src/pages/Index.tsx` and its components
- All current imports in `Index.tsx` are used. Will check each component for dead imports and remove any found.

---

### Files to create/edit

| File | Change |
|---|---|
| `supabase/functions/og-meta/index.ts` | New backend function for OG meta tags |
| `src/components/SocialShare.tsx` | Use `plexapartners.com` domain, accept `image` prop, remove Lovable branding from Twitter text |
| `src/pages/PerspectiveDetail.tsx` | Pass `image` to SocialShare |
| `src/pages/AnalysisDetail.tsx` | Pass `image` to SocialShare |
| `vite.config.ts` | Add build optimisation config |
| `src/App.tsx` | Lazy load all routes except Index |
| `src/pages/Index.tsx` | Lazy load below-fold sections |
| `src/components/ClientLogos.tsx` | Add `loading="lazy"` + dimensions to img |
| `src/components/FeaturedPerspectives.tsx` | Add `loading="lazy"` + dimensions to img |
| `index.html` | Add font preload hints if applicable |

