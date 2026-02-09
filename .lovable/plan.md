

## Fix: Analyses Not Showing on Frontend

### The Problem

The `Analysis.tsx` page has an either/or data loading strategy:
- If the database returns data, it shows **only** database records (your 2 test entries)
- If the database fails or is empty, it shows **only** the 6 static analyses

This means the test entries you created never appear alongside the existing static content.

### The Fix

Change the data loading logic in `src/pages/Analysis.tsx` to **merge** database records with static analyses, deduplicating by ID so DB entries take priority over static ones with the same ID.

```text
Fetch from database
        |
        v
  Combine DB results + static analyses
  (DB entries override static ones with same ID)
        |
        v
  Display merged list
```

### Technical Details

**File to modify:** `src/pages/Analysis.tsx`

The `useEffect` fetch function will be updated to:
1. Fetch DB analyses as before
2. Convert static analyses into the same shape
3. Merge both lists, with DB records taking priority when IDs match
4. This ensures new admin-created analyses appear alongside the original static content

This is a small change (~10 lines) in the existing `fetchAnalyses` function.

