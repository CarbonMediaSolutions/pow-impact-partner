

## Add Vincit-Lee Lloyd and Nishopan Karunanithy to the Leadership Team

### 1. Copy portrait images to project assets
- Copy `user-uploads://image-2.png` to `src/assets/vincit-portrait.png`
- Copy `user-uploads://image-3.png` to `src/assets/nishopan-portrait.png`

### 2. Database migration: Insert two new team members

Insert into `team_members` table with the following data:

**Vincit-Lee Lloyd**
- name: "Vincit-Lee Lloyd"
- role: "Director"
- focus: "Digital Architecture · UX Systems · Conversion Strategy"
- bio: Full bio text (two paragraphs about UI/UX architecture, MBA, front-end systems, conversion optimisation)
- sort_order: 8 (after Mandy Wong)

**Nishopan Karunanithy**
- name: "Nishopan Karunanithy"
- role: "Tax Advisory Partner"
- focus: "Tax Strategy · Structuring · International Tax"
- bio: Full bio text (two paragraphs about tax advisory, CTA/ATT credentials, Big 4 experience)
- sort_order: 9

Chinese translation fields left empty (fallback to English).

### 3. Update `src/pages/AboutPage.tsx`
- Import the two new portrait images
- Add fallback portrait entries for both names

### Files changed

| File | Change |
|------|--------|
| `src/assets/vincit-portrait.png` | New (copied from upload) |
| `src/assets/nishopan-portrait.png` | New (copied from upload) |
| New migration | INSERT 2 team members |
| `src/pages/AboutPage.tsx` | Add fallback portrait imports and mappings |

