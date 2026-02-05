

## Fix: "Failed to save perspective" Error

### Problem Identified

The save operation fails because the `perspectives` table has a CHECK constraint that only allows these 5 topic values:
- Governance
- Impact
- Growth
- Strategy
- Risk

When an admin enters a custom topic (or even uses the extended UI defaults like "Leadership", "Innovation", "Sustainability"), the database rejects the insert/update with:

```
new row for relation "perspectives" violates check constraint "perspectives_topic_check"
```

### Solution

Remove the CHECK constraint from the `topic` column to allow any text value. This was the intended behavior when the custom topic Combobox was implemented.

### Database Changes Required

```sql
ALTER TABLE perspectives DROP CONSTRAINT perspectives_topic_check;
```

### Implementation Steps

| Step | Action |
|------|--------|
| 1 | Create a new migration to drop the `perspectives_topic_check` constraint |
| 2 | No code changes needed - the `Admin.tsx` Combobox is already correctly implemented |

### Technical Details

**Before:** 
```sql
topic text NOT NULL CHECK (topic IN ('Governance', 'Impact', 'Growth', 'Strategy', 'Risk'))
```

**After:**
```sql
topic text NOT NULL  -- Any topic text allowed
```

### Files to Change

| File | Change |
|------|--------|
| `supabase/migrations/[timestamp].sql` | New migration: `ALTER TABLE perspectives DROP CONSTRAINT perspectives_topic_check;` |

### Impact

- Admins will be able to save perspectives with any custom topic
- Existing perspectives with the 5 original topics remain unaffected
- The Combobox UI will continue to suggest common topics while accepting custom entries

