
Goal: make /solutions cards reliably translate in all languages (EN, 简体中文, 繁體中文) even when language codes vary or data is stale.

1) Confirmed root cause scope
- Backend translation data is already populated for all 5 solutions (`*_zh_hans`, `*_zh_hant`, and service arrays are present).
- So this is now a frontend localization resolution issue (not a missing-data issue).

2) Update language resolution logic in `src/pages/Solutions.tsx`
- Replace current `lang` checks with a normalized resolver using `i18n.resolvedLanguage || i18n.language`.
- Map variants robustly:
  - `zh-Hant`, `zh-TW`, `zh-HK` -> Traditional
  - `zh-Hans`, `zh-CN`, `zh-SG` -> Simplified
  - default -> English
- Remove ambiguous branching that can route unexpected `zh-*` values incorrectly.

3) Harden card text fallback behavior
- Keep DB fields as primary source.
- Add locale-file fallback using `solutions.cards.<id>` when a DB localized field is empty/missing.
- Apply this for: title, perspective, description, services, price, and priceNote.
- This ensures cards still translate correctly even if one localized DB field is blank.

4) Ensure fresh data when language switches
- Re-fetch solutions when language changes (dependency on resolved language), not only on first mount.
- This prevents stale in-memory data from showing old English fields after backend translation updates.

5) Clean up and verify
- Remove unused `expandedId` state in Solutions page.
- Verify on /solutions:
  - English: all cards in EN
  - Simplified: all 5 cards fully in 简体
  - Traditional: all 5 cards fully in 繁體
  - CTA behavior remains unchanged (Purchase vs Book Consultation).

Technical details
- File to change: `src/pages/Solutions.tsx` only.
- No database migration needed.
- No admin data-entry changes needed.
- No routing or backend policy changes needed.
