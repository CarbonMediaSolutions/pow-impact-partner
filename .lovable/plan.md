

## Fix: "Test 3" Not Appearing on Perspectives Page

### Root Cause

The Perspectives page has an **either/or** data loading pattern:

- If the database returns perspectives, it shows **only** those (currently 3 items: "Test 3", "Test One", and one other)
- If the database is empty or errors, it falls back to the **static** 6 perspectives from `src/data/perspectives.ts`

On your **published site**, the Live database likely has no perspective rows, so it shows the 6 static perspectives. On the **preview/test** site, the database has 3 rows, so it shows only those 3 -- and the original 6 static perspectives vanish.

Additionally, Test and Live databases don't share data. Content created in Test won't appear on the published site.

### Proposed Fix

Merge database perspectives with static perspectives so both always appear. Database entries take priority if IDs overlap.

**File to modify:** `src/pages/Perspectives.tsx`

Update the `fetchPerspectives` function to:

1. Fetch from the database
2. Merge database results with static perspectives (DB takes priority for matching IDs)
3. Sort by `created_at` descending (static ones get a default old date)

This way:
- Static "seed" perspectives always appear as a baseline
- New perspectives added via Admin appear alongside them
- If a static perspective is later added to the DB (same ID), the DB version wins

### For the Published Site

After approving and implementing this fix, you will need to:
- **Publish** the project so the code change goes live
- If you want "Test 3" on the live site, recreate it via the Admin panel on the published URL

### Technical Details

In `src/pages/Perspectives.tsx`, replace the fetch logic (~lines 52-63):

```typescript
const fetchPerspectives = async () => {
  const { data, error } = await supabase
    .from('perspectives')
    .select('*')
    .order('created_at', { ascending: false });

  const dbPerspectives: Perspective[] = (data || []) as Perspective[];
  const dbIds = new Set(dbPerspectives.map(p => p.id));

  // Merge: DB perspectives first, then static ones not already in DB
  const staticMapped = staticPerspectives
    .filter(p => !dbIds.has(p.id))
    .map(p => ({ ...p, featured: p.featured || null }));

  setPerspectives([...dbPerspectives, ...staticMapped]);
  setLoading(false);
};
```

This ensures all perspectives (static + database) are always visible.
