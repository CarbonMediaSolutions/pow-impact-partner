

## Fix: Populate Solution Card Translations in Database

**Problem:** The `solutions` table has empty strings for all `_zh_hant` and `_zh_hans` columns. The `localized()` function correctly falls back to English when these are empty, which is why cards always show English.

**Solution:** Run a single database migration to populate all Chinese translation fields using the content already defined in the locale JSON files (`zh-Hans/solutions.json` and `zh-Hant/solutions.json`).

### Fields to populate per solution (5 cards x 2 languages x 6 fields = 60 updates):

For each of `governance`, `capital`, `growth`, `decision-support`, `data-insight`:
- `title_zh_hant` / `title_zh_hans`
- `perspective_zh_hant` / `perspective_zh_hans`
- `description_zh_hant` / `description_zh_hans`
- `services_zh_hant` / `services_zh_hans`
- `price_zh_hant` / `price_zh_hans`
- `price_note_zh_hant` / `price_note_zh_hans`

### Changes
| What | How |
|------|-----|
| Database migration | Single migration with 10 UPDATE statements (5 cards x 2 languages) using the translations from locale files |

No code changes needed — the `Solutions.tsx` component already handles localization correctly.

