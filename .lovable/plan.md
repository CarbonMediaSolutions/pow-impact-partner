

## Plan: Three Fixes

### 1. Rich text support for Analysis admin fields (methodology, introduction, keyFindings, implications)

**Problem**: The methodology, introduction, key findings, and implications fields use plain `<Textarea>` elements. When content is pasted (e.g. from LinkedIn or Word), spacing and line breaks are preserved in the textarea but lost on the frontend because:
- `methodology` and `introduction` are stored as single strings
- `FormattedContent` receives them as `[singleString]`, rendering everything as one paragraph
- Line breaks within the pasted text are not split into separate paragraphs

**Fix**: Split these strings by newlines before passing to `FormattedContent`. This is a rendering fix, not an editor change — the textarea already preserves line breaks, but the detail page collapses them.

**Files**:
- `src/pages/AnalysisDetail.tsx` — Change `[getContent(analysis).introduction!]` to `getContent(analysis).introduction!.split('\n').filter(l => l.trim())`, and same for `methodology`. This lets `FormattedContent` treat each line as a separate element (paragraph, bullet, etc.)

### 2. LinkedIn URL in footer

**Problem**: The footer's LinkedIn link defaults to `https://linkedin.com` (generic). Need to point to `https://www.linkedin.com/company/plexapartners/`.

**Fix**: Update the default value in all four `common.json` locale files.

**Files**:
- `src/locales/en/common.json` — Change `footer.linkedinUrl` to `https://www.linkedin.com/company/plexapartners/`
- `src/locales/zh/common.json` — Add `footer.linkedinUrl`
- `src/locales/zh-Hans/common.json` — Add `footer.linkedinUrl`
- `src/locales/zh-Hant/common.json` — Add `footer.linkedinUrl`

### 3. Team member translations not showing in Chinese

**Problem**: The `TeamMemberCard` uses `useLocalizedField` which falls back to English when `_zh_hant` or `_zh_hans` fields are empty strings (truthy in JS — wait, empty string is falsy). Let me re-check...

The fallback logic is: `(member as any)[\`${field}_zh_hant\`] || member[field]` — empty string `''` is falsy, so it correctly falls back to English. This means the database fields are empty for newer team members and possibly for older ones' titles.

**Fix**: The translations need to be populated in the database. Two approaches:
1. **Trigger auto-translation on save** — the admin save flow for team members should call the `translate-content` edge function (same as perspectives/analyses)
2. **One-time data fix** — run an UPDATE to populate Chinese fields for all team members

Since the admin already has auto-translate for perspectives and solutions, the cleanest fix is to add auto-translation to the Team Members save flow in `src/components/admin/TeamMembersTab.tsx`.

**Files**:
- `src/components/admin/TeamMembersTab.tsx` — After saving a team member, call the `translate-content` edge function to populate `name_zh_hant`, `name_zh_hans`, `role_zh_hant`, `role_zh_hans`, `focus_zh_hant`, `focus_zh_hans`, `bio_zh_hant`, `bio_zh_hans` fields, then update the database row
- One-time database UPDATE (via insert tool) to translate existing team members' fields that are currently empty

