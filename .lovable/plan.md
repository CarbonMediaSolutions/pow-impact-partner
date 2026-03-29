

## Fix: Team member translations not displaying

### Investigation findings

The database has correct Chinese translations for ALL team members (confirmed via direct query):
- Vincit: `role_zh_hans = "CRO | 合伙人"`, `focus_zh_hans = "数字架构 · 用户体验系统 · 转化策略"`, bio translated ✓
- Nish: `role_zh_hans = "税务 | 合伙人"`, `focus_zh_hans = "税务策略 · 架构 · 国际税务"`, bio translated ✓
- All other members: all Chinese fields populated ✓

The component code (`useLocalizedField`) and data fetching (`select('*')`) both look correct. The issue appears to be that the preview is showing stale/cached data from before the translations were populated.

However, the user also reports "all the titles except Patric's" stay in English. Looking at the DB, Patric's `role_zh_hans = "创办人兼首席合伙人"` is populated, same as everyone else's — so if only Patric's role translates, there may be a subtle rendering issue.

### Plan

**1. Add language-aware data refetch** — `src/pages/AboutPage.tsx`
- Add `i18n.language` to the `useEffect` dependency array so the component re-fetches team data when the language switches (this forces fresh data and a full re-render)

**2. Make `useLocalizedField` more defensive** — `src/components/TeamMemberCard.tsx`
- Trim the returned value before the fallback check to handle whitespace-only strings
- Add explicit `undefined` / `null` checks alongside the falsy check

**3. Re-run the database migration** — One-time SQL UPDATE to ensure translations are definitively set for Vincit and Nish (belt-and-suspenders approach, since the data appears correct but the user reports otherwise)

These are small, targeted changes with no visual impact.

