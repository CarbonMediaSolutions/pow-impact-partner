

## Newsletter Subscription Form

### Overview

Add a simple email-only newsletter signup form in two places on the homepage: above the Final CTA section and inside the Footer. Subscriptions are stored in a new database table.

### What It Looks Like

A minimal, restrained form consistent with the institutional tone:

```text
Stay informed on strategy, governance, and impact.
[email@example.com       ] [Subscribe]
```

- Single email input with a submit button
- Brief label text above
- Success message replaces the form after submission
- Duplicate emails handled gracefully (shows success without error)

### Database

A new `newsletter_subscribers` table:

| Column | Type | Details |
|--------|------|---------|
| id | uuid | Primary key |
| email | text | Unique, not null |
| subscribed_at | timestamptz | Default now() |

RLS: Public insert (anyone can subscribe), no public read/update/delete.

### New Component

**`src/components/NewsletterSignup.tsx`** -- A reusable component containing:
- Email input with Zod validation
- Submit button
- Loading and success states
- Inserts into `newsletter_subscribers` table
- Uses `onConflict` to silently handle duplicate emails

### Placement

1. **Homepage** -- Added inside `FinalCTA.tsx`, below the advisory inquiries email, as a secondary element
2. **Footer** -- Added in the Company Info column (lg:col-span-4), below the brand name

### i18n Translations

New keys added to `en/common.json` and `zh/common.json`:

| Key | EN | ZH |
|-----|----|----|
| `newsletter.label` | Stay informed on strategy, governance, and impact. | 關注戰略、治理與影響力動態。 |
| `newsletter.placeholder` | Your email address | 您的電子郵件地址 |
| `newsletter.subscribe` | Subscribe | 訂閱 |
| `newsletter.success` | Thank you for subscribing. | 感謝您的訂閱。 |

### Admin Visibility

A new "Subscribers" section in the Admin dashboard (or added to an existing tab) showing a simple table of subscriber emails and dates, so the admin can export or review them.

### Technical Details

**Files to create:**
- `src/components/NewsletterSignup.tsx` -- Reusable signup form component

**Files to modify:**
- `src/components/FinalCTA.tsx` -- Add newsletter form below existing content
- `src/components/Footer.tsx` -- Add newsletter form in company info column
- `src/locales/en/common.json` -- Add newsletter translation keys
- `src/locales/zh/common.json` -- Add newsletter translation keys
- `src/pages/Admin.tsx` -- Add subscribers list to admin dashboard

**Database changes:**
- New `newsletter_subscribers` table with public insert RLS policy

