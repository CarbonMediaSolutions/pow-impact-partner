

## Fix: Add Chinese translations for the "Digital Experience" solution card

The `digital-experience` solution has all Chinese translation fields empty in the database, and there's no fallback in the locale JSON files either. This is why it stays in English.

### Approach

**Update the database** — populate all Chinese fields for the `digital-experience` row via a migration:

| Field | Traditional (zh_hant) | Simplified (zh_hans) |
|---|---|---|
| title | 數位體驗與轉化架構 | 数字体验与转化架构 |
| perspective | 每一次互動都是決策點 | 每一次互动都是决策点 |
| description | 用戶體驗策略、前端架構和轉化系統設計，使數位平台與機構目標和可衡量成果保持一致。 | 用户体验策略、前端架构和转化系统设计，使数字平台与机构目标和可衡量成果保持一致。 |
| services | 用戶旅程優化, 轉化架構, 前端系統設計, 平台用戶體驗審計, 數位策略諮詢 | 用户旅程优化, 转化架构, 前端系统设计, 平台用户体验审计, 数字策略咨询 |
| price | 按項目定價 | 按项目定价 |
| price_note | 視範圍而定 | 视范围而定 |

**Also add locale file fallbacks** in `zh-Hant/solutions.json`, `zh-Hans/solutions.json`, and `zh/solutions.json` under `cards.digital-experience` for resilience.

This is a single database migration + three locale file edits. No component code changes needed.

