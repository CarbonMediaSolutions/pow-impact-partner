

## Fix: Remaining Hardcoded Chinese Strings (Traditional-only)

### Problem Found

All 16 locale JSON files (8 per Chinese variant) are correct -- Traditional Chinese uses proper 繁體 characters and Simplified Chinese uses proper 简体 characters throughout. No mixed characters detected in any locale file.

However, 4 component files contain **hardcoded inline** `isZh ? '繁體中文' : 'English'` strings that bypass the i18n system entirely. When a user selects Simplified Chinese, these strings still display in Traditional Chinese.

### Affected Files and Strings

**`src/pages/PerspectiveDetail.tsx`** (6 hardcoded strings):
- "找不到觀點" / "Perspective not found"
- "返回觀點" / "Return to Perspectives" (x2)
- "想進一步討論這些想法？" / "Want to discuss these ideas further?"
- "預約免費諮詢，探討這些策略如何適用於您的組織。" / "Book a free consultation..."
- "預約免費諮詢" / "Book Your Free Consultation"
- "此觀點反映了我們理解複雜決策的方式..." / "This perspective reflects..."

**`src/pages/AnalysisDetail.tsx`** (5 hardcoded strings):
- "找不到分析" / "Analysis not found"
- "返回分析" / "Return to Analysis" (x2)
- "研究方法" / "Methodology"
- "主要發現" / "Key Findings"
- "影響與啟示" / "Implications"

**`src/components/SocialShare.tsx`** (1 hardcoded string):
- "分享" / "Share"

**`src/components/GatedDownload.tsx`** (8 hardcoded strings):
- "下載已開始" / "Download started"
- "請再試一次" / "Please try again"
- "下載完整報告" / "Download Full Report"
- "下載報告" / "Download Report"
- "姓名" / "Name"
- "您的姓名" / "Your name"
- "電子郵件 *" / "Email *"
- "處理中..." / "Processing..."
- "獲取報告" / "Get Report"

### Fix

Move all these strings into the i18n locale files (EN, zh-Hans, zh-Hant) and replace the inline ternaries with `t()` calls.

**Step 1 -- Add new keys to all 3 locale files:**

Add to `perspectives.json` (all 3 locales):
- `notFound`, `backToList`, `discussFurther`, `discussDescription`, `bookFreeConsultation`, `disclaimerNote`

Add to `analysis.json` (all 3 locales):
- `notFound`, `backToList`, `methodology`, `keyFindings`, `implications`

Add to `common.json` (all 3 locales):
- `share`, `download.started`, `download.tryAgain`, `download.fullReport`, `download.reportTitle`, `download.name`, `download.namePlaceholder`, `download.emailRequired`, `download.processing`, `download.getReport`

**Step 2 -- Update component files to use `t()` calls:**

Replace every `isZh ? '...' : '...'` pattern with the corresponding `t('namespace:key')` call.

### Files Modified

| File | Change |
|------|--------|
| `src/locales/en/perspectives.json` | Add detail page keys |
| `src/locales/zh-Hant/perspectives.json` | Add detail page keys (Traditional) |
| `src/locales/zh-Hans/perspectives.json` | Add detail page keys (Simplified) |
| `src/locales/en/analysis.json` | Add detail page keys |
| `src/locales/zh-Hant/analysis.json` | Add detail page keys (Traditional) |
| `src/locales/zh-Hans/analysis.json` | Add detail page keys (Simplified) |
| `src/locales/en/common.json` | Add share/download keys |
| `src/locales/zh-Hant/common.json` | Add share/download keys (Traditional) |
| `src/locales/zh-Hans/common.json` | Add share/download keys (Simplified) |
| `src/pages/PerspectiveDetail.tsx` | Replace 6 inline ternaries with t() |
| `src/pages/AnalysisDetail.tsx` | Replace 5 inline ternaries with t() |
| `src/components/SocialShare.tsx` | Replace 1 inline ternary with t() |
| `src/components/GatedDownload.tsx` | Replace 8 inline ternaries with t() |

No database changes needed. This is purely a locale file + component update.
