

## Multi-Language Overhaul: EN / Simplified Chinese / Traditional Chinese

This is a significant update touching the language system, database schema, UI components, and admin editor. Here is the full breakdown.

---

### 1. Language Switcher -- Dropdown with 3 Options

Replace the current EN|中文 toggle button with a dropdown menu offering:
- **English**
- **简体中文** (Simplified Chinese)
- **繁體中文** (Traditional Chinese)

**File:** `src/components/LanguageSwitcher.tsx`

Uses the existing Radix dropdown component. Language codes will be `en`, `zh-Hans`, and `zh-Hant`.

---

### 2. Split Chinese Locale Files into Simplified + Traditional

Currently there is one `zh` locale. This will become two:

- **`src/locales/zh-Hant/`** -- Traditional Chinese (copy existing `zh` files as-is, since all current translations are already Traditional)
- **`src/locales/zh-Hans/`** -- Simplified Chinese (new files, initially machine-converted from Traditional or left as copies with a plan to refine)

New files to create (8 per locale):
- `common.json`, `home.json`, `about.json`, `solutions.json`, `perspectives.json`, `analysis.json`, `book.json`, `submit.json`

**File:** `src/i18n/config.ts` -- Updated to import and register all three locales (`en`, `zh-Hans`, `zh-Hant`), update `fallbackLng`, and namespace config.

---

### 3. Fix Solution Cards Not Translating

The Solutions page renders cards directly from `src/data/solutions.ts` using hardcoded English strings (title, description, services, etc.). These never respond to language changes.

**Fix:** Add i18n translation keys for each solution card's content. Add corresponding entries in all three locale files (`en/solutions.json`, `zh-Hans/solutions.json`, `zh-Hant/solutions.json`).

**File:** `src/pages/Solutions.tsx` -- Replace `solution.title`, `solution.description`, etc. with `t()` calls using keys like `solutions:cards.governance.title`.

**File:** `src/locales/en/solutions.json`, `zh-Hant/solutions.json`, `zh-Hans/solutions.json` -- Add card content translations.

---

### 4. Fix FeaturedPerspectives Not Translating Titles

The homepage FeaturedPerspectives component fetches `title` from the database but ignores `title_zh`. When switching to Chinese, titles stay in English.

**Fix:** Fetch `title_zh` as well. Use a helper that selects the right title based on the current language.

**File:** `src/components/FeaturedPerspectives.tsx` -- Add `title_zh` to the select query, use language-aware display.

---

### 5. Database Schema Update -- Add Simplified Chinese Columns

Currently the database has `title_zh`, `summary_zh`, `content_zh` on perspectives and analyses tables (Traditional Chinese). Need to add Simplified Chinese columns and update `site_content`.

**Migration adds:**
- `perspectives`: `title_zh_hans`, `summary_zh_hans`, `content_zh_hans`
- `analyses`: `title_zh_hans`, `summary_zh_hans`, `content_zh_hans`
- `site_content`: `value_zh_hans` column (for Simplified), rename conceptually: existing `value_zh` becomes Traditional

---

### 6. Admin Editor -- 3 Language Columns

Update the Site Content Editor to show three columns: EN, Simplified Chinese, Traditional Chinese. This will require horizontal scrolling on smaller screens.

**File:** `src/components/admin/SiteContentEditor.tsx`
- Change the field rendering from 2-column to 3-column grid
- Labels: `(EN)`, `(简体)`, `(繁體)`
- Map to `value_en`, `value_zh_hans`, `value_zh` (existing `value_zh` = Traditional)

---

### 7. Update SiteContentProvider for 3 Locales

The `useSiteContent` hook currently merges overrides into `en` and `zh` bundles. Update to merge into `en`, `zh-Hans`, and `zh-Hant`.

**File:** `src/hooks/useSiteContent.ts` -- Add `zh-Hans` override processing using `value_zh_hans`, keep `zh-Hant` using existing `value_zh`.

---

### 8. Update Translate Edge Function

The `translate-content` function currently produces Traditional Chinese only. Update to produce both Simplified and Traditional, or accept a target language parameter.

**File:** `supabase/functions/translate-content/index.ts` -- Accept optional `targetLang` parameter, default to producing both variants.

---

### 9. Audit All Pages for Untranslated Strings

Scan all page components for hardcoded English strings that bypass the i18n system:
- Error messages in toast calls (e.g., "Error", "Something went wrong")
- Analysis category filters using raw English strings from `analysisCategories`
- Any inline text not wrapped in `t()`

Fix each instance to use translation keys.

---

### Summary of Files Modified

| File | Change |
|------|--------|
| `src/components/LanguageSwitcher.tsx` | Dropdown with 3 options |
| `src/i18n/config.ts` | Register zh-Hans + zh-Hant locales |
| `src/locales/zh-Hant/*.json` (8 files) | New directory, copy from existing zh |
| `src/locales/zh-Hans/*.json` (8 files) | New directory, Simplified Chinese |
| `src/locales/en/solutions.json` | Add card content keys |
| `src/pages/Solutions.tsx` | Use t() for card content |
| `src/components/FeaturedPerspectives.tsx` | Fetch and display title_zh |
| `src/hooks/useSiteContent.ts` | Support 3 locales |
| `src/components/admin/SiteContentEditor.tsx` | 3-column layout |
| `src/data/siteContentSchema.ts` | No change needed |
| `supabase/functions/translate-content/index.ts` | Support both Chinese variants |
| Database migration | Add zh_hans columns |

