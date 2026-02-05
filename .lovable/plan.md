

## Fix: Rich Text Formatting for Perspectives

### Problem Identified

When pasting formatted content (like LinkedIn posts with bullet points, bold text, etc.), the formatting is lost because:

1. **Content splitting** - The admin saves content by splitting on double newlines (`\n\n`), which doesn't properly separate individual bullet points that use single newlines
2. **Plain text rendering** - The detail page renders each paragraph as plain `<p>` tags with no formatting for bullets, bold, or lists
3. **No markdown/rich text support** - The system treats everything as plain text

### Current Flow

```
User pastes formatted text → Split by \n\n → Store as string[] → Render as plain <p> tags
```

### Solution

Implement markdown-style rendering that:
1. Preserves the full content as-is (without aggressive splitting)
2. Converts common patterns to proper HTML:
   - Lines starting with `●`, `•`, `-`, `*` become list items
   - Text wrapped in `**bold**` or unicode bold characters becomes `<strong>`
   - Blank lines create paragraph breaks
   - Quote lines starting with `"` get blockquote styling

---

### Implementation Options

**Option A: Simple Pattern-Based Rendering (Recommended)**
- Keep the current storage format (text array)
- Enhance the rendering component to detect and format patterns
- No new dependencies needed

**Option B: Full Markdown Support**
- Add a markdown library (react-markdown)
- Store content as a single markdown string
- Requires migration of existing content

I recommend **Option A** for simplicity and backward compatibility.

---

### Technical Changes

| File | Changes |
|------|---------|
| `src/pages/Admin.tsx` | Improve content parsing - split on single newlines and preserve structure |
| `src/pages/PerspectiveDetail.tsx` | Add `renderFormattedContent()` function to handle bullets, bold, quotes |
| `src/components/FormattedContent.tsx` | New reusable component for rich text rendering |

---

### Parsing Logic (Admin.tsx)

**Before:**
```typescript
const contentArray = perspectiveForm.content.split('\n\n').filter(p => p.trim());
```

**After:**
```typescript
// Preserve single newlines for bullet points, split on double newlines for paragraphs
const contentArray = perspectiveForm.content
  .split('\n')
  .filter(line => line.trim())
  .map(line => line.trim());
```

This keeps each line (including individual bullet points) as a separate array item.

---

### Rendering Logic (PerspectiveDetail.tsx)

**New `renderFormattedContent` function:**

```tsx
const renderFormattedContent = (content: string[]) => {
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-2">
          {currentList.map((item, i) => (
            <li key={i}>{formatText(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };
  
  content.forEach((line, index) => {
    // Check if line is a bullet point
    const bulletMatch = line.match(/^[●•\-\*]\s*(.+)$/);
    
    if (bulletMatch) {
      currentList.push(bulletMatch[1]);
    } else {
      flushList();
      
      // Check for quote
      if (line.startsWith('"') && line.endsWith('"')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-4">
            {formatText(line)}
          </blockquote>
        );
      } else {
        elements.push(<p key={index}>{formatText(line)}</p>);
      }
    }
  });
  
  flushList();
  return elements;
};

// Format bold text and hashtags
const formatText = (text: string) => {
  // Handle **bold** syntax
  let parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Handle hashtags
    if (part.includes('hashtag#')) {
      return part.replace(/hashtag#(\w+)/g, '#$1');
    }
    return part;
  });
};
```

---

### Visual Result

**Before (wall of text):**
```
● Cashflow anxiety: The low-level, constant worry... ● Fundraising fatigue: The grind of 50-100+...
```

**After (formatted):**
```
• Cashflow anxiety: The low-level, constant worry...
• Fundraising fatigue: The grind of 50-100+...
```

With proper bullet points, spacing, and bold formatting preserved.

---

### Additional Improvements

1. **Hashtag handling** - Convert `hashtag#Topic` to `#Topic` or style as badges
2. **Unicode bold detection** - Detect unicode bold characters (𝐂𝐚𝐬𝐡𝐟𝐥𝐨𝐰) and render as `<strong>`
3. **Quote detection** - Lines starting with `"` get blockquote styling
4. **Section headers** - Lines that are short and followed by bullets become subheadings

---

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/Admin.tsx` | Modify | Update content splitting to preserve line-by-line structure |
| `src/pages/PerspectiveDetail.tsx` | Modify | Add rich text rendering with bullet detection |
| `src/components/FormattedContent.tsx` | Create | Reusable component for formatted article content |

---

### Backward Compatibility

Existing perspectives stored with the old format (split by `\n\n`) will still render correctly - they just won't have the enhanced formatting. New perspectives will benefit from the improved parsing and rendering.

