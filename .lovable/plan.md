

## Database-Driven Client Logos

Move client logos from hardcoded imports to a database table, with admin CRUD support.

### 1. Database: `client_logos` table

| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Auto-generated |
| name | text | Company name (used as alt text) |
| image_url | text | Public URL from storage bucket |
| sort_order | integer | Display order, default 0 |
| created_at | timestamptz | Auto |

- RLS: public read, admin-only write
- Reuse the existing `solution-assets` bucket (or create a dedicated `client-logos` bucket)
- Seed with the 8 existing logos (upload current assets to storage)

### 2. Admin: Client Logos Tab

Add a "Client Logos" tab in Admin with:
- List of logos (thumbnail, name, sort order) with Edit/Delete
- "Add Logo" button — upload image, enter company name, set sort order
- Delete with confirmation

### 3. ClientLogos Component Refactor

- Fetch logos from `client_logos` table ordered by `sort_order`
- Remove all static image imports
- Keep the existing Embla carousel, grayscale styling, and autoplay behavior
- Show a loading skeleton while fetching

### Files Changed

| File | Change |
|------|--------|
| New migration | Create `client_logos` table, RLS, seed 8 entries |
| New: `src/components/admin/ClientLogosTab.tsx` | Admin CRUD for logos |
| `src/pages/Admin.tsx` | Register new tab |
| `src/components/ClientLogos.tsx` | Fetch from DB instead of static imports |

