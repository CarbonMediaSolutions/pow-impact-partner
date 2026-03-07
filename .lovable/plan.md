

## Three Issues to Fix

### 1. Site Share Links — Wrong URL and Missing OG Image

The `index.html` has outdated meta tags pointing to `https://p-wconsulting.com` and a generic Lovable OG image. This is why sharing shows the old site.

**Fix in `index.html`:**
- Update `og:url` and `canonical` to `https://plexapartners.com`
- Update `og:image` and `twitter:image` to a proper Plexa Partners branded OG image
- Update structured data from "Pow Consulting" to "Plexa Partners"
- Update `meta author` from "Pow Consulting" to "Plexa Partners"

**For the share image (OG image):** We need to create a simple branded OG image (1200x630px) with the Plexa Partners name on a clean background. This can be placed in `public/og-image.png` and referenced in the meta tags. Since the user wants a white Plexa Partners logo — we can create a simple text-based OG image, or the user can provide one.

### 2. White Plexa Partners Logo

This is a design asset request. Since we can't generate image files, the user would need to provide the white logo file. We can then place it in `src/assets/` or `public/` for use.

Alternatively, if the user just wants the OG share card to show "Plexa Partners" branding, we can create an SVG-based OG image or use a simple solid-color background with text rendered via an edge function.

### 3. Mobile Logo Cropping

The screenshot confirms logos are being clipped on mobile. The slides use `flex-[0_0_25%]` — showing 4 logos even on small screens where there isn't enough space.

**Fix in `src/components/ClientLogos.tsx`:**
- Change slide width to be responsive: `flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%]` (2 logos on mobile, 3 on tablet, 4 on desktop)
- Reduce `max-w-[320px]` to `max-w-[200px]` to prevent overflow
- Reduce image height on mobile from `h-24` to `h-16` for better fit

### Files to modify
- `index.html` — fix all OG/meta tags, canonical URL, structured data
- `src/components/ClientLogos.tsx` — responsive slide widths for mobile

