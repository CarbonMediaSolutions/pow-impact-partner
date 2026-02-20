

## Database-Driven Solutions with Expandable Details and Payment Links

Currently, solution cards are static (defined in `src/data/solutions.ts`) and the "Enquire" button links to `/book`. This plan makes solutions fully database-driven with support for images, PDFs, rich detail text, and external payment/checkout links -- all manageable from the Admin Dashboard.

---

### 1. Database Table: `solutions`

Create a new `solutions` table:

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | Slug identifier (e.g. "governance") |
| sort_order | integer | Display order, default 0 |
| title | text | English title |
| perspective | text | English tagline |
| description | text | English description |
| services | text[] | English service list |
| detail_content | text | Extended English description shown on expand |
| price | text | Pricing label |
| price_note | text | Pricing sub-note |
| image_url | text (nullable) | Header image for the card |
| pdf_url | text (nullable) | Downloadable PDF attachment |
| payment_link | text (nullable) | External Stripe/checkout URL |
| title_zh_hant | text | Traditional Chinese title |
| title_zh_hans | text | Simplified Chinese title |
| description_zh_hant | text | Traditional Chinese description |
| description_zh_hans | text | Simplified Chinese description |
| detail_content_zh_hant | text | Traditional Chinese detail |
| detail_content_zh_hans | text | Simplified Chinese detail |
| services_zh_hant | text[] | Traditional Chinese services |
| services_zh_hans | text[] | Simplified Chinese services |
| perspective_zh_hant | text | |
| perspective_zh_hans | text | |
| price_zh_hant | text | |
| price_zh_hans | text | |
| price_note_zh_hant | text | |
| price_note_zh_hans | text | |
| created_at | timestamptz | Auto |

RLS: Public read access, admin-only write. Seeded with the 5 existing solutions.

A `solution-assets` storage bucket (public) for images and PDFs.

---

### 2. Admin Dashboard: Solutions Tab

Add a new "Solutions" tab in the Admin page with:

- **Table view** of all solution cards (title, sort order) with Edit and Delete buttons
- **"Add Solution" button** opening a dialog with:
  - Title, Perspective, Description, Detail Content (EN / zh-Hans / zh-Hant)
  - Services list (comma-separated or one per line)
  - Price and Price Note
  - **Image upload** (displayed at top of card)
  - **PDF upload** (shown as download link)
  - **Payment link** text field (admin pastes their Stripe checkout URL)
  - Sort order
- **Delete** with confirmation

---

### 3. Solutions Page: Expandable Cards with Payment Button

Refactor `src/pages/Solutions.tsx`:

- Fetch solutions from the database instead of the static file
- The "Enquire" button becomes a **"Learn More"** toggle that expands the card inline to reveal:
  - The `detail_content` text (extended description of the service)
  - A **"Download PDF"** button if a PDF is attached
  - If a `payment_link` is set: a **"Purchase"** button linking to the external checkout URL
  - If no payment link: the original **"Request a Consultation"** button linking to `/book`
- The card expansion uses `framer-motion` for a smooth height animation
- Clicking "Learn More" again collapses the detail section

The card layout when expanded:

```text
+---------------------------+
|  [Image - if uploaded]    |
+---------------------------+
|  Title                    |
|  "Perspective tagline"    |
|  Description              |
|                           |
|  * Service 1              |
|  * Service 2              |
|                           |
|  Price / Price Note       |
|  [Learn More v]           |
+---------------------------+
|  Extended detail text...  |
|                           |
|  [Download PDF]           |
|  [Purchase] or [Enquire]  |
+---------------------------+
```

---

### 4. Files Changed

| File | Change |
|------|--------|
| New migration | Create `solutions` table, RLS, `solution-assets` bucket, seed 5 entries |
| New file: `src/components/admin/SolutionsTab.tsx` | Admin CRUD for solutions |
| `src/pages/Admin.tsx` | Register new "Solutions" tab |
| `src/pages/Solutions.tsx` | Fetch from DB, expandable cards with payment link |
| `src/data/solutions.ts` | Kept as type definition / fallback only |

