

## Auto-Translate Perspectives & Analyses to Traditional Chinese

### The Problem

When the admin creates or edits a perspective or analysis, only the English fields (`title`, `summary`, `content`) are saved. The Chinese fields (`title_zh`, `summary_zh`, `content_zh`) remain empty. Since the frontend falls back to English when Chinese fields are null, Chinese visitors see untranslated English content -- as shown in your screenshots.

### The Solution

Automatically translate English content to Traditional Chinese using AI whenever the admin saves a perspective or analysis. The translation happens in the background after the initial save, so the admin experience remains fast.

### How It Works

```text
Admin saves English content
        |
        v
  Save to database (instant)
        |
        v
  Call translate-content edge function (background)
        |
        v
  AI translates title, summary, content to Traditional Chinese
        |
        v
  Update _zh fields in database
        |
        v
  Chinese visitors now see translated content
```

### What the Admin Sees

1. Admin writes and saves a perspective/analysis in English (unchanged workflow)
2. A brief toast notification: "Translating to Chinese..."
3. After a few seconds, another toast: "Chinese translation saved" (or an error if it fails)
4. The admin can continue working -- translation happens asynchronously

### Technical Details

#### 1. New Edge Function: `translate-content`

A new backend function that accepts English text fields and returns Traditional Chinese translations using the Lovable AI gateway (same approach as the existing `summarize-perspective` function).

**Input:**
```json
{
  "title": "Founder Mental Health...",
  "summary": "Founder mental health is deeply...",
  "content": ["Paragraph 1...", "Paragraph 2..."],
  "type": "perspective"
}
```

For analyses, content is a structured object:
```json
{
  "title": "...",
  "summary": "...",
  "content": {
    "introduction": "...",
    "sections": [{ "heading": "...", "paragraphs": ["..."] }],
    "methodology": "...",
    "keyFindings": ["..."],
    "implications": ["..."]
  },
  "type": "analysis"
}
```

**Output:**
```json
{
  "title_zh": "創辦人心理健康...",
  "summary_zh": "創辦人心理健康與...",
  "content_zh": ["第一段...", "第二段..."]
}
```

The AI prompt will instruct the model to:
- Translate to Traditional Chinese (not Simplified)
- Maintain the professional, institutional tone
- Preserve formatting structure (paragraphs, bullet points)
- Keep proper nouns and technical terms appropriately handled

#### 2. Admin.tsx Changes

After each successful save of a perspective or analysis:
- Show a "Translating to Chinese..." toast
- Call the `translate-content` edge function with the English content
- On success, update the `_zh` fields in the database and show confirmation
- On failure, show a warning toast (translation can be retried later)

This adds approximately 15-20 lines to each save function.

#### 3. Manual Override

The admin can still manually edit the Chinese fields if the auto-translation needs refinement. A future enhancement could add Chinese text fields to the edit forms, but for now the auto-translation covers the gap.

### Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/translate-content/index.ts` | Edge function for AI translation |

### Files to Modify

| File | Change |
|------|--------|
| `src/pages/Admin.tsx` | Add translation calls after saving perspectives and analyses |

### Model Choice

Uses `google/gemini-2.5-flash` -- fast, cost-effective, and strong at translation tasks. Same gateway pattern as the existing `summarize-perspective` function.

