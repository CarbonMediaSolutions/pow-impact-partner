

## Fix: "Create Perspective" Button Gets Stuck in Admin Panel

### The Problem

The "Create Perspective" button in the admin dialog has no loading state. When clicked, if the database save takes time (network latency, large content), the button appears frozen with no visual feedback. The user doesn't know if anything is happening.

### The Fix

**File to modify:** `src/pages/Admin.tsx`

1. **Add a `savingPerspective` state variable** (boolean, default `false`)
2. **Wrap `savePerspective` logic** with `setSavingPerspective(true)` at the start and `setSavingPerspective(false)` in a `finally` block
3. **Update the "Create Perspective" button** to:
   - Be `disabled` when `savingPerspective` is true
   - Show "Saving..." text while saving

### Technical Details

Changes in `src/pages/Admin.tsx`:

- Add state: `const [savingPerspective, setSavingPerspective] = useState(false);` alongside the existing state declarations
- In `savePerspective()`: add `setSavingPerspective(true)` at the top, and `setSavingPerspective(false)` in a `finally` block after the try/catch
- Update button at ~line 1392:
  ```
  <Button onClick={savePerspective} className="w-full" disabled={savingPerspective}>
    {savingPerspective ? 'Saving...' : (editingPerspective ? 'Update Perspective' : 'Create Perspective')}
  </Button>
  ```

- Apply the same pattern to the "Create Analysis" button (`savingAnalysis` state) for consistency

This ensures the user always sees feedback and cannot double-click to create duplicates.
