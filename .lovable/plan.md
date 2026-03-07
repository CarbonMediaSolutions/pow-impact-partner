

## Autogenerate Privacy Policy and Terms of Service Pages

### What
Create two new pages — `/privacy` and `/terms` — with professionally written legal content appropriate for Plexa Partners (an independent advisory firm based in London, UK). Update the footer links to point to these pages.

### Pages to create

**1. `src/pages/Privacy.tsx`**
- Standard privacy policy covering: data collection, use of cookies, third-party services, data retention, user rights (GDPR-aligned given UK base), contact information (hello@plexapartners.com)
- Uses the same page layout pattern as other pages (Header + Footer)
- Institutional tone consistent with the brand

**2. `src/pages/Terms.tsx`**
- Standard terms of service covering: acceptance of terms, services description, intellectual property, limitation of liability, governing law (England and Wales), contact information
- Same layout pattern

### Files to modify

**3. `src/App.tsx`** — Add routes for `/privacy` and `/terms`

**4. `src/components/Footer.tsx`** — Change `<a href="#">` links to `<Link to="/privacy">` and `<Link to="/terms">`

### Design
- Both pages use a clean, single-column layout with the Header and Footer
- Content structured with clear section headings
- Last updated date displayed at the top
- No translations needed initially (legal pages typically stay in English)

