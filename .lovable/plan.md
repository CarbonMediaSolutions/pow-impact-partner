

## Fix: Incomplete Chinese Translation for Long Perspectives

### The Problem

The perspective "Founder Mental Health Isn't Just Emotional -- It's Financial" has 12 English content paragraphs but only 1 was translated to Chinese. The AI translation model (`gemini-2.5-flash`) appears to truncate its output when handling longer content, returning only the first paragraph in the `content_zh` array.

### Root Cause

Two contributing factors in `supabase/functions/translate-content/index.ts`:

1. **No `max_tokens` parameter** -- the API call doesn't specify a maximum output length, so the model may default to a short response
2. **Weak prompt instructions** -- the prompt doesn't explicitly emphasize that ALL paragraphs must be translated and the output array must have the same number of elements as the input

### The Fix

**File to modify:** `supabase/functions/translate-content/index.ts`

Changes:

1. **Add `max_tokens: 8192`** to the API request body to allow longer responses
2. **Strengthen the prompt** to explicitly state: "You MUST translate ALL paragraphs. The content_zh array MUST contain exactly N elements" (where N is the actual paragraph count)
3. **Add a validation check** after parsing the response -- if `content_zh` array length doesn't match the input content array length, log a warning (helps with future debugging)
4. **Switch to `google/gemini-2.5-pro`** for perspective translations since these are long-form content that benefits from a more capable model

### Re-translation

After deploying the fix, the existing perspective will need to be re-saved from the admin panel to trigger a fresh translation. No database migration needed.

### Technical Details

**Single file change:** `supabase/functions/translate-content/index.ts`

- Add `max_tokens: 8192` to the fetch body (line ~91-97)
- Update the user prompt template (line ~71-82) to include: `"IMPORTANT: There are exactly ${content.length} paragraphs. Your content_zh array MUST contain exactly ${content.length} translated paragraphs."`
- Change model from `google/gemini-2.5-flash` to `google/gemini-2.5-pro` (line 92)
- Add post-parse validation logging for array length mismatch
