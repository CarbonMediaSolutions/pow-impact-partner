

## Admin-Managed Team Members with Bio Hover Cards

Two features: (1) make team member cards fully manageable from the admin dashboard, and (2) add a bio hover/click popup on the About page.

---

### 1. Database Table: `team_members`

Create a new `team_members` table to store team member data:

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (PK) | Auto-generated |
| `name` | text | English name |
| `name_zh_hant` | text | Traditional Chinese name |
| `name_zh_hans` | text | Simplified Chinese name |
| `role` | text | English title/role |
| `role_zh_hant` | text | Traditional Chinese role |
| `role_zh_hans` | text | Simplified Chinese role |
| `focus` | text | English specialities line |
| `focus_zh_hant` | text | Traditional Chinese focus |
| `focus_zh_hans` | text | Simplified Chinese focus |
| `bio` | text | English bio paragraph (2-3 sentences) |
| `bio_zh_hant` | text | Traditional Chinese bio |
| `bio_zh_hans` | text | Simplified Chinese bio |
| `image_url` | text | URL in storage bucket |
| `sort_order` | integer | Controls display order |
| `created_at` | timestamptz | Auto |

RLS: Public read access (team info is public on the About page), admin-only write access.

A new storage bucket `team-portraits` (public) will be created for portrait images.

---

### 2. Admin Dashboard: Team Members Tab

Add a new tab in the Admin page called "Team" with:

- **Table view** showing all team members (name, role, sort order) with Edit and Delete buttons
- **"Add Member" button** opening a dialog with fields for:
  - Portrait image upload (to `team-portraits` bucket)
  - Name, Role, Focus (EN / Simplified / Traditional -- 3 columns like the Site Content editor)
  - Bio (EN / Simplified / Traditional) -- textarea fields for the hover popup text
  - Sort order (number)
- **Edit** pre-fills the form with existing data
- **Delete** with confirmation prompt
- **Replace image** by uploading a new one in the edit dialog (old image gets replaced)

---

### 3. About Page: Database-Driven Team Grid with Bio Hover Card

Replace the hardcoded `teamMembers` array with a database fetch from `team_members`, ordered by `sort_order`.

For the bio interaction, the recommended approach is a **HoverCard** (desktop) that also works on **click/tap** (mobile):

- On desktop: hovering over a team member card reveals a subtle overlay/popover showing their bio, specialities, and role in more detail
- On mobile: tapping the card opens the same content (since hover doesn't exist on touch devices)
- Uses the existing Radix `HoverCard` component already in the project
- The popup appears over the portrait area with a semi-transparent background, showing the bio text
- Maintains the institutional, restrained visual tone -- no flashy animations, just a clean fade-in

The card will show:
- Name, role, and focus (as currently shown)
- On hover/tap: a popover with the full bio paragraph

Language-aware: displays `name`, `role`, `focus`, and `bio` in the correct language variant based on the active i18n language.

---

### 4. Seed Existing Team Data

After the migration creates the table, seed it with the 8 current team members (Patric, Rakesh, Peng-Li, Chiara, Gabriel, Nicole, Stephen, Mandy) using their existing portrait images from `src/assets/` uploaded to the new storage bucket, and their existing locale text from the `about.json` files.

---

### Files Modified

| File | Change |
|------|--------|
| Database migration | Create `team_members` table + RLS + storage bucket |
| `src/pages/Admin.tsx` | Add "Team" tab with CRUD UI |
| `src/pages/AboutPage.tsx` | Fetch from DB, add HoverCard bio popup |
| `src/locales/en/about.json` | No change needed (bio text stored in DB) |

### Files Not Changed
- Locale files stay as-is for other About page sections. Team member text (name, role, focus, bio) lives entirely in the database, not in locale files, since it's admin-managed.

