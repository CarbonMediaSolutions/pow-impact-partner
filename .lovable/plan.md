

## Issues and Plan

### 1. Perspective not translating

Some perspectives may not have `title_zh`, `summary_zh`, `content_zh` (Traditional) or their `_zh_hans` (Simplified) counterparts populated in the database. The translation logic in `Perspectives.tsx` and `PerspectiveDetail.tsx` falls back to English when these fields are null, which is correct behavior. The fix is to ensure the admin auto-translate function is triggered for the missing perspective, or to add a fallback indicator. However, the more likely code-level issue: **the Perspectives list page doesn't fetch `content_zh_hans`** fields — but the list page only needs title/summary. The real problem is likely that one perspective was created without running the auto-translate.

**Action**: No code fix needed for this — it's a data issue. You need to go to Admin > Perspectives, find the untranslated one, and click the translate button. If you want, I can add a visual indicator showing which perspectives are missing translations.

### 2. Analysis page Chinese translation problems

From screenshot (image-8), the Simplified Chinese Analysis page shows "測試 2" — which uses Traditional Chinese characters, not Simplified. This indicates the analysis entry was saved with Traditional Chinese in the `title_zh_hans` field (or it's falling back to `title_zh`). The `getTitle` logic for `zh-Hans` is: `a.title_zh_hans || a.title_zh || a.title` — so if `title_zh_hans` is empty, it falls back to Traditional Chinese `title_zh`, which explains the mixed characters.

Additionally, the Analysis list page categories may be missing some translation keys. The `analysisCategories` array (from `src/data/analyses.ts`) may include categories like "Growth", "Risk", "Strategy" that have translation keys in the locale files but may not be in the `categoryKeyMap`.

**Actions**:
- Add missing category keys (`growth`, `risk`, `strategy`) to the `categoryKeyMap` in `Analysis.tsx`
- This is also partly a data issue — ensure analyses are translated with the correct character set via the admin translate button

### 3. LinkedIn link and email editability via admin

Currently, the LinkedIn URL (`https://linkedin.com`) and email (`hello@plexapartners.com`) are **hardcoded** in `Footer.tsx`. They are NOT in the Site Content CMS schema, so they cannot be edited via the admin dashboard.

**Actions**:
- Add `footer.email` and `footer.linkedinUrl` fields to the `siteContentSchema.ts` under the `common > footer` section
- Update `Footer.tsx` to read these values from the CMS (with hardcoded defaults as fallback)
- Add corresponding default values to all locale JSON files

---

### Summary of code changes

1. **`src/pages/Analysis.tsx`** — Add missing category keys to `categoryKeyMap` (growth, risk, strategy)
2. **`src/data/siteContentSchema.ts`** — Add `footer.email` and `footer.linkedinUrl` fields to the footer section
3. **`src/components/Footer.tsx`** — Make email and LinkedIn URL dynamic, reading from i18n/CMS with hardcoded fallbacks
4. **`src/locales/en/common.json`**, **`zh-Hant/common.json`**, **`zh-Hans/common.json`**, **`zh/common.json`** — Add `footer.email` and `footer.linkedinUrl` default values

For issue #1 (untranslated perspective), this is a data issue — use the admin translate button on that perspective.

