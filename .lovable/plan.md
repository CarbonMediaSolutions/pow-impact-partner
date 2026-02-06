

## Admin CMS: Editable Site Content (Page by Page)

### Overview

Add a new "Site Content" tab to the Admin Dashboard that lets the admin edit all website text -- organised by page and section. Changes are stored in the database and override the default translations at runtime, for both English and Traditional Chinese.

### How It Works

The site currently uses static JSON translation files for all text. This feature adds a **database override layer**:

1. A new `site_content` table stores any admin-edited text
2. When the site loads, it fetches overrides from the database and merges them on top of the default JSON translations
3. The admin sees a clean, page-by-page editor with expandable sections

This means: the static JSON files remain as **defaults** -- the admin only needs to edit what they want to change.

### What the Admin Will See

A new **"Site Content"** tab in the Admin Dashboard with:

- A **page selector** across the top (Home, About, Common, Solutions, etc.)
- Each page shows **collapsible sections** (e.g. Hero, Three Pillars, Engagements)
- Each section displays labelled text fields (inputs for short text, textareas for longer text)
- Side-by-side **English** and **Chinese** columns
- A **Save** button per section
- A **Reset to Default** option to clear overrides and revert to the original text

```text
 ┌─────────────────────────────────────────────────────────┐
 │ Admin Dashboard                                         │
 ├─────────────────────────────────────────────────────────┤
 │ [Leads] [Perspectives] [Analyses] [...] [Site Content]  │
 ├─────────────────────────────────────────────────────────┤
 │                                                         │
 │  Page: [Home v]                                         │
 │                                                         │
 │  ▼ Hero Section                                         │
 │  ┌───────────────────┬───────────────────┐              │
 │  │ EN                │ ZH                │              │
 │  ├───────────────────┼───────────────────┤              │
 │  │ Headline          │ 標題              │              │
 │  │ [_______________] │ [_______________] │              │
 │  │ Headline Line 2   │ 標題第二行        │              │
 │  │ [_______________] │ [_______________] │              │
 │  │ Subheadline       │ 副標題            │              │
 │  │ [_______________] │ [_______________] │              │
 │  └───────────────────┴───────────────────┘              │
 │                          [Reset to Default] [Save]      │
 │                                                         │
 │  ► Three Pillars                                        │
 │  ► Strategic Themes                                     │
 │  ► Selected Engagements                                 │
 │  ► FAQ                                                  │
 └─────────────────────────────────────────────────────────┘
```

### Pages and Sections Covered

| Page | Sections |
|------|----------|
| **Home** | Hero, How We Work (Three Pillars), Strategic Themes, Selected Engagements, FAQ |
| **About** | Hero, How We Think (People/Planet/Performance), The Firm, Leadership Team, Professional Standards, Client Perspectives, Closing CTA |
| **Common** | Navigation, Brand, Footer, CTAs, Credentials, Client Logos Label |
| **Solutions** | Page Title/Description, How We Work With You |
| **Perspectives** | Page Title/Subtitle/Description, Newsletter, Topics |
| **Data and Analysis** | Page Title/Subtitle/Description, Data and Benchmarks, Categories |
| **Consultation** | Page Title/Description, Trust Indicators, Form Labels, Success Messages |
| **Submit Perspective** | Page Title/Description, Reward, Form Labels, Guidelines, Topics |

### Technical Details

#### 1. New Database Table: `site_content`

```sql
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,        -- e.g. "home", "about", "common"
  section_key text NOT NULL,  -- e.g. "hero.headline", "pillars.sectionTitle"
  value_en text NOT NULL DEFAULT '',
  value_zh text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(page, section_key)
);
```

RLS policies:
- **Anyone can read** (content needs to be publicly visible)
- **Only admins can insert/update/delete**

#### 2. Content Provider (`src/hooks/useSiteContent.ts`)

A custom hook that:
- Fetches all rows from `site_content` on app load
- Merges overrides into the i18n resource bundles using `i18n.addResourceBundle()`
- Provides a loading state so the app can wait before rendering

This hook will be called once in `App.tsx` via a `<SiteContentProvider>` wrapper component.

#### 3. Admin UI (`src/components/admin/SiteContentEditor.tsx`)

A new component rendered inside the "Site Content" tab:
- Uses a `Select` dropdown for page selection
- Renders sections using `Collapsible` (accordion-style)
- Each field is an `Input` (for short text) or `Textarea` (for multi-line text like descriptions, FAQ answers)
- Side-by-side EN/ZH columns using a 2-column grid
- Section-level save button that upserts all fields in that section to `site_content`
- "Reset to Default" button that deletes the overrides for that section, reverting to the JSON defaults

#### 4. Content Field Schema (`src/data/siteContentSchema.ts`)

A static schema file that defines which fields exist for each page/section, their labels, and whether they are short (input) or long (textarea). This drives the admin UI rendering.

Example structure:
```typescript
export const siteContentSchema = {
  home: {
    label: 'Home',
    sections: {
      hero: {
        label: 'Hero Section',
        fields: [
          { key: 'hero.headline', label: 'Headline', type: 'input' },
          { key: 'hero.headlineLine2', label: 'Headline Line 2', type: 'input' },
          { key: 'hero.subheadline', label: 'Subheadline', type: 'textarea' },
          { key: 'hero.description', label: 'Description', type: 'textarea' },
        ]
      },
      pillars: {
        label: 'How We Work',
        fields: [
          { key: 'pillars.sectionTitle', label: 'Section Title', type: 'input' },
          // ...
        ]
      }
    }
  }
};
```

#### 5. App.tsx Integration

Wrap the app with a `SiteContentProvider` that fetches overrides before rendering routes:

```tsx
<SiteContentProvider>
  <BrowserRouter>
    <Routes>...</Routes>
  </BrowserRouter>
</SiteContentProvider>
```

### Files to Create

| File | Purpose |
|------|---------|
| `src/data/siteContentSchema.ts` | Schema defining all editable fields per page/section |
| `src/components/admin/SiteContentEditor.tsx` | Admin UI for editing site content |
| `src/hooks/useSiteContent.ts` | Hook to fetch and merge DB overrides into i18n |
| `src/components/SiteContentProvider.tsx` | Provider component for App.tsx |

### Files to Modify

| File | Change |
|------|--------|
| `src/pages/Admin.tsx` | Add "Site Content" tab |
| `src/App.tsx` | Wrap with `SiteContentProvider` |

### Database Changes

| Change | Details |
|--------|---------|
| New table `site_content` | Stores admin text overrides |
| RLS policies | Public read, admin-only write |
| Trigger | Auto-update `updated_at` on changes |

