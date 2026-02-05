

## Simplify Email Gate: One Registration Point

### The Request

The founder clarified:
> "For access to the report - need to 'register'. For the analysis summary - OK to read free."

### Current State

The Analysis Detail page currently has **two** email gates:

| Component | What it gates | User experience |
|-----------|---------------|-----------------|
| `EmailGate` | Full article content (introduction, sections, methodology, findings) | Blurred content, modal popup |
| `GatedDownload` | PDF download button | Modal when clicking download |

This creates friction - visitors must provide their email twice if they want both.

### Solution

**Remove the `EmailGate` wrapper** from the analysis content, making the full analysis summary freely readable. Keep only the **`GatedDownload`** for the PDF report, which captures emails when visitors want the downloadable document.

### Visual Result

**Before:**
```text
┌──────────────────────────────────────┐
│ Title, Summary, Share buttons        │
│ [Download PDF] ← email gate #1       │
├──────────────────────────────────────┤
│ ░░░░░░ BLURRED CONTENT ░░░░░░       │ ← email gate #2
│ ░░░ (popup: enter email) ░░░        │
└──────────────────────────────────────┘
```

**After:**
```text
┌──────────────────────────────────────┐
│ Title, Summary, Share buttons        │
│ [Download Full Report] ← email gate  │
├──────────────────────────────────────┤
│ Introduction                         │ ← FREE
│ Sections                             │ ← FREE
│ Methodology                          │ ← FREE
│ Key Findings                         │ ← FREE
│ Implications                         │ ← FREE
└──────────────────────────────────────┘
```

### Technical Changes

| File | Change |
|------|--------|
| `src/pages/AnalysisDetail.tsx` | Remove `EmailGate` wrapper, keep content visible |

### Code Change

**Remove the EmailGate wrapper (lines 173 and 251):**

```tsx
// BEFORE (line 173-251):
<EmailGate source={`analysis-${analysis.id}`}>
  <article className="max-w-3xl mx-auto px-6">
    {/* ... all content ... */}
  </article>
</EmailGate>

// AFTER:
<article className="max-w-3xl mx-auto px-6">
  {/* ... all content ... */}
</article>
```

The `EmailGate` import can also be removed since it will no longer be used on this page.

### Benefits

1. **Better UX** - Visitors can read freely without friction
2. **Single gate** - Email captured only when they want the PDF (higher intent leads)
3. **Founder's vision** - Matches the "free summary, register for report" model

